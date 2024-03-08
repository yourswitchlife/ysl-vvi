import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'

router.get('/list', async (req, res) => {
  try {
    let [article] = await db.execute('SELECT * FROM `article_1`')
    // console.log(article)
    res.json(article)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

export default router
