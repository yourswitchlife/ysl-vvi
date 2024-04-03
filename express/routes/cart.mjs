import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
// 導入dotenv 使用 .env 檔案中的設定值 process.env
import 'dotenv/config.js'
import axios from 'axios'
import queryString from 'query-string'
// 啟用綠界物流SDK
import ecpay_logistics from 'ecpay_logistics_nodejs'
import session from 'express-session'

// 取得商品對應的賣場名稱
router.get('/shop-names', async (req, res) => {
  try {
    // 從client端傳來的賣場id參數們
    const memberIds = req.query.memberIds

    if (!memberIds) {
      return res.status(400).json({ message: 'memberIds are required' })
    }
    // 建立相對應client端傳來的賣場id參數們的佔位字符串'?'
    const memberIdsParams = memberIds
      .split(',')
      .map(() => '?')
      .join(',')

    const [rows] = await db.execute(
      `SELECT id, shop_name FROM member WHERE id IN (${memberIdsParams})`,
      memberIds.split(',')
    )

    const shopNames = rows.reduce((group, item) => {
      group[item.id] = item.shop_name
      return group
    }, {})
    res.json(shopNames)
  } catch (error) {
    console.error('伺服器連線失敗', error)
    res.status(500).json({ message: '伺服器連線失敗' })
  }
})

// 取得對應會員的常用地址
router.get('/common-address/:memberId', async (req, res) => {
  try {
    // 從client端傳來的會員id
    const memberId = req.params.memberId

    if (!memberId) {
      return res.status(400).json({ message: 'memberId are required' })
    }

    const [rows] = await db.execute(
      'SELECT * FROM shipping_address WHERE `member_id` = ?',
      [memberId]
    )

    res.json(rows)
  } catch (error) {
    console.error('伺服器連線失敗', error)
    res.status(500).json({ message: '伺服器連線失敗' })
  }
})

// 接收編輯地址的表單資訊
router.post('/edit-address', async (req, res) => {
  const {
    memberId,
    shipping_method,
    name,
    phone,
    address,
    specialPreferences,
    homeField,
  } = req.body

  const { AddressType, DeliveryTimePreference } = specialPreferences
  console.log(req.body)

  const buildShippingInfo = () =>
    JSON.stringify({
      name,
      phone,
      address,
      specialPreferences: {
        AddressType,
        DeliveryTimePreference,
      },
    })

  console.log(buildShippingInfo)

  // 如果找到對應地址欄位
  if (homeField && ['home1', 'home2', 'home3'].includes(homeField)) {
    const shippingInfo = buildShippingInfo()

    const sql = `UPDATE shipping_address SET ${homeField} = ? WHERE member_id = ? AND shipping_method = ?`

    try {
      const [result] = await db.execute(sql, [
        shippingInfo,
        memberId,
        shipping_method,
      ])

      // 對於 UPDATE 操作，affectedRows 表示更新的行數
      if (result.affectedRows > 0) {
        return res.json({ success: true, message: '地址更新成功' })
      } else {
        return res
          .status(404)
          .json({ success: false, message: '未找到對應的會員ID' })
      }
    } catch (error) {
      console.error('更新地址時發生錯誤:', error)
      return res.status(500).json({ success: false, message: '伺服器錯誤' })
    }
  } else {
    // 如果有地址的空欄位才可以更新上去
    const [existingAddresses] = await db.query(
      'SELECT home1, home2, home3 FROM shipping_address WHERE member_id = ? AND shipping_method = ?',
      [memberId, shipping_method]
    )
    if (!existingAddresses.length) {
      return res.status(404).json({ message: '未找到對應的地址欄位' })
    }
    const existingAddress = existingAddresses[0]
    // 尋找第一個空的地址欄位
    const findFirstEmptyField = (address) => {
      const fields = ['home1', 'home2', 'home3']
      for (const field of fields) {
        if (address && !address[field]) {
          return field
        }
      }
      return null
    }
    const emptyField = findFirstEmptyField(existingAddress)
    if (emptyField) {
      const shippingInfo = buildShippingInfo()
      const sql = `UPDATE shipping_address SET ${emptyField} = ? WHERE member_id = ? AND shipping_method = ?`
      await db.execute(sql, [shippingInfo, memberId, shipping_method])
      return res.json({ success: true, message: '地址新增成功' })
    } else {
      res.status(400).json({ message: '地址欄位都已經有資料了' })
    }
  }
})

