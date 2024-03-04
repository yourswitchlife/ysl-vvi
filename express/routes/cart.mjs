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

// 取得對應優惠券

export default router
