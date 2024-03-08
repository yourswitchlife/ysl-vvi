import express from 'express'
import db from '../configs/db.mjs'
import { dirname, resolve, extname } from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import { renameSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
// console.log(__dirname)

const upload = multer({ dest: resolve(__dirname, '../public') })
const router = express.Router()
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

router.post('/addNewP', (req, res) => {})

// router.get('/uploadReviewForm', (req, res) => {
//   res.render('uploadReviewForm')
// })

// 單檔上傳
router.post('/reviewPhoto', upload.single('reviewPhoto'), async (req, res) => {
  let timeStamp = Date.now()
  let newName = timeStamp + extname(req.file.originalname)
  // renameSync(req.file.path, resolve(__dirname, '../public/uploadImg', newName))
  req.body.reviewPhoto = newName

  if (req.files) {
    console.log(req.file)
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
