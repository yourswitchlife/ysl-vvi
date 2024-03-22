import express, { query } from 'express'
import db from '../configs/db.mjs'
import multer from 'multer'

const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log('123', file)
    if (file.fieldname === 'pImgs') {
      cb(null, './public/productImg/details')
    } else if (file.fieldname === 'pCover') {
      cb(null, './public/productImg/cover')
    } else {
      cb(null, './public/reviewImg')
    }
  },
  filename: function (req, file, cb) {
    // console.log('456', file)
    const originalname = Date.now() + '-' + file.originalname
    cb(null, originalname)
  },
})
const upload = multer({ storage: storage })

// 商品列表頁
router.get('/list', async (req, res) => {
  // if(req.params)
  const { type, rating } = req.query

  // console.log(`Type: ${type}`)
  // console.log(`Rating: ${rating}`)

  // console.log(req.query)

  let query = 'SELECT * FROM product'
  const params = []

  // 構建SQL查詢條件
  if (type || rating) {
    query += ' WHERE'

    if (type) {
      query += ' type_id = ?'
      params.push(type)
    }

    if (rating) {
      if (type) {
        query += ' AND'
      }
      query += ' rating_id = ?'
      params.push(rating)
    }
  }

  try {
    // 使用參數化查詢來預防SQL注入攻擊
    const [products] = await db.execute(query, params)

    const responseData = {
      products,
      // 如果需要其他相關資訊，如totalItems或totalPages，可以在這裡計算並添加
    }
    res.json(responseData)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

// 加入收藏
router.post('/favProducts', async (req, res) => {
  try {
    const memberId = parseInt(req.query.memberId)
    const pid = parseInt(req.query.pid)
    // const { memberId, id } = req.body
    console.log(memberId, pid)
    const query =
      'INSERT INTO `fav_product` (member_id,product_id,valid) VALUES (?, ?, 1)'
    await db.execute(query, [memberId, pid])
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ success: false, message: 'Error adding product to favorites' })
  }
})

// 新增商品
router.post(
  '/addNewProduct',
  upload.fields([
    { name: 'pCover', maxCount: 1 },
    { name: 'pImgs', maxCount: 3 },
  ]),
  async (req, res) => {
    if (req.files) {
      console.log(req.files, req.body)
      const memberId = req.query.memberId
      const img = req.files
      const p = req.body
      const pCover = img.pCover[0].filename
      let pImgs = img.pImgs.map((file) => file.filename)
      pImgs = pImgs.join(',')
      let pLanguage = p.pLanguage
      pLanguage = pLanguage.map((v) => {
        return v.split('-')[0]
      })
      pLanguage = pLanguage.join(',')
      // console.log(
      //   p.pName,
      //   parseInt(p.pType),
      //   parseInt(p.pPrice),
      //   pCover,
      //   pImgs,
      //   pLanguage,
      //   parseInt(p.pRating),
      //   p.pDiscribe,
      //   p.release_time,
      //   memberId
      //   // created_at
      // )
      const query =
        'INSERT INTO `product` (name,type_id,price,img_cover,img_details,language,rating_id,description,release_time,member_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      await db.execute(query, [
        p.pName,
        parseInt(p.pType),
        parseInt(p.pPrice),
        pCover,
        pImgs,
        pLanguage,
        parseInt(p.pRating),
        p.pDiscribe,
        p.release_time,
        memberId,
      ])
      return res.json({ msg: 'success', code: '200' })
    } else {
      console.log('no upload')
      return res.json({ msg: 'fail', code: '409' })
    }
  }
)
// 新增評論 單檔上傳
router.post(
  '/addReview',
  upload.single('reviewPhoto'),
  async (req, res) => {
    if (req) {
      // console.log('Uploaded file name: ', req.file.originalname)
      console.log(req.body)
      console.log(req.file)
      console.log(req.file.filename)
      const memberId = req.query.memberId
      const shopId = req.query.shopId
      const rating = req.body.rating
      const review = req.body.review
      console.log(memberId, rating, review, shopId)
      // const comment_img = req.file
      if (req.file) {
        const reviewImg = req.file.filename
        const created_at = new Date()
        const query =
          'UPDATE `shop_comment`SET rating = ?, content = ?, comment_img = ?, created_at = ? WHERE member_id = ? AND shop_id = ?'
        await db.execute(query, [
          rating,
          review,
          reviewImg,
          created_at,
          memberId,
          shopId,
        ])
      } else {
        const query =
          'UPDATE `shop_comment`SET rating = ?, content = ? WHERE member_id = ? AND shop_id = ?'
        await db.execute(query, [rating, review, memberId, shopId])
      }

      return res.json({ msg: 'success', code: '200' })
    } else {
      console.log('no upload')
      return res.json({ msg: 'fail', code: '409' })
    }
  }
  // res.json({ body: req.body, file: req.file })
)

// 拿訂單資料
router.get('/orders', async (req, res) => {
  try {
    // 全部資料
    let [orders] = await db.execute(`SELECT * FROM orders`)
    const responseData = {
      orders,
    }
    res.json(responseData)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// 商品詳細頁 ([0-9]+)
router.get('/:pid', async (req, res) => {
  try {
    let { pid } = req.params
    // let { shopid } = req.params
    // console.log(`shop_id = ${shopid}`)
    console.log(`pid = ${pid}`)
    // 查詢相對應id的商品
    let [responseData] = await db.execute(
      'SELECT * FROM `product` WHERE `id` = ?',
      [pid]
    )

    // 查询此商品對應的店家資訊
    let [shopData] = await db.execute(
      'SELECT p.id,m.* FROM product AS p JOIN member AS m ON p.member_id = m.id WHERE p.id = ?',
      [pid]
    )
    const shopId = shopData[0].id

    let [shopRating] = await db.execute(
      'SELECT AVG(rating) AS average_rating FROM shop_comment WHERE member_id = ?',
      [shopId]
    )

    let [shopComment] = await db.execute(
      'SELECT sc.*, m.* FROM shop_comment AS sc JOIN member AS m ON sc.member_id = m.id WHERE sc.shop_id = ? ORDER BY `sc`.`created_at` ASC',
      [shopId]
    )

    // 查询相同商品類型
    let [productTypeResult] = await db.execute(
      'SELECT * FROM `product` WHERE `type_id` IN (SELECT type_id FROM `product` WHERE id = ?)',
      [pid]
    )

    // 查询相同商店的其他商品
    let [sameShopP] = await db.execute(
      'SELECT * FROM product WHERE member_id = (SELECT member_id FROM product WHERE id = ?)',
      [pid]
    )

    const result = {
      responseData,
      shopData,
      productTypeResult,
      shopComment,
      sameShopP,
      shopRating,
    }

    if (result) {
      res.json(result)
      // return true
    } else {
      res.status(404)
    }
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

export default router