// 接收新增地址的表單資訊
router.post('/add-address', async (req, res) => {
  const {
    memberId,
    shipping_method,
    name,
    phone,
    address,
    specialPreferences,
  } = req.body

  const shippingInfo = JSON.stringify({
    name,
    phone,
    address,
    specialPreferences,
  })

  // 先查詢該會員是否有設置常用地址
  const [existingAddresses] = await db.query(
    'SELECT * FROM shipping_address WHERE member_id = ? AND shipping_method = ?',
    [memberId, shipping_method]
  )

  if (existingAddresses.length === 0) {
    const insertSql =
      'INSERT INTO shipping_address (member_id, shipping_method, home1) VALUES (?, ?, ?)'
    await db.execute(insertSql, [memberId, shipping_method, shippingInfo])
    res.status(200).json({ message: '新增地址資料成功' })
  } else {
    // 尋找第一個空的地址欄位
    const findFirstEmptyField = (address) => {
      const fields = ['home1', 'home2', 'home3']
      for (const field of fields) {
        if (!address[field]) {
          return field
        }
      }
      return null
    }
    // 如果已經有常用地址了，找到第一個空地址的欄位
    const emptyField = findFirstEmptyField(existingAddresses[0])
    if (emptyField) {
      const updateSql = `UPDATE shipping_address SET ${emptyField} = ? WHERE member_id = ? AND shipping_method = ?`
      await db.execute(updateSql, [shippingInfo, memberId, shipping_method])
      return res.json({ success: true, message: '地址新增成功' })
    } else {
      res.status(400).json({ message: '地址欄位都已經有資料了' })
    }
  }
})

