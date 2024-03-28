import express from 'express'
const router = express.Router()
// import authenticate from '../middlewares/authenticate.js'
import db from '../configs/db.mjs'
import authenticate from '../middlewares/authenticate-cookie.js'
import multer from 'multer'
import path from 'path'
import moment from 'moment'

//authenticate
//賣家中心後台首頁(OK): #Read
router.get('/', authenticate, async (req, res) => {
  // try {
  const memberId = req.memberData.id
  if (!req.memberData) {
    // 如果memberData不存在，则返回错误信息
    return res.status(400).json({ message: '找不到member data' })
  }

  let [comments] = await db.execute(
    'SELECT * FROM `shop_comment` WHERE `shop_id` = ?',
    [memberId]
  )
  // console.log(comments)
  // res.json(comments)
  let [orders] = await db.execute(
    'SELECT * FROM `orders` WHERE `member_seller_id` = ?',
    [memberId]
  )

  let [lackItems] = await db.execute(
    'SELECT * FROM `product` WHERE `member_id` = ? AND `product_quanty` = 0',
    [memberId]
  )

  res.json({ orders, comments, lackItems })
  // console.log(orders)
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).send('Server Error')
  // }
})

//賣場管理 查看資料OK #Read
router.get('/shop', authenticate, async (req, res) => {
  try {
    const memberId = req.memberData.id
    if (!req.memberData) {
      // 如果memberData不存在，则返回错误信息
      return res.status(400).json({ message: '找不到member data' })
    }

    let [shops] = await db.execute(
      'SELECT * FROM `member` WHERE `id` = ? AND `shop_valid` = 1',
      [memberId]
    )
    // console.log(shops)
    res.json(shops)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})
//shopCover參照member pic也用按鈕上傳
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/shopCover') //上傳檔案的資料夾
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //以時間戳記作為檔名
  },
})
const upload = multer({ storage: storage })
//賣場管理 編輯及新增賣場資料OK #Create
//注意：新增賣場其實是更新member資料
//在前端執行：抓取預設值存入 與 實現兩個按鈕：分別是shop_valid = 0 或shop_valid = 1
router.put('/shop/edit', authenticate, upload.none(), async (req, res) => {
  const { shop_name, shop_site, shop_info } = req.body
  const shop_valid = 1 //預設儲存賣場就上架商品
  const memberId = req.memberData.id
  if (!req.memberData.id) {
    // 如果memberData不存在
    return res.status(400).json({ message: '找不到member data' })
  }

  try {
    //檢查賣場名稱，但要排除現在的用戶！
    const shopNameCheckQuery =
      'SELECT * FROM `member` WHERE `shop_name` = ? AND `id` != ?'
    const [shopNameResults] = await db.execute(shopNameCheckQuery, [
      shop_name,
      memberId,
    ])

    if (shopNameResults.length > 0) {
      return res.status(400).send({ message: '賣場名稱已經存在' })
    }
    //檢查網址有沒有重複，但要排除現在的用戶！（預設網址是member.account)
    const shopSiteCheckQuery =
      'SELECT * FROM `member` WHERE shop_site = ? AND `id` != ?'
    const [shopSiteResults] = await db.execute(shopSiteCheckQuery, [
      shop_site,
      memberId,
    ])

    if (shopSiteResults.length > 0) {
      return res.status(400).send({ message: '賣場網址已經存在' })
    }
    const updateQuery = `UPDATE member SET shop_name = ?, shop_site = ?, shop_info = ?, shop_valid = ? WHERE id = ?`
    const [updateResults] = await db.execute(updateQuery, [
      shop_name,
      shop_site,
      shop_info,
      shop_valid,
      memberId,
    ])

    if (updateResults.affectedRows > 0) {
      //賣場資訊更新成功
      const [results] = await db.execute(`SELECT * FROM member WHERE id =?`, [
        memberId,
      ])
      res.status(200).json(results[0])
    } else {
      //賣場資訊更新失敗
      res.status(404).json({ error: 'member shop not found.' })
    }
  } catch (error) {
    res.status(500).send({ message: '建立失敗' })
    console.log('資料庫相關錯誤：', error)
  }
})

