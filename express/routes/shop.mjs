import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import authenticate from '../middlewares/authenticate-cookie.js'
import multer from 'multer'
const upload = multer({ dest: 'public/shopCover/' })
import moment from 'moment'

//我的賣場
// router.get('/:shop_site', async (req, res) => {
//   try {
//     let { shop_site } = req.params
//     // console.log(`shop_site = ${shop_site}`)
//     let [shop] = await db.execute(
//       'SELECT * FROM `member` WHERE `shop_site` = ?',
//       [shop_site]
//     )
//     // console.log(shop)
//     //檢查查詢結果是否為空值
//     if (shop.length === 0) {
//       return res.status(404).send({ message: '查無此賣場' })
//     }
//     // 走上必要之惡...JOIN...
//     let [shopProducts] = await db.execute(
//       `SELECT product.* FROM product
//       INNER JOIN member ON product.member_id = member.id
//       WHERE member.shop_site = ?`,
//       [shop_site]
//     )
//     // console.log(shopProducts)
//     if (shopProducts.length > 0) {
//       // 如果找到了商品信息
//       res.json({ shop, shopProducts }) // 解析json对象
//     } else {
//       // 如果会员存在但没有找到商品信息
//       res.status(404).send({ message: '查無此賣場商品' })
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({ message: 'Server error' })
//   }
// })

