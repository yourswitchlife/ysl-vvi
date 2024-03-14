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
    } else if (file.fieldname === 'reviewPhoto') {
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

  console.log(`Type: ${type}`)
  console.log(`Rating: ${rating}`)

  // const type = req.query.type
  // console.log(type)
  // const rating = req.query.rating
  // console.log(parseInt(rating))
  console.log(req.query)

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const offset = (page - 1) * limit

  // let sql = `SELECT * FROM product WHERE`
  // let queryParams = []

  try {
    // if (type || rating) {
    //   if (type) {
    //     queryParams.push(type)
    //     queryParams.join(',')
    //     let [totalProducts] = await db.execute(
    //       'sql += `type_id IN (?)`,queryParams'
    //     )
    //   }
    //   if (rating) {
    //     queryParams.push(rating)
    //     queryParams.join(',')
    //     let [totalProducts] = await db.execute(
    //       'sql += `rating_id IN (?)`,queryParams'
    //     )
    //   }
    // }
    // 全部資料
    let [totalProducts] = await db.execute(
      'SELECT COUNT(*) AS totalItems FROM `product`'
    )
    // 一頁幾筆
    let [products] = await db.execute(`SELECT * FROM product LIMIT ?,?`, [
      offset,
      limit,
    ])
    // console.log(TotalProducts.length)
    const totalItems = totalProducts[0].totalItems
    const totalPages = Math.ceil(totalItems / limit)
    console.log(totalItems)

    const responseData = {
      products,
      totalItems,
      totalPages,
    }
    res.json(responseData)
  } catch (error) {
    console.log(error)
    res.status(500)
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
      // const created_at = new Date()
      // const year = date.getFullYear()
      // const month = date.getMonth()
      // const day = date.getDate()
      // const hour = date.getHours()
      // const minute = date.getMinutes()
      // const second = date.getSeconds()
      // const upDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`

      // const { pCover } = req.files
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
// 單檔上傳
router.post('/addReview', upload.single('reviewPhoto'), async (req, res) => {
  // let timeStamp = Date.now()
  // let newName = timeStamp + extname(req.file.originalname)
  // renameSync(req.file.path, resolve(__dirname, '../public/uploadImg', newName))
  // req.body.reviewPhoto = newName

  if (req.files) {
    console.log(req.files, req.body)
    return res.json({ msg: 'success', code: '200' })
  } else {
    console.log('no upload')
    return res.json({ msg: 'fail', code: '409' })
  }
  // res.json({ body: req.body, file: req.file })
})

// try {
//   const [results, fields] = await db.execute(
//     'SELECT * FROM `product` WHERE `id` = 1'
//   )
//   console.log(results)
// } catch (error) {
//   console.error(error)
// }

// 商品詳細頁 ([0-9]+)
router.get('/:pid', async (req, res) => {
  try {
    let { pid } = req.params
    console.log(`pid = ${pid}`)
    let [responseData] = await db.execute(
      'SELECT * FROM `product` WHERE `id` = ?',
      [pid]
    )
    // 查询产品信息
    let [productTypeResult] = await db.execute(
      'SELECT * FROM `product` WHERE `type_id` IN (SELECT type_id FROM `product` WHERE id = ?)',
      [pid]
    )

    // 假设我们还想要获取该产品的评论
    // let [commentsResult] = await db.execute(
    //   'SELECT * FROM `product_comments` WHERE `product_id` = ?',
    //   [pid]
    // )

    // if (productResult.length > 0) {
    //   const product = productResult[0];
    //   const comments = commentsResult
    // console.log(result)
    const result = {
      responseData,
      productTypeResult,
      // commentsResult,
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
