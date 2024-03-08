import express from 'express'
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
  try {
    let [products] = await db.execute('SELECT * FROM `product`')
    // console.log(products)
    res.json(products)
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
      const img = req.files
      const p = req.body
      const pCover = img.pCover[0].filename
      let pImgs = img.pImgs.map((file) => file.filename)
      pImgs = pImgs.join(',')
      let pLanguage = p.pLanguage
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
      console.log(
        p.pName,
        parseInt(p.pType),
        parseInt(p.pPrice),
        pCover,
        pImgs,
        pLanguage,
        parseInt(p.pRating),
        p.pDiscribe
        // created_at
      )
      const query =
        'INSERT INTO `product` (name,type_id,price,img_cover,img_details,language,rating_id,description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      await db.execute(query, [
        p.pName,
        parseInt(p.pType),
        parseInt(p.pPrice),
        pCover,
        pImgs,
        pLanguage,
        parseInt(p.pRating),
        p.pDiscribe,
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
    let [result] = await db.execute('SELECT * FROM `product` WHERE `id` = ?', [
      pid,
    ])
    // console.log(result)
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
