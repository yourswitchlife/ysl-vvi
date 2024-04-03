// logisticsService.mjs
import express from 'express'
const router = express.Router()
import ECPayLogistics from 'ecpay_logistics_nodejs'
import db from '../configs/db.mjs'
import fetch from 'node-fetch'
// 導入dotenv 使用 .env 檔案中的設定值 process.env
import 'dotenv/config.js'

// let orderDetails = {
//   //要從傳入訂單獲得的動態資訊：
//   merchantTradeDate: '2021/01/27 11:00:45',
//   goodsAmount: 200,
//   collectionAmount: 200,
//   senderName: '林雅琳',
//   senderPhone: '0934567891',
//   senderCellPhone: '0934567891',
//   receiverName: '鄭家豪',
//   receiverPhone: '0989012345',
//   receiverCellPhone: '0989012345',
//   receiverEmail: '',
// }

async function createLogisticsOrder(orderDetails) {
  const serverReplyURL = process.env.REACT_APP_SERVER_REPLY_URL
  const clientReplyURL = process.env.REACT_APP_CLIENT_REPLY_URL
  const logisticsC2CReplyURL = process.env.REACT_APP_LOGISTICS_C2C_REPLY_URL

  const create = new ECPayLogistics({
    MerchantTradeDate: orderDetails.MerchantTradeDate,
    LogisticsType: 'CVS',
    LogisticsSubType: 'UNIMARTC2C',
    GoodsAmount: orderDetails.goodsAmount,
    CollectionAmount: orderDetails.collectionAmount,
    IsCollection: 'Y',
    GoodsName: 'YSL商品訂單',
    SenderName: orderDetails.senderName,
    SenderPhone: orderDetails.senderPhone,
    SenderCellPhone: orderDetails.senderCellPhone,
    ReceiverName: orderDetails.receiverName,
    ReceiverPhone: orderDetails.receiverPhone,
    ReceiverCellPhone: orderDetails.receiverCellPhone,
    ReceiverEmail: orderDetails.receiverEmail,
    TradeDesc: '',
    ServerReplyURL: serverReplyURL,
    ClientReplyURL: clientReplyURL,
    LogisticsC2CReplyURL: logisticsC2CReplyURL,
    Remark: '',
    PlatformID: '',
    ReceiverStoreID: '131386',
    ReturnStoreID: '',
  })

  return create.create_client.create(orderDetails)
}

//把送出給綠界物流時產生的MerchantTradeNo除了給綠界，自己也要留存拿來參照
// async function createOrder(orderDetails, merchantTradeNo) {
//   try{
//     const [result] = await db.execute(`

//     `)
//   }

// }

//創建物流訂單：在這裡也同時收集前端使用者的訂單資訊
router.post('/create-logistics-order', async (req, res) => {
  const merchantTradeNo = generateUniqueTradeNo()
  const orderDetails = {
    ...req.body,
    MerchantTradeNo: merchantTradeNo,
  }

  try {
    //使用樣板引擎pug
    //假設createLogisticsOrder函數現在返回必要的表單動作URL
    // const actionURL = await createLogisticsOrder(orderDetails)
    const htmlForm = await createLogisticsOrder(orderDetails)
    // console.log('我要看到result是啥:', htmlForm)
    //在這裡保存訂單存到資料庫，包含merchantTradeNo
    // await createOrder(req.body, merchantTradeNo)
    res.json({
      form: htmlForm,
    })

    //使用pug樣板而不是直接返回表單
    // res.render('logisticsOrder', { actionURL })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      error: '內部伺服器錯誤',
    })
  }
})

function generateUniqueTradeNo() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 12)
}