//shopCover
router.put(
  '/shop/shopCover',
  authenticate,
  upload.single('file'),
  async (req, res) => {
    const memberId = req.memberData.id
    if (typeof memberId === 'undefined') {
      return res
        .status(400)
        .json({ error: '未經認證的用戶，無法獲取 memberId' })
    }
    console.log('Authenticated memberId:', memberId)

    console.log('after file upload')
    console.log('uploaded file info:', req.file)
    console.log('Form data:', req.body)
    const filePath = req.file.path //上傳後的檔案路徑
    const filename = path.basename(filePath)
    const shopCoverQuery = 'UPDATE member SET shop_cover = ? WHERE id = ?'

    try {
      //執行SQL更新
      const [shopCoverResults] = await db.execute(shopCoverQuery, [
        filename,
        memberId,
      ])
      console.log('Executeing SQL query:', shopCoverQuery, [filename, memberId])

      if (shopCoverResults.affectedRows > 0) {
        //updated successfully
        res.status(200).json({ success: true, message: '賣場封面上傳成功' })
      } else {
        //updated failed
        res.status(404).json({ error: '賣場封面上傳失敗' })
      }
    } catch (error) {
      console.error('上傳封面照的錯誤：', error.message)
      console.error('錯誤：', error)
      res.status(500).json({ error: '上傳途中發生錯誤', detail: error.message })
    }
  }
)

