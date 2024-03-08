import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'

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
    const existingAddress = existingAddresses[0]
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

export default router
