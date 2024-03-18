// logisticsService.mjs
import express from 'express'
const router = express.Router()
import ECPayLogistics from 'ecpay_logistics_nodejs'
import fetch from 'node-fetch'

// 初始化ECPay Logistics SDK的配置
// const ecpayLogistics = new ECPayLogistics({
//   MerchantID: '2000933',
//   HashKey: 'XBERn1YOvpM9nfZc',
//   HashIV: 'h1ONHk4P4yqbl5LK',
//   // 其他需要的配置...
// })

// 创建物流订单的函数
// async function createLogisticsOrder(orderDetails) {
//   // const orderDetails = {
//   //   MerchantTradeNo: '',
//   //   MerchantTradeDate: '2024/02/15 08:40:00',
//   //   LogisticsType: 'CVS',
//   //   LogisticsSubType: 'UNIMARTC2C',
//   //   GoodsAmount: 950,
//   //   CollectionAmount: 950,
//   //   IsCollection: 'Y',
//   //   GoodsName: 'YSL商品訂單',
//   //   SenderName: '林雅琳',
//   //   SenderPhone: '0934567891',
//   //   SenderCellPhone: '0934567891',
//   //   ReceiverName: '鄭家豪',
//   //   ReceiverPhone: '0989012345',
//   //   ReceiverCellPhone: '0989012345',
//   //   ReceiverEmail: '',
//   //   TradeDesc: '',
//   //   ServerReplyURL:
//   //     'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
//   //   ClientReplyURL: 'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
//   //   LogisticsC2CReplyURL: 'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
//   //   Remark: '',
//   //   PlatformID: '',
//   //   ReceiverStoreID: '131386',
//   //   ReturnStoreID: '131386',
//   // }
//   // 使用ecpayLogistics对象进行API调用，创建物流订单
//   const url = 'https://logistics-stage.ecpay.com.tw/Express/CreateTestData'
//   const formData = new URLSearchParams(orderDetails).toString()
//   const params = new URLSearchParams(orderDetails)
//   console.log(formData)
//   console.log(params.get('MerchantTradeDate'))

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: formData,
//   })
//   const responseBody = await response.text() //先獲取響應文本
//   console.log(responseBody)

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`)
//   }

//   const data = JSON.parse(responseBody) //假設響應是JSON嘗試解析他
//   console.log(data)
//   return data
// }
// export { createLogisticsOrder }

function generateUniqueTradeNo() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 10)
}

let orderDetails = {
  //假設這裡有一些從其他地方獲取的數據
  merchantTradeDate: '2021/01/27 11:00:45',
  goodsAmount: 200,
  collectionAmount: 200,
  senderName: '林雅琳',
  senderPhone: '0934567891',
  senderCellPhone: '0934567891',
  receiverName: '鄭家豪',
  receiverPhone: '0989012345',
  receiverCellPhone: '0989012345',
  receiverEmail: '',
}

//example文檔
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
let base_param = {
  MerchantTradeNo: generateUniqueTradeNo(),
  MerchantTradeDate: orderDetails.merchantTradeDate.toString(),
  LogisticsType: 'CVS',
  LogisticsSubType: 'UNIMARTC2C',
  GoodsAmount: orderDetails.goodsAmount.toString(),
  CollectionAmount: orderDetails.collectionAmount.toString(),
  IsCollection: '',
  GoodsName: 'YSL遊戲商品',
  SenderName: orderDetails.senderName.toString(),
  SenderPhone: orderDetails.senderPhone.toString(),
  SenderCellPhone: orderDetails.senderCellPhone.toString(),
  ReceiverName: orderDetails.receiverName.toString(),
  ReceiverPhone: orderDetails.receiverPhone.toString(),
  ReceiverCellPhone: orderDetails.receiverCellPhone.toString(),
  ReceiverEmail: orderDetails.receiverEmail.toString(),
  TradeDesc: '',
  ServerReplyURL:
    'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
  ClientReplyURL:
    'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
  LogisticsC2CReplyURL:
    'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
  Remark: '',
  PlatformID: '',
  ReceiverStoreID: '991182',
  ReturnStoreID: '',
}
//創建物流訂單
let create = new ECPayLogistics() // 注意這裡的構造函數調用

let res = create.create_client.create(base_param)
if (typeof res === 'string') {
  // console.log(res)
} else {
  res
    .then(function (result) {
      console.log(result)
    })
    .catch(function (err) {
      console.log(err)
    })
}

// router.post('/create-logistics-order', async (req, res) => {
//   console.log(req.body)
//   try {
//     // const result = await createLogisticsOrder(req.body)
//     const orderDetails = req.body
//     const result = await createLogisticsOrder(orderDetails)
//     console.log(result)
//     res.json(result)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: error.message })
//   }
// })

export default router