//用來更新資料庫的function
// async function updateOrderStatus(logisticsOrderData) {
//   // console.log(MerchantTradeNo)
//   // console.log(status)
//   const { MerchantTradeNo,
//     RtnCode,
//     AllPayLogisticsID,
//     RtnMsg,
//     UpdateStatusDate } = logisticsOrderData
//   try{
//     const [results] = await db.execute(
//       'UPDATE `orders` SET `status` = ? WHERE `MerchantTradeNo` = ?',
//       [newStatus, MerchantTradeNo]
//     )
//     console.log(`訂單${}`)
//   }
async function createMap(base_params) {
  const serverReplyURL = process.env.REACT_APP_SERVER_REPLY_URL
  const merchantTradeNo = generateUniqueTradeNo()

  const create = new ECPayLogistics({
    MerchantTradeNo: merchantTradeNo, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    ServerReplyURL: serverReplyURL, // 物流狀況會通知到此URL
    LogisticsType: 'CVS',
    LogisticsSubType: 'UNIMARTC2C',
    IsCollection: 'Y',
    ExtraData: '',
    Device: 0,
  })

  return create.query_client.expressmap(base_params)
}

//創建電子地圖
router.post('/c2cMap', async (req, res) => {
  const merchantTradeNo = generateUniqueTradeNo()
  const base_params = {
    ...req.body,
    MerchantTradeNo: merchantTradeNo,
  }

  try {
    const htmlForm = await createMap(base_params)
    console.log('我要看到result是啥:', htmlForm)
    //在這裡保存訂單存到資料庫，包含merchantTradeNo
    // await createOrder(req.body, merchantTradeNo)

    res.json({
      form: htmlForm,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      error: '內部伺服器錯誤',
    })
  }
})

// let res = create.query_client.expressmap((parameters = base_param))
// if (typeof res === 'string') {
//   console.log(res)
// } else {
//   res
//     .then(function (result) {
//       console.log(result)
//     })
//     .catch(function (err) {
//       console.log(err)
//     })
// }

router.post('/ecpay/serverReply', async (req, res) => {
  //處理來自綠界物流的回應
  // console.log('創建訂單之後綠界物流會發通知過來', req.body)
  //根據內容來更新訂單狀態:把trade_no內容寫進orders資料表
  //更新資料庫的訂單訊息：還要自己寫
  // updateOrderStatus(result.MerchantTradeNo, 'Shipping') //這個是要放的東東，沒有作用
  // res.status(200).send('OK')
  try {
    console.log('創建訂單之後綠界物流會發通知過來', req.body)
    console.log(req.body.AllPayLogisticsID)

    // 在req.body找到重要訊息！
    // 這裡假設綠界用MerchantTradeNo來標示交易
    const {
      MerchantTradeNo,
      RtnCode,
      AllPayLogisticsID,
      RtnMsg,
      UpdateStatusDate,
    } = req.body

    // RtnCode是綠界返回的交易碼
    if (RtnCode === '300') {
      // 假设"Shipping"是您定义的订单状态之一
      // await updateOrderStatus(AllPayLogisticsID, 'Shipping')
      console.log(
        `訂單 ${AllPayLogisticsID}, 狀態為：${RtnMsg}, 更新時間為${UpdateStatusDate}`
      )
      res
        .status(200)
        .send(
          `訂單 ${AllPayLogisticsID}, 狀態為：${RtnMsg}, 更新時間為${UpdateStatusDate}`
        )
    } else {
      // 如果RtnCode不是300，表示錯誤或其他狀態
      console.error(
        `訂單 ${MerchantTradeNo} 更新失敗，收到綠界狀態碼： ${RtnCode}`
      )
      res
        .status(400)
        .send(
          `Order update failed:訂單 ${MerchantTradeNo} 更新失敗，收到綠界狀態碼： ${RtnCode}`
        )
    }
  } catch (error) {
    console.error('處理綠界回調出錯:', error)
    res.status(500).send('Internal Server Error')
  }
})

router.post('/ecpay/clientReply', (req, res) => {
  //處理來自綠界物流的回應
  console.log('重新定向給顧客的連結', req.body)
  const lognum = req.body.AllPayLogisticsID
  //根據內容來更新訂單狀態
  //讓賣家去seller/orders這裡看物件編號，物流狀態
  // res.redirect(`./order/lognum=${lognum}`)
  res.status(200).send(`取得物流編號成功:${lognum}`)
})

router.post('/ecpay/logisticsC2CReply', (req, res) => {
  //處理來自綠界物流的回應
  console.log('收到綠界物流狀態的更新', req.body)

  //根據內容來更新訂單狀態
  //這裡如果更新了，也要更新orders資料表的shipping_status

  res.status(200).send(`OK`)
})

export default router
