// logisticsService.mjs
import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import ECPayLogistics from 'ecpay_logistics_nodejs'
import fetch from 'node-fetch'
// 初始化ECPay Logistics SDK的配置
const ecpayLogistics = new ECPayLogistics({
  MerchantID: '2000933',
  HashKey: 'XBERn1YOvpM9nfZc',
  HashIV: 'h1ONHk4P4yqbl5LK',
  // 其他需要的配置...
})

// 创建物流订单的函数
async function createLogisticsOrder() {
  const orderDetails = {
    MerchantTradeNo: '',
    MerchantTradeDate: '2024/02/15 08:40:00',
    LogisticsType: 'CVS',
    LogisticsSubType: 'UNIMARTC2C',
    GoodsAmount: 950,
    CollectionAmount: 950,
    IsCollection: 'Y',
    GoodsName: 'YSL商品訂單',
    SenderName: '林雅琳',
    SenderPhone: '0934567891',
    SenderCellPhone: '0934567891',
    ReceiverName: '鄭家豪',
    ReceiverPhone: '0989012345',
    ReceiverCellPhone: '0989012345',
    ReceiverEmail: '',
    TradeDesc: '',
    ServerReplyURL: '',
    ClientReplyURL: 'http://localhost:3000/seller/order',
    LogisticsC2CReplyURL: 'http://localhost:3000/member/order',
    Remark: '',
    PlatformID: '',
    ReceiverStoreID: '131386',
    ReturnStoreID: '131386',
  }
  // 使用ecpayLogistics对象进行API调用，创建物流订单
  const url = 'https://logistics-stage.ecpay.com.tw/Express/CreateTestData'
  const formData = new URLSearchParams(orderDetails).toString()

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  console.log(data)
}

router.post('')

export { createLogisticsOrder }
export default router
