import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'

router.get('/list', async (req, res) => {
  try {
    let [article] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '冒險類'`
    )
    let [article2] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '動作類'
`
    )
    let [article3] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '策略類'
`
    )
    let [article4] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '休閒類'
`
    )
    const resData = {
      article,
      article2,
      article3,
      article4,
    }
    res.json(resData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/', async (req, res) => {
  const page = req.query.page || 1
  const perPage = 4
  const perPage2 = 9
  const perPage3 = 3

  const startIndex = (page - 1) * perPage
  const startIndex2 = (page - 1) * perPage2
  const startIndex3 = (page - 1) * perPage3

  try {
    let [article] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '冒險類'
ORDER BY article_time DESC
       LIMIT ${startIndex}, ${perPage}`
    )
    let [article2] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '動作類'
ORDER BY article_time DESC
       LIMIT ${startIndex}, ${perPage}`
    )
    let [article3] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '策略類'
ORDER BY article_time DESC
       LIMIT ${startIndex}, ${perPage}`
    )
    let [article4] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id
FROM article_1 
JOIN article_category ON article_1.category_id = article_category.id
WHERE article_category.name = '休閒類'
ORDER BY article_time DESC
       LIMIT ${startIndex}, ${perPage}`
    )
    let [hot] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
      article_1.id AS ai_id 
      FROM article_1 
      JOIN article_category ON article_1.category_id = article_category.id
      ORDER BY views DESC  
      LIMIT ${startIndex3}, ${perPage3}`
    )

    let [title] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
       article_1.id AS ai_id FROM article_1 
       JOIN article_category ON article_1.category_id = article_category.id
       ORDER BY RAND()
       LIMIT ${startIndex}, ${perPage}`
    )

    let [more] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time,
       article_1.id AS ai_id FROM article_1 
       JOIN article_category ON article_1.category_id = article_category.id
       ORDER BY RAND()
       LIMIT ${startIndex2}, ${perPage2}`
    )

    const resData = {
      article,
      article2,
      article3,
      article4,
      title,
      more,
      hot,
    }
    // console.log(article)
    res.json(resData)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

router.get('/:ai_id', async (req, res) => {
  const { ai_id } = req.params
  try {
    const [article] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time
      FROM article_1 
      JOIN article_category ON article_1.category_id = article_category.id
      WHERE article_1.ai_id = ?`,
      [ai_id]
    )
    res.json(article)
    console.log(article)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.get('/list/:search', async (req, res) => {
  const { search } = req.params
  try {
    const [article] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time
      FROM article_1 
      JOIN article_category ON article_1.category_id = article_category.id
      WHERE article_1.article_p1 = ?`,
      [search]
    )
    res.json(article)
    console.log(article)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