// 建立訂單
router.post('/create-order', async (req, res) => {
  const {
    items,
    member_buyer_id,
    paymentMethod,
    shipping_method,
    shippingDiscount,
    productDiscount,
    shippingInfos,
    selectedProductCoupon,
    selectedShippingCoupon,
  } = req.body
  console.log(req.body)

  // 計算總優惠折抵(商品折抵金額+運費折抵金額)
  const totalDiscount = shippingDiscount + productDiscount
  let totalOrderPrice = 0

  try {
    // 連接資料庫
    const connection = await db.getConnection()
    try {
      // 開始beginTransaction事務
      await connection.beginTransaction()

      // 新增order_group資料(同一付款模式不同賣場訂單存進同組別)
      const orderGroupUuid = uuidv4()
      const [orderGroupResult] = await connection.execute(
        `INSERT INTO order_group (order_info, payment_method) VALUES (?, ?)`,
        [orderGroupUuid, paymentMethod]
      )
      const groupId = orderGroupResult.insertId
      console.log(groupId)

      // 生成Linepay用的唯一識別訂單號
      const externalOrderId = `${groupId}${orderGroupUuid}`

      try {
        const groupedItems = items.reduce((group, item) => {
          if (!group[item.member_id]) {
            group[item.member_id] = []
          }
          group[item.member_id].push(item)
          return group
        }, {})

        totalOrderPrice = Object.entries(groupedItems).reduce(
          (total, [member_id, itemsInGroup]) => {
            // 找到當前賣場訂單運費
            const currentShippingMethod = shipping_method.find(
              (method) => method.member_id === member_id
            )
            // 根據shipping_method計算運費
            const shippingCost =
              currentShippingMethod &&
              currentShippingMethod.shippingMethod === '2'
                ? 100
                : 60
            // 計算賣場訂單總金額
            const itemPrice = itemsInGroup.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )
            return total + itemPrice + shippingCost
          },
          0
        )
        // 遍歷每個賣場分組創建賣場訂單
        for (const [member_id, itemsInGroup] of Object.entries(groupedItems)) {
          // console.log(itemsInGroup)
          if (!Array.isArray(itemsInGroup)) {
            console.error(`預期 itemsInGroup 是一個陣列，取得:`, itemsInGroup)
            continue
          }
          // 產生不同賣場對應的order_number
          const orderNumber = uuidv4()
          // 先找到當前對應的shipping_method
          const currentShippingMethod = shipping_method.find(
            (method) => method.member_id === member_id
          )
          // 查找每個賣場對應的配送方式的運費
          const shippingCost =
            currentShippingMethod &&
            currentShippingMethod.shippingMethod === '2'
              ? 100
              : 60
          console.log(shippingCost)

          // 計算訂單總價格(未使用優惠券前)
          const orderPrice =
            itemsInGroup.reduce(
              (sum, { price, quantity }) => sum + price * quantity,
              0
            ) + shippingCost

          console.log(orderPrice)
          // 計算每個賣場訂單在所有訂單總額的佔比
          const proportion =
            totalOrderPrice > 0 ? orderPrice / totalOrderPrice : 0

          // 根據比例分配總折抵金額
          const discountAmount = totalDiscount * proportion

          // 計算每個訂單實際付款的訂單總金額(使用優惠券)-先四捨五入測試
          const finalPrice = Math.round(orderPrice - discountAmount)
          console.log(finalPrice)

          // 每個賣場的收件人資訊
          const shippingInfo = shippingInfos[member_id]
          // 如果沒有收件資訊
          if (!shippingInfo) {
            return res.status(400).json({ message: '缺少收件人資訊' })
          }
          console.log(totalOrderPrice)
          console.log(totalDiscount)

          // 計算要傳給金流使用的實際付款總金額
          const amount = totalOrderPrice - totalDiscount

          for (const item of itemsInGroup) {
            await connection.execute(
              `INSERT INTO orders (group_id, external_order_id, order_number, member_buyer_id, member_seller_id, product_id, quantity, order_price, final_price, shipping_method, receive_name, receive_phone, receive_address, payment_method, shipping_status, status, coupon_id, shipping_discount_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                groupId,
                externalOrderId,
                orderNumber,
                member_buyer_id,
                member_id,
                item.id,
                item.quantity,
                orderPrice,
                finalPrice,
                currentShippingMethod.shippingMethod,
                shippingInfo.name,
                shippingInfo.phone,
                shippingInfo.address,
                paymentMethod,
                1,
                '待付款',
                selectedProductCoupon || null,
                selectedShippingCoupon || null,
              ]
            )

            // 增加商家評論
            await connection.execute(
              `INSERT INTO shop_comment (order_number, member_id, shop_id) VALUES (?, ?, ?)`,
              [orderNumber, member_buyer_id, member_id]
            )

            // 更新商品資料表對應商品的庫存數量
            await connection.execute(
              `UPDATE product SET product_quanty = product_quanty - ?, valid = CASE WHEN product_quanty <= 0 THEN 0 ELSE 1 END WHERE id = ?`,
              [item.quantity, item.quantity, item.id]
            )
          }
          // 更新寫入order_group資料表的amount欄位
          await connection.execute(
            `UPDATE order_group SET amount = ? WHERE id = ?`,
            [amount, groupId]
          )
          await connection.execute(
            'UPDATE member_coupon SET status = 1 WHERE member_id = ? AND coupon_id =?',
            [member_buyer_id, selectedProductCoupon]
          )
        }
      } catch (error) {
        console.error('使用reduce錯誤:', error)
      }

      await connection.commit()
      if (paymentMethod === 1) {
        // 貨到付款
        res.json({
          status: 'success',
          message: '建立訂單成功，貨到付款',
          externalOrderId: externalOrderId,
        })
      } else if (paymentMethod === 2) {
        // LINEPAY
        res.json({
          status: 'success',
          message: '建立訂單成功，LINEPAY',
          externalOrderId: externalOrderId,
        })
      } else if (paymentMethod === 3) {
        // 信用卡(綠界)
        res.json({
          status: 'success',
          message: '建立訂單成功，信用卡',
          externalOrderId: externalOrderId,
        })
      }
    } catch (error) {
      await connection.rollback()
      res.status(500).json({ message: '創立訂單失敗', error: error.message })
    } finally {
      connection.release() // 釋放連接回資料庫
    }
  } catch (error) {
    res.status(500).json({ message: '資料庫連接失敗', error: error.message })
  }
})

// LINE PAY
router
  .post('/line-pay', async (req, res) => {
    const { externalOrderId } = req.body
    console.log(req.body)

    try {
      // 從order_group取得amount
      const [groupRows] = await db.execute(
        `SELECT order_group.amount FROM order_group JOIN orders ON order_group.id = orders.group_id  WHERE orders.external_order_id = ?`,
        [externalOrderId]
      )
      if (groupRows.length === 0) {
        return res
          .status(404)
          .json({ message: '找不到order_group資料表對應的訂單組別' })
      }
      const amount = groupRows[0].amount

      console.log(amount)

      // LinepayBody
      const orderId = externalOrderId
      const productImageUrl =
        'https://images.unsplash.com/photo-1605142806312-9ba7fa5cd0fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      const confirmUrl = `http://localhost:3000/cart/purchase?orderId=${orderId}`
      const productName = 'YSL 二手交易平台'
      const currency = 'TWD'
      const linepayBody = {
        amount,
        productImageUrl,
        confirmUrl,
        productName,
        orderId,
        currency,
      }
      console.log(JSON.stringify(linepayBody, null, 2))

      // 製作簽章
      const uri = '/v2/payments/request'
      const nonce = uuidv4().toString()
      // 使用 crypto 模組創建 HMAC SHA256 簽名並轉為 Base64
      const channelSecret = process.env.LINE_PAY_CHANNEL_SECRET
      const channelId = process.env.LINE_PAY_CHANNEL_ID
      const requestBody = JSON.stringify(linepayBody)
      const datatosign = channelSecret + uri + requestBody + nonce

      const signature = crypto
        .createHmac('sha256', channelSecret)
        .update(datatosign)
        .digest('base64')

      console.log(signature)

      // const linePayClient = createLinePayClient({
      //   channelId: process.env.LINE_PAY_CHANNEL_ID,
      //   channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
      //   env: process.env.NODE_ENV,
      // })

      // 製作送給linepay的headers
      const headers = {
        'X-LINE-ChannelId': channelId,
        'Content-Type': 'application/json',
        'X-LINE-ChannelSecret': channelSecret,
      }
      // linepay api路徑
      const url = 'https://sandbox-api-pay.line.me/v2/payments/request'

      const linepayRes = await axios.post(url, linepayBody, { headers })
      console.log(linepayRes)
      console.log(linepayRes.data.info.paymentUrl)
      if (linepayRes.data.returnCode === '0000') {
        res.json(linepayRes.data.info.paymentUrl.web)
      } else {
        console.log('錯誤')
      }
    } catch (error) {
      console.error('錯誤', error)
      res.status(500).json({ status: 'failed', message: '傳送LINEPAY錯誤' })
    }
  })

  // 後端接收 transactionId再進行確認
  .get('/check-transaction', async (req, res) => {
    const { transactionId, orderId } = req.query
    console.log(transactionId)
    console.log(orderId)

    // 從order_group取得amount
    const [orderRows] = await db.execute(
      `SELECT orders.group_id, order_group.amount FROM orders JOIN order_group ON orders.group_id = order_group.id WHERE orders.external_order_id = ?`,
      [orderId]
    )
    if (orderRows.length === 0) {
      return res
        .status(404)
        .json({ message: '找不到order_group資料表中對應的訂單組別' })
    }
    const amount = orderRows[0].amount

    // LinepayBody

    // 構建Confirm API的請求
    const confirmUrl = `https://sandbox-api-pay.line.me/v2/payments/${transactionId}/confirm`
    const linepayBody = {
      amount: amount,
      currency: 'TWD',
    }
    try {
      const response = await axios.post(confirmUrl, linepayBody, {
        headers: {
          'X-LINE-ChannelId': process.env.LINE_PAY_CHANNEL_ID,
          'X-LINE-ChannelSecret': process.env.LINE_PAY_CHANNEL_SECRET,
          'Content-Type': 'application/json',
        },
      })

      // 確認交易成功
      if ((response.data.returnCode = '0000')) {
        // 更新訂單付款狀態
        await db.execute(
          `UPDATE orders SET status = '已付款' WHERE external_order_id = ?`,
          [orderId]
        )
        res.json({ status: 'success', message: '訂單狀態成功更新為已付款' })
      } else {
        res.status(400).json({
          status: 'failed',
          message: 'LINE PAY交易失敗',
          detail: response.data,
        })
      }
    } catch (error) {
      console.error('確認交易時發生錯誤', error)
      res.status(500).json({ status: 'failed', message: '伺服器錯誤' })
    }
  })

// 取得會員優惠券
router.get('/get-coupons', async (req, res) => {
  const memberId = req.query.memberId
  // console.log(memberId)

  if (!memberId) {
    return res.status(400).send({ error: '找不到用戶' })
  }

  try {
    const [coupons] = await db.execute(
      `SELECT discount_coupon.*
    FROM discount_coupon JOIN member_coupon ON discount_coupon.id = member_coupon.coupon_id
    WHERE member_coupon.member_id = ? AND member_coupon.status = 0 AND (discount_coupon.expiration_date >= NOW() OR discount_coupon.expiration_date = '0000-00-00 00:00:00')`,
      [memberId]
    )

    res.json(coupons)
  } catch (error) {
    console.error('取得用戶優惠券失敗', error)
    res.status(500).send({ error: '伺服器錯誤' })
  }
})

// 綠界門市地圖
router.get('/get-seven-address', async (req, res) => {
  console.log('開始綠界')
  const base_param = {
    MerchantTradeNo: 'Gn7fJycGqWvqaZdGZLEH',
    LogisticsType: 'CVS',
    LogisticsSubType: 'UNIMARTC2C',
    IsCollection: 'N',
    ServerReplyURL: 'http://localhost:3005/api/cart/return-map',
    ExtraData: '',
    Device: '',
  }

  const create = new ecpay_logistics()
  const mapHtml = await create.query_client.expressmap(base_param)

  console.log(mapHtml)
  res.render('ecpaymap', { title: '', mapHtml })
})

// 接收超商收件姓名、電話資訊
router.post('/save-user-info', (req, res) => {
  const { name, phone, memberId } = req.body
  console.log(req.body)
  req.session.userInfo = {
    memberId,
    name,
    phone,
  }
  console.log(req.session)
  res.json({ success: true, message: '用戶超商收件資訊已保存到session' })
})

// 後端接收綠界地圖回傳的資料
router.post('/return-map', async (req, res) => {
  console.log('req.body', req.body)
  const userInfo = req.session.userInfo || {}
  console.log(userInfo)
  const { CVSStoreID, CVSStoreName, CVSAddress } = req.body
  const storeID = CVSStoreID
  const storeName = CVSStoreName
  const storeAddress = CVSAddress

  if (!userInfo.memberId || !userInfo.name || !userInfo.phone) {
    console.error('缺少必要的session資訊')
    return res.status(400).send('缺少必要的資訊')
  }

  const memberId = userInfo.memberId
  const name = userInfo.name[memberId]
  const phone = userInfo.phone[memberId]
  req.session.addressInfo = {
    id: CVSStoreID,
    name: CVSStoreName,
    address: CVSAddress,
  }
  console.log(req.session)
  res.redirect(
    `http://localhost:3000/cart/checkout?storeID=${CVSStoreID}&memberId=${encodeURIComponent(memberId)}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&storeName=${encodeURIComponent(CVSStoreName)}&storeAddress=${encodeURIComponent(CVSAddress)}`
  )
})

// 清除整個session數據
router.get('/clear-session', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('session 清除失敗:', err)
      return res.status(500).send('session 清除失敗')
    }
    res.send('session 已清除')
  })
})

// 清除從綠界儲存的7-11超商地址資訊
router.get('/clear-address-session/:memberId', (req, res) => {
  const { memberId } = req.params
  console.log('當前session數據：', req.session)
  if (req.session.addressInfo && req.session.addressInfo[memberId]) {
    delete req.session.addressInfo[memberId]
  }
  if (req.session.userInfo && req.session.userInfo[memberId]) {
    delete req.session.userInfo[memberId]
  }
  // 清除SESSION_ID cookie
  res.cookie('SESSION_ID', '', {
    expires: new Date(0),
    path: '/',
    httpOnly: true,
  })
  console.log('清除後的session數據：', req.session)
  res.json({ success: true, message: '超商地址session清除成功' })
})

// 綠界金流付款
router.post('/credit-card', (req, res) => {
  console.log('開始串接綠界金流')
})

export default router