//賣家商品管理OK #Read
router.get('/product', authenticate, async (req, res) => {
  const tab = req.query.tab || 'all'
  const search = req.query.search || ''
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 7
  const offset = (page - 1) * limit

  try {
    const memberId = req.memberData.id
    if (!req.memberData) {
      // 如果memberData不存在，则返回错误信息
      return res.status(400).json({ message: '找不到member data' })
    }
    const queryParams = [memberId]

    //判斷tab為all時，不應用valid的條件過濾
    //只有在tab不為all時才根據tab的值
    let validCondition = ''
    if (tab !== 'all') {
      validCondition = ` AND product.valid = ${tab === 'unShop' ? '0' : '1'}`
    }

    let sqlBase = `
  FROM product
  LEFT JOIN orders ON orders.product_id = product.id
  LEFT JOIN fav_product ON fav_product.product_id = product.id AND fav_product.valid = 1
  LEFT JOIN p_type ON product.type_id = p_type.id
  WHERE product.member_id = ?${validCondition}
`

    if (tab === 'soldout') {
      sqlBase += ` AND product.product_quanty = 0 
    `
    }

    if (search.trim() !== '') {
      sqlBase += ` AND product.name LIKE ?`
      queryParams.push(`%${search}%`)
    }

    //計算總項目時也要考慮搜尋條件
    let totalItemsQuery = `SELECT COUNT(DISTINCT product.id) AS totalItems ${sqlBase}`

    const [totalItemsResult] = await db.execute(totalItemsQuery, queryParams)
    const totalItems = totalItemsResult[0].totalItems
    const totalPages = Math.ceil(totalItems / limit)

    let sql = `SELECT product.*, COALESCE(SUM(orders.quantity), 0) AS total_quantity, COUNT(DISTINCT fav_product.id) AS favorite_count, p_type.name AS type_name ${sqlBase} GROUP BY product.id LIMIT ?, ?`
    queryParams.push(offset, limit)

    let [products] = await db.execute(sql, queryParams)

    const responseData = {
      items: products,
      totalItems,
      totalPages,
    }
    res.json(responseData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})
//新增賣家商品
// router.post(
//   '/product/new',
//   authenticate,
//   upload.fields([
//     { name: 'imgCover', maxCount: 1 },
//     { name: 'img1', maxCount: 1 },
//     { name: 'img2', maxCount: 1 },
//     { name: 'img3', maxCount: 1 },
//   ]),
//   async (req, res) => {
//     const {
//       typeId,
//       name,
//       productQuantity,
//       displayPrice,
//       price,
//       imgCover,
//       img1,
//       img2,
//       img3,
//       releaseTime,
//       language,
//       ratingId,
//       coOpValid,
//       description,
//       valid,
//       launch_valid,
//     } = req.body
//     const dateString = new Date() //創建商品日期
//     const created_at = moment(dateString).format('YYYY-MM-DD HH:mm:ss')
//     //const memberId = 抓當前使用者的id
//     // const memberId = req.memberData.id
//     const memberId = parseInt(req.memberData.id, 10) // 將其轉換為整數

//     if (isNaN(memberId) || memberId < 0) {
//       // 如果 memberId 不是一個正整數，返回錯誤響應
//       return res.status(400).json({ message: 'Invalid member_id' })
//     }
//     const fav = 0
//     console.log(
//       typeId,
//       name,
//       productQuantity,
//       fav,
//       displayPrice,
//       price,
//       imgCover,
//       img1,
//       img2,
//       img3,
//       releaseTime,
//       language,
//       ratingId,
//       coOpValid,
//       description,
//       created_at,
//       memberId,
//       valid,
//       launch_valid
//     )
//     if (!req.memberData) {
//       // 如果memberData不存在，则返回错误信息
//       return res.status(400).json({ message: '找不到member data' })
//     }
//     // try {
//     //把資料存進去
//     const Query =
//       'INSERT INTO `product` (`type_id`, `name`,`product_quantity`, `fav`, `display_price`,`price`, `img_cover`, `img_1`,`img_2`,`img_3`, `release_time`,`language`,`rating_id`,`co_op_valid`,`description`, `member_id`, `valid`, `launch_valid`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
//     await db.execute(Query, [
//       typeId,
//       name,
//       productQuantity,
//       fav,
//       displayPrice,
//       price,
//       imgCover,
//       img1,
//       img2,
//       img3,
//       releaseTime,
//       language,
//       ratingId,
//       coOpValid,
//       description,
//       created_at,
//       memberId,
//       valid,
//       launch_valid,
//     ])
//     // res.status(201).send({ message: '新增商品成功' })
//     // } catch (error) {
//     // res.status(500).send({ message: '新增商品失敗' })
//     // console.log('資料庫相關錯誤:', error)
//     // }
//   }
// )
//商品讀一個產品
// router.get('/product/:pid', authenticate, async (req, res) => {
//   // const {
//   //   typeId,
//   //   name,
//   //   productQuantity,
//   //   fav,
//   //   displayPrice,
//   //   price,
//   //   imgCover,
//   //   img1,
//   //   img2,
//   //   img3,
//   //   imgDetails,
//   //   releaseTime,
//   //   language,
//   //   ratingId,
//   //   coOpValid,
//   //   description,
//   // } = req.body
//   // const created_at = new Date() //創建商品日期
//   //const memberId = 抓當前使用者的id
//   try {
//     const memberId = req.memberData.id
//     let { pid } = req.params
//     console.log(memberId, pid)
//     let [product] = await db.execute(
//       'SELECT * FROM `product` WHERE `member_id` = ? AND `id` = ?',
//       [memberId, pid]
//     )
//     res.json(product)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: '伺服器錯誤' })
//   }
// })

//商品下架:valid=0
router.patch('/product/:pid', authenticate, async (req, res) => {
  const valid = 0
  const pid = req.params.pid
  const shop_id = req.memberData.id

  try {
    //先檢查這個產品有沒有存在＆和pid匹配
    const [products] = await db.execute(
      'SELECT * FROM `product` WHERE `id` = ?',
      [pid]
    )
    //檢查評論是存在以及shop_id是否匹配
    if (products.length === 0) {
      return res.status(404).send({ message: '商品不存在' })
    }
    const product = products[0]
    if (product.member_id !== shop_id) {
      //不符合沒有權限修改
      return res.status(403).send({ message: '無權限修改此商品資訊' })
    }
    const Query =
      'UPDATE `product` SET `valid` = ? WHERE `id` = ? AND `member_id` = ?'
    await db.execute(Query, [valid, pid, shop_id])
    res.status(200).send({ message: '下架商品成功' })
  } catch (error) {
    res.status(400).send({ message: '不存在的商品，下架商品失敗' })
    console.log('資料庫相關錯誤：', error)
  }
})

//商品重新上架:valid=1
router.patch('/product/onshop/:pid', authenticate, async (req, res) => {
  const valid = 1
  const pid = req.params.pid
  const shop_id = req.memberData.id

  try {
    //先檢查這個產品有沒有存在＆和pid匹配
    const [products] = await db.execute(
      'SELECT * FROM `product` WHERE `id` = ? AND `valid` = 0',
      [pid]
    )
    //檢查評論是存在以及shop_id是否匹配
    if (products.length === 0) {
      return res.status(404).send({ message: '商品不存在' })
    }
    const product = products[0]
    if (product.member_id !== shop_id) {
      //不符合沒有權限修改
      return res.status(403).send({ message: '無權限修改此商品資訊' })
    }
    const Query =
      'UPDATE `product` SET `valid` = ? WHERE `id` = ? AND `member_id` = ?'
    await db.execute(Query, [valid, pid, shop_id])
    res.status(200).send({ message: '重新上架商品成功' })
  } catch (error) {
    res.status(400).send({ message: '不存在的商品，上架商品失敗' })
    console.log('資料庫相關錯誤：', error)
  }
})

//賣家評價讀取 #Read
router.get('/comment', authenticate, async (req, res) => {
  const tab = req.query.tab || 'all'
  const shopId = req.memberData.id
  const search = req.query.search || ''
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 4
  const offset = (page - 1) * limit

  let sql = `
  SELECT 
    shop_comment.*, 
    member.account, 
    member.pic, 
    AVG(shop_comment.rating) OVER() AS avg_rating, 
    COUNT(shop_comment.id) OVER() AS total_comments
  FROM shop_comment 
  INNER JOIN member ON shop_comment.member_id = member.id 
  WHERE shop_comment.shop_id = ?
`
  // 根據tab值調整SQL查詢
  if (tab === 'unreply') {
    sql += ` AND (shop_comment.reply IS NULL OR shop_comment.reply = '')`
  } else if (tab === 'replied') {
    sql += ` AND shop_comment.reply IS NOT NULL AND shop_comment.reply <> ''`
  }

  //添加對member.account的搜尋功能
  if (search.trim() !== '') {
    sql += ` AND member.account LIKE ?`
  }

  try {
    const queryParams = [shopId]
    if (search.trim() !== '') {
      queryParams.push(`%${search}%`)
    }

    //計算總項目時也要考慮搜尋條件
    let totalItemsQuery = `
      SELECT COUNT(*) AS totalItems 
      FROM shop_comment 
      INNER JOIN member ON shop_comment.member_id = member.id 
      WHERE shop_comment.shop_id = ?
    `
    if (search.trim() !== '') {
      totalItemsQuery += ` AND member.account LIKE ?`
    }

    const [totalItemsResult] = await db.execute(totalItemsQuery, queryParams)
    const totalItems = totalItemsResult[0].totalItems
    //總頁數
    const totalPages = Math.ceil(totalItems / limit)
    //查詢結果
    // const [commentsResult] = await db.execute(sql, [shopId])
    // const comments = commentsResult
    // // console.log(comments)
    // res.json({
    //   comments,
    //   totalItems,
    //   totalPages,
    // })
    queryParams.push(offset, limit)
    let [comments] = await db.execute(sql + ' LIMIT ?, ?', queryParams)

    const responseData = {
      items: comments,
      totalItems,
      totalPages,
    }
    console.log(responseData)
    res.json(responseData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})
//賣家評價讀取單一資料OK #Read
router.get('/comment/:cid', authenticate, async (req, res) => {
  const { cid } = req.params
  const memberId = req.memberData.id
  console.log(cid)
  console.log(memberId)
  //先檢查這則評論有沒有存在＆和shop_id匹配
  const [comments] = await db.execute(
    'SELECT * FROM `shop_comment` WHERE `id` = ?',
    [cid]
  )
  //檢查評論是存在以及shop_id是否匹配
  if (comments.length === 0) {
    return res.status(404).send({ message: '評論不存在' })
  }
  const comment = comments[0]
  if (comment.shop_id !== memberId) {
    //不符合沒有權限修改
    return res.status(403).send({ message: '無權限查看此評論' })
  }
  // console.log(comment)
  try {
    if (comment) {
      res.json(comment) //解析json物件
      // return true
    } else {
      res.status(404).json({ message: '查無評論資料' })
    }
    // console.log(comments)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})
//賣家評價回覆評價（更新資料表）OK #Create #Update
router.put('/comment/reply', upload.none(), authenticate, async (req, res) => {
  const { reply, cid } = req.body
  const dateString = new Date()
  const replied_at = moment(dateString).format('YYYY-MM-DD HH:mm:ss')
  const shop_id = req.memberData.id
  // console.log(cid)
  // console.log(memberId)
  // let [result] = await db.execute(
  //   'SELECT * FROM `shop_comment` WHERE `order_id` = ? AND `shop_id` = ?',
  //   [cid, memberId]
  // )
  // console.log(result)
  try {
    //先檢查這則評論有沒有存在＆和shop_id匹配
    const [comments] = await db.execute(
      'SELECT * FROM `shop_comment` WHERE `id` = ?',
      [cid]
    )
    //檢查評論是存在以及shop_id是否匹配
    if (comments.length === 0) {
      return res.status(404).send({ message: '評論不存在' })
    }
    const comment = comments[0]
    if (comment.shop_id !== shop_id) {
      //不符合沒有權限修改
      return res.status(403).send({ message: '無權限修改此評論' })
    }
    const Query =
      'UPDATE `shop_comment` SET `reply` = ?, `replied_at` = ? WHERE `id` = ? AND `shop_id` = ?'
    await db.execute(Query, [reply, replied_at, cid, shop_id])
    res.status(200).send({ message: '回應買家評價建立成功' })
  } catch (error) {
    res.status(400).send({ message: '不存在的評論，回覆失敗' })
    console.log('資料庫相關錯誤：', error)
  }
})

router.put('/comment/delete', upload.none(), authenticate, async (req, res) => {
  const { cid } = req.body
  const reply = null
  const replied_at = null
  const shop_id = req.memberData.id

  try {
    //先檢查這則評論有沒有存在＆和shop_id匹配
    const [comments] = await db.execute(
      'SELECT * FROM `shop_comment` WHERE `id` = ?',
      [cid]
    )
    //檢查評論是存在以及shop_id是否匹配
    if (comments.length === 0) {
      return res.status(404).send({ message: '評論不存在' })
    }
    const comment = comments[0]
    if (comment.shop_id !== shop_id) {
      //不符合沒有權限修改
      return res.status(403).send({ message: '無權限修改此評論' })
    }
    const Query =
      'UPDATE `shop_comment` SET `reply` = ?, `replied_at` = ? WHERE `id` = ? AND `shop_id` = ?'
    await db.execute(Query, [reply, replied_at, cid, shop_id])
    res.status(200).send({ message: '刪除評價成功' })
  } catch (error) {
    res.status(400).send({ message: '不存在的評論，刪除回覆失敗' })
    console.log('資料庫相關錯誤：', error)
  }
})

router.get('/order', authenticate, async (req, res) => {
  const tab = req.query.tab || 'all'
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 6
  const offset = (page - 1) * limit

  try {
    const memberId = req.memberData.id
    //根據tab來調整SQL
    let shippingStatusCondition = ''
    switch (tab) {
      case 'shipped':
        shippingStatusCondition = 'AND o.shipping_status = 1'
        break
      case 'processing':
        shippingStatusCondition = 'AND o.shipping_status = 2'
        break
      case 'delivered':
        shippingStatusCondition = 'AND o.shipping_status = 3'
        break
      default:
        shippingStatusCondition = ''
        break
    }
    //查詢訂單總量(根據tab參數調整)
    const [[{ total }]] = await db.execute(
      `
    SELECT COUNT(DISTINCT o.order_number) AS total
      FROM orders o 
      WHERE o.member_seller_id = ? ${shippingStatusCondition}`,
      [memberId]
    )
    //查詢訂單加入tab參數
    let [orders] = await db.execute(
      `
      SELECT o.*, m.pic AS member_pic, m.account AS member_account, 
             p.img_cover AS product_img_cover, p.name AS product_name
      FROM orders o
      JOIN member m ON o.member_buyer_id = m.id
      JOIN product p ON o.product_id = p.id
      WHERE o.member_seller_id = ? ${shippingStatusCondition}
      GROUP BY o.order_number
      ORDER BY o.order_number DESC
      LIMIT ? OFFSET ?`,
      [memberId, limit, offset]
    )
    // 初始化一個物件來組織資料，以 order_number 為key
    const ordersByNumber = orders.reduce((acc, order) => {
      // 如果這個 order_number 已經存在於 acc 中，將當前訂單的商品資訊添加到對應的陣列中
      if (!acc[order.order_number]) {
        acc[order.order_number] = {
          ...order,
          products: [],
        }
      }
      acc[order.order_number].products.push({
        product_id: order.product_id,
        quantity: order.quantity,
        product_img_cover: order.product_img_cover,
        product_name: order.product_name,
      })

      return acc
    }, {})
    // 將組織好的資料轉換回陣列格式，準備發送回客戶端
    const result = Object.values(ordersByNumber).map((order) => ({
      ...order,
      products: order.products,
    }))
    //計算總頁數
    const totalPages = Math.ceil(total / limit)
    res.json({
      orders: result,
      page,
      totalPages,
      totalItems: total,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

//更新賣家訂單 #Update 還沒用
router.patch('/order/:oid', authenticate, async (req, res) => {
  try {
    const memberId = req.memberData.id
    let [orders] = await db.execute(
      'SELECT * FROM `orders` WHERE `member_seller_id` = ?',
      [memberId]
    )
    // console.log(orders)
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

export default router
