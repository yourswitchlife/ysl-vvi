import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'

// 商品詳細頁 ([0-9]+)
// try {
//   const [results, fields] = await db.execute(
//     'SELECT * FROM `member` WHERE `id` = 1'
//   )
//   console.log(results)
// } catch (error) {
//   console.error(error)
// }

//我的賣場
router.get('/:shop_site', async (req, res) => {
  try {
    let { shop_site } = req.params
    // console.log(`shop_site = ${shop_site}`)
    let [shop] = await db.execute(
      'SELECT * FROM `member` WHERE `shop_site` = ?',
      [shop_site]
    )
    console.log(shop)
    //檢查查詢結果是否為空值
    if (shop.length === 0) {
      return res.status(404).send({ message: '查無此賣場' })
    }
    // 走上必要之惡...JOIN...
    let [shopProducts] = await db.execute(
      `SELECT product.* FROM product 
      INNER JOIN member ON product.member_id = member.id
      WHERE member.shop_site = ?`,
      [shop_site]
    )
    console.log(shopProducts)
    if (shopProducts.length > 0) {
      // 如果找到了商品信息
      res.json({ shop, shopProducts }) // 解析json对象
    } else {
      // 如果会员存在但没有找到商品信息
      res.status(404).send({ message: '查無此賣場商品' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Server error' })
  }
})

//搜尋賣場商品
router.get('/:shop_site/search', async (req, res) => {
  let { shop_site } = req.params
  let key = `%${req.query.key}%`
  console.log(key)
  // let key = decodeURIComponent(req.query.key) //獲取搜尋的關鍵字+解碼URI元件
  // if (!key) {
  //   return res.status(400).send({ message: '缺少搜尋關鍵字' })
  // }
  try {
    //先確認有這個賣場
    let [shop] = await db.execute(
      'SELECT `id` FROM `member` WHERE `shop_site` = ?',
      [shop_site]
    )
    if (shop.length === 0) {
      return res.status(404).send({ message: '查無此賣場' })
    }
    const memberId = shop[0].id

    //根據memberId和搜尋關鍵字查詢商品
    let [products] = await db.execute(
      'SELECT * FROM `product` WHERE `member_id` = ? AND `name` LIKE ?',
      [memberId, key]
    )
    console.log(products)
    if (products.length > 0) {
      res.json(products)
    } else {
      res.status(404).send({ message: '賣場查無此商品' })
    }
  } catch (error) {
    console.error('SQL查詢失敗：', error.message)
    res.status(500).send({ message: 'Server error' })
  }
})

// function productsSearch(req) {
//   return new Promise((resolve, reject) => {
//     let key = req.query.key
//     let results = db
//       .get('product')
//       .filter((product) => product.name.includes(key))
//       .value()
//     if (results) {
//       resolve(results)
//     } else {
//       reject({ error: '找不到此商品' })
//     }
//   })
// }

export default router
