import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'

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

// 商品詳細頁 ([0-9]+)
// try {
//   const [results, fields] = await db.execute(
//     'SELECT * FROM `product` WHERE `id` = 1'
//   )
//   console.log(results)
// } catch (error) {
//   console.error(error)
// }
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
