import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import authenticate from '../middlewares/authenticate-cookie.js'
import multer from 'multer'
const upload = multer({ dest: 'public/shopCover/' })
import moment from 'moment'

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
    // console.log(shop)
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
    // console.log(shopProducts)
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

//讀取此賣場訂單
router.get('/:shop_site/order', async (req, res) => {
  let { shop_site } = req.params
  let [shopOrders] = await db.execute(
    `SELECT orders.* FROM orders 
    INNER JOIN member ON orders.member_seller_id = member.id
    WHERE member.shop_site = ?`,
    [shop_site]
  )
  // console.log(shopOrders)
  if (shopOrders.length > 0) {
    // 如果找到了訂單訊息
    res.json(shopOrders) // 解析json对象
  } else {
    // 如果会员存在但没有找到訂單訊息
    res.status(404).send({ message: '查無此賣場商品訂單' })
  }
})

//讀取此賣場收藏人數
router.get('/:shop_site/fav_shop', async (req, res) => {
  let { shop_site } = req.params
  let [shopFav] = await db.execute(
    `SELECT fav_shop.* FROM fav_shop 
    INNER JOIN member ON fav_shop.seller_id = member.id
    WHERE member.shop_site = ?`,
    [shop_site]
  )
  // console.log(shopOrders)
  if (shopFav.length > 0) {
    // 如果找到了收藏的人
    res.json(shopFav) // 解析json对象
  } else {
    // 如果会员存在但没有找到訂單訊息
    res.status(404).send({ message: '查無此賣場收藏者' })
  }
})

//創建這個賣場的收藏
router.post(
  '/:shop_site/fav_shop',
  upload.none(),
  authenticate,
  async (req, res) => {
    const dateString = new Date() //創建商品日期
    const created_at = moment(dateString).format('YYYY-MM-DD HH:mm:ss')
    const buyer_id = req.memberData.id
    let { shop_site } = req.params
    if (!req.memberData.id) {
      // 如果memberData不存在，则返回错误信息
      return res.status(400).json({ message: '找不到member id' })
    }
    if (isNaN(buyer_id) || buyer_id < 0) {
      // 如果 memberId 不是一個正整數，返回錯誤響應
      return res.status(400).json({ message: 'Invalid member_id' })
    }

    try {
      //取得shop_site的member_id
      const [rows] = await db.execute(
        'SELECT `id` FROM `member` WHERE `shop_site` = ?',
        [shop_site]
      )
      if (rows.length > 0) {
        const seller_id = rows[0].id
        const Query =
          'INSERT INTO `fav_shop` (`buyer_id`, `seller_id`, `created_at`) VALUES (?, ?, ?)'
        await db.execute(Query, [buyer_id, seller_id, created_at])
        res.status(200).json({ message: '收藏成功' })
      } else {
        res.status(404).json({ message: '找不到對應的賣場' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: '伺服器錯誤' })
    }
  }
)
//取消這個賣場的收藏(toggle)
router.delete(
  '/:shop_site/fav_shop',
  upload.none(),
  authenticate,
  async (req, res) => {
    console.log(req.memberData)
    const buyer_id = req.memberData.id
    let { shop_site } = req.params
    if (!req.memberData.id) {
      // 如果memberData不存在，则返回错误信息
      return res.status(400).json({ message: '找不到member id' })
    }
    if (isNaN(buyer_id) || buyer_id < 0) {
      // 如果 memberId 不是一個正整數，返回錯誤響應
      return res.status(400).json({ message: 'Invalid member_id' })
    }

    try {
      //取得shop_site的member_id
      const [rows] = await db.execute(
        'SELECT `id` FROM `member` WHERE `shop_site` = ?',
        [shop_site]
      )
      if (rows.length > 0) {
        const seller_id = rows[0].id
        const Query =
          'DELETE FROM `fav_shop` WHERE `buyer_id` = ? AND `seller_id` = ?'
        await db.execute(Query, [buyer_id, seller_id])
        res.status(200).json({ message: '取消收藏成功' })
      } else {
        res.status(404).json({ message: '找不到對應的賣場' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: '伺服器錯誤' })
    }
  }
)

//讀取此賣場評價
router.get('/:shop_site/shop_comment', async (req, res) => {
  let { shop_site } = req.params
  let [shopComment] = await db.execute(
    `SELECT shop_comment.* FROM shop_comment 
    INNER JOIN member ON shop_comment.shop_id = member.id
    WHERE member.shop_site = ?`,
    [shop_site]
  )
  // console.log(shopOrders)
  if (shopComment.length > 0) {
    // 如果找到了評價
    res.json(shopComment) // 解析json对象
  } else {
    // 如果会员存在但没有找到評價
    res.status(404).send({ message: '查無此賣場評價' })
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
    // console.log(products)
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

//排序商品：價格升降冪&發行時間升降冪
router.get('/:shop_site/products', async (req, res) => {
  const { shop_site } = req.params
  const { sort } = req.query // 假设 sort 可以是 'price_asc' 或 'price_desc'

  try {
    let orderByClause = ''
    if (sort === 'price_asc') {
      orderByClause = 'ORDER BY product.price ASC'
    } else if (sort === 'price_desc') {
      orderByClause = 'ORDER BY product.price DESC'
    } else if (sort === 'release_time_asc') {
      orderByClause = 'ORDER BY product.release_time ASC'
    } else if (sort === 'release_time_desc') {
      orderByClause = 'ORDER BY product.release_time DESC'
    }

    const [shopProducts] = await db.execute(
      `
    SELECT product.* FROM product INNER JOIN member ON product.member_id = member.id WHERE member.shop_site = ? ${orderByClause}
    `,
      [shop_site]
    )

    if (shopProducts.length > 0) {
      res.json({ shopProducts })
    } else {
      res.status(404).send({ message: '查無此賣場商品' })
    }
  } catch (error) {
    console.error('SQL查詢失敗：', error)
    res.status(500).send({ message: 'Server error' })
  }
})

//找出所有有評價的shop和rating
router.get('/', async (req, res) => {
  let [shopInfo] = await db.execute(
    `SELECT shop_comment.id, shop_comment.rating,shop_comment.shop_id, member.shop_name, member.pic FROM shop_comment 
    INNER JOIN member ON shop_comment.shop_id = member.id
    WHERE member.shop_valid = 1`
  )
  // console.log(shopOrders)
  if (shopInfo.length > 0) {
    // 如果找到了所有的shop和rating
    res.json(shopInfo) // 解析json对象
  } else {
    // 如果没有找到所有的shop和rating
    res.status(404).send({ message: '查無此賣場及評價' })
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
