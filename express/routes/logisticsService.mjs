// logisticsService.mjs
import express from 'express'
const router = express.Router()
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
async function createLogisticsOrder(orderDetails) {
  // const orderDetails = {
  //   MerchantTradeNo: '',
  //   MerchantTradeDate: '2024/02/15 08:40:00',
  //   LogisticsType: 'CVS',
  //   LogisticsSubType: 'UNIMARTC2C',
  //   GoodsAmount: 950,
  //   CollectionAmount: 950,
  //   IsCollection: 'Y',
  //   GoodsName: 'YSL商品訂單',
  //   SenderName: '林雅琳',
  //   SenderPhone: '0934567891',
  //   SenderCellPhone: '0934567891',
  //   ReceiverName: '鄭家豪',
  //   ReceiverPhone: '0989012345',
  //   ReceiverCellPhone: '0989012345',
  //   ReceiverEmail: '',
  //   TradeDesc: '',
  //   ServerReplyURL:
  //     'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
  //   ClientReplyURL: 'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
  //   LogisticsC2CReplyURL: 'https://6fae-2001-b400-e352-c041-a1a9-9e85-6f97-d74b.ngrok-free.app',
  //   Remark: '',
  //   PlatformID: '',
  //   ReceiverStoreID: '131386',
  //   ReturnStoreID: '131386',
  // }
  // 使用ecpayLogistics对象进行API调用，创建物流订单
  const url = 'https://logistics-stage.ecpay.com.tw/Express/CreateTestData'
  const formData = new URLSearchParams(orderDetails).toString()
  const params = new URLSearchParams(orderDetails)
  console.log(formData)
  console.log(params.get('MerchantTradeDate'))

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
  const responseBody = await response.text() //先獲取響應文本
  console.log(responseBody)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = JSON.parse(responseBody) //假設響應是JSON嘗試解析他
  console.log(data)
  return data
}

router.post('/create-logistics-order', async (req, res) => {
  console.log(req.body)
  try {
    // const result = await createLogisticsOrder(req.body)
    const orderDetails = req.body
    const result = await createLogisticsOrder(orderDetails)
    console.log(result)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

export { createLogisticsOrder }
export default router
