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

//我的商場
router.get('/:shop_site', async (req, res) => {
  try {
    let { shop_site } = req.params
    console.log(`shop_site = ${shop_site}`)
    let [result] = await db.execute(
      'SELECT * FROM `member` WHERE `shop_site` = ?',
      [shop_site]
    )
    console.log(result)

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