//--------------------賣場名稱----------------------//
router.get('/:shop_site', async (req, res) => {
  const { shop_site } = req.params
  try {
    const [shopName] = await db.execute(
      `SELECT shop_name FROM member WHERE shop_site = ?`,
      [shop_site]
    )
    if (shopName.length === 0) {
      return res.status(404).json({ message: '查無此賣場' })
    }
    const shop_name = shopName[0].shop_name
    res.json({ shop_name })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

//--------------------賣場資料----------------------//
router.get('/:shop_site/overview', async (req, res) => {
  const { shop_site } = req.params
  const { sort } = req.query // 假設 sort 可以是 'price_asc' 或 'price_desc'
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 15
  const offset = (page - 1) * limit
  const buyer_id = req.memberData ? req.memberData.id : null

  try {
    // 首先shop_site的member
    const [memberCheck] = await db.execute(
      `SELECT id, pic, shop_cover, shop_info, shop_name FROM member WHERE shop_site = ?`,
      [shop_site]
    )
    if (memberCheck.length === 0) {
      return res.status(404).json({ message: '查無此賣場' })
    }

    const memberId = memberCheck[0].id // 賣場的member ID
    const pic = memberCheck[0].pic
    const shop_cover = memberCheck[0].shop_cover
    const shop_info = memberCheck[0].shop_info
    const shop_name = memberCheck[0].shop_name
    const seller_id = memberCheck[0].id

    // 商品列表+排序
    let orderByClause = 'ORDER BY product.id'
    switch (sort) {
      case 'price_asc':
        orderByClause = 'ORDER BY product.price ASC'
        break
      case 'price_desc':
        orderByClause = 'ORDER BY product.price DESC'
        break
      case 'release_time_asc':
        orderByClause = 'ORDER BY product.release_time ASC'
        break
      case 'release_time_desc':
        orderByClause = 'ORDER BY product.release_time DESC'
        break
      default:
      // 照 product.id 排序
    }

    const [products] = await db.execute(
      `
      SELECT product.*, COUNT(product.id) OVER() AS totalItems
      FROM product
      WHERE product.member_id = ?
      ${orderByClause}
      LIMIT ?, ?
      `,
      [memberId, offset, limit]
    )

    const totalItems = products.length > 0 ? products[0].totalItems : 0 // 賣場總商品數
    const totalPages = Math.ceil(totalItems / limit) //總頁數

    // 移除totalItems（不是商品的一部分）
    const items = products.map(({ totalItems, ...product }) => product)

    // 訂單
    let [orders] = await db.execute(
      `SELECT orders.* FROM orders
      WHERE orders.member_seller_id = ?`,
      [memberId]
    )
    // 收藏
    let [shopFav] = await db.execute(
      `SELECT fav_shop.* FROM fav_shop
      INNER JOIN member ON fav_shop.seller_id = member.id
      WHERE member.shop_site = ? AND fav_shop.valid = 1`,
      [shop_site]
    )

    //判斷是否已經收藏
    const isFav = shopFav.some((fav) => fav.buyer_id === buyer_id)

    // 評價
    let [shopComment] = await db.execute(
      `SELECT AVG(shop_comment.rating) AS avg_rating, COUNT(shop_comment.id) AS total_comments
      FROM shop_comment
      INNER JOIN member ON shop_comment.shop_id = member.id
      WHERE member.shop_site = ?`,
      [shop_site]
    )

    const responseData = {
      shopInfo: {
        seller_id,
        shop_name,
        shop_site,
        shop_info,
        pic,
        shop_cover,
        totalItems,
        totalPages,
      },
      products: items,
      orders,
      favCount: shopFav.length, // 添加收藏數量
      isFav,
      favDetails: shopFav, // 詳細收藏數據
      shopComments: shopComment,
    }

    res.json(responseData)
  } catch (error) {
    console.error('獲取賣場資料錯誤：', error)
    res.status(500).json({ message: 'Server error' })
  }
})

//我的賣場加入頁碼版本
router.get('/:shop_site', async (req, res) => {
  // const shopId = req.query.memberId錯的 這樣子會抓到瀏覽者的
  const { shop_site } = req.params
  const { sort } = req.query // 假设 sort 可以是 'price_asc' 或 'price_desc'
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 15
  const offset = (page - 1) * limit

  try {
    // 首先檢查是否存在這個shop_site對應的member
    const [memberCheck] = await db.execute(
      `SELECT id FROM member WHERE shop_site = ?`,
      [shop_site]
    )
    if (memberCheck.length === 0) {
      return res.status(404).json({ message: '查無此賣場' })
    }
    //檢查這個賣場有沒有賣東西
    // const [memberCheck] = await db.execute(
    //   `SELECT id FROM member WHERE shop_site = ?`,
    //   [shop_site]
    // )
    // if (memberCheck.length === 0) {
    //   return res.status(404).json({ message: '查無此賣場' })
    // }

    let orderByClause = 'ORDER BY product.id'
    switch (sort) {
      case 'price_asc':
        orderByClause = 'ORDER BY product.price ASC'
        break
      case 'price_desc':
        orderByClause = 'ORDER BY product.price DESC'
        break
      case 'release_time_asc':
        orderByClause = 'ORDER BY product.release_time ASC'
        break
      case 'release_time_desc':
        orderByClause = 'ORDER BY product.release_time DESC'
        break
      default:
      // 默认按照 product.id 排序，不需要额外操作
    }

    const [results] = await db.execute(
      `
      SELECT member.*, product.*, COUNT(product.id) OVER() AS totalItems
      FROM member
      INNER JOIN product ON product.member_id = member.id
      WHERE member.shop_site = ?
      ${orderByClause}
      LIMIT ?, ?
      `,
      [shop_site, offset, limit]
    )
    if (results.length === 0) {
      return res.status(404).send({ message: '查無此賣場的商品' })
    }
    // const shop = results[0]
    const totalItems = results[0].totalItems //這個賣場有多少商品
    const totalPages = Math.ceil(totalItems / limit) //總頁數

    // 移除totalItems屬性，因爲它不是商品的一部分
    const items = results.map((item) => {
      const { totalItems, ...product } = item
      return product
    })

    const responseData = {
      shop: results[0],
      items,
      totalItems,
      totalPages,
    }

    res.json(responseData)
  } catch (error) {
    console.error('取得賣場商品列表出錯：', error)
    res.status(500).json({ message: 'Server error' })
  }
})

//--------------------賣場訂單----------------------//
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

//--------------------收藏賣場----------------------//
//讀取此賣場收藏人數
router.get('/:shop_site/fav_shop', async (req, res) => {
  let { shop_site } = req.params
  let [shopFav] = await db.execute(
    `SELECT fav_shop.* FROM fav_shop 
    INNER JOIN member ON fav_shop.seller_id = member.id
    WHERE member.shop_site = ? AND fav_shop.valid = 1`,
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

//創建更新這個賣場的收藏
router.put(
  '/:shop_site/fav_shop',
  upload.none(),
  authenticate,
  async (req, res) => {
    const dateString = new Date() //創建商品日期
    const created_at = moment(dateString).format('YYYY-MM-DD HH:mm:ss')
    const buyer_id = req.memberData.id
    const valid = req.body.valid //前端來給
    let { shop_site } = req.params

    if (!buyer_id || isNaN(buyer_id) || buyer_id < 0) {
      // 如果 memberId 不是一個正整數，返回錯誤響應
      return res.status(400).json({ message: 'Invalid member_id' })
    }

    try {
      //查詢賣家ID
      const [sellerRows] = await db.execute(
        'SELECT `id` FROM `member` WHERE `shop_site` = ?',
        [shop_site]
      )
      if (sellerRows.length === 0) {
        return res.status(404).json({ message: '找不到對應的賣場' })
      }
      const seller_id = sellerRows[0].id

      if (buyer_id === seller_id) {
        return res.status(400).json({ message: '無法收藏自己的賣場喔！' })
      }
      //檢查是否已收藏過此賣場
      const [favRows] = await db.execute(
        'SELECT * FROM `fav_shop` WHERE `buyer_id` = ? AND `seller_id` = ?',
        [buyer_id, seller_id]
      )
      if (favRows.length > 0) {
        //已經存在更新valid值
        await db.execute(
          'UPDATE `fav_shop` SET `valid` = ?, `created_at` = ? WHERE `buyer_id` = ? AND `seller_id` = ?',
          [valid, created_at, buyer_id, seller_id]
        )
      } else {
        //new
        if (valid === 1) {
          await db.execute(
            'INSERT INTO `fav_shop` (`buyer_id`, `seller_id`, `created_at`, `valid`) VALUES (?, ?, ?, ?)',
            [buyer_id, seller_id, created_at, valid]
          )
        } else {
          return res
            .status(400)
            .json({ message: '無效的操作，該賣場尚未被收藏' })
        }
      }
      const message = valid === 1 ? '收藏成功' : '取消收藏成功'
      res.status(200).json({ message })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: '伺服器錯誤' })
    }
  }
)

//--------------------賣場評價----------------------//
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

//--------------------賣場商品----------------------//
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
  let [shopRating] = await db.execute(`
  SELECT shop_id, 
    AVG(rating) AS average_rating
  FROM 
    shop_comment
  GROUP BY 
    shop_id
`)

  let [shop] = await db.execute(
    'SELECT `id`, `shop_name`, `shop_site`, `pic` FROM `member` WHERE `shop_valid` = 1'
  )
  // console.log(shop)

  if (shopRating.length > 0 && shop.length) {
    // 如果找到了所有的shop和rating
    res.json({ shopRating, shop }) // 解析json对象
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
