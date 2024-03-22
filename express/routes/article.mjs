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

router.get('/:aid', async (req, res) => {
  const { aid } = req.params
  try {
    const [article] = await db.execute(
      `SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time
      FROM article_1 
      JOIN article_category ON article_1.category_id = article_category.id
      WHERE article_1.ai_id = ?`,
      [aid]
    )
    const [comment] = await db.execute(
      `SELECT *, DATE_FORMAT(create_at, '%Y-%m-%d') AS create_at
      FROM article_comment 
      JOIN member ON article_comment.member_id = member.id
      WHERE article_comment.article_id = ? ORDER BY create_at DESC`,
      [aid]
    )
    const resData = {
      article,
      comment,
    }
    res.json(resData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.post('article/:aid', async (req, res) => {
  try {
    const { aid } = req.params
    const { emo } = req.body

    const updateResult = await db.execute(
      `UPDATE article_comment SET emo = ? WHERE article_id = ?`,
      [emo, aid]
    )
    console.log(emo)

    if (updateResult.affectedRows === 1) {
      res.status(200).json({ message: 'Emo value updated successfully' })
    } else {
      res.status(500).json({ error: 'Failed to update emo value in database' })
    }
  } catch (error) {
    console.error('Error updating emo value:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/list/:sid', async (req, res) => {
  const { sid } = req.params
  try {
    const searchKeyword = `%${sid}%`
    const queryString = `
      SELECT *, DATE_FORMAT(article_time, '%Y-%m-%d') AS article_time 
      FROM article_1 
      JOIN article_category ON article_1.category_id = article_category.id 
      WHERE article_1.article_title LIKE ?`

    const [article] = await db.execute(queryString, [searchKeyword])
    res.json(article)
    console.log(article)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/comment/comment', async (req, res) => {
  try {
    let [comment] = await db.execute(`SELECT * FROM article_comment`)
    res.json(comment)
    console.log(comment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/comment/comment', async (req, res) => {
  try {
    const { content } = req.body
    console.log(content)
    // 在这里执行将评论存储到数据库的操作
    // 假设您使用的是 article_comment 表存储评论数据
    const [result] = await db.execute(
      `INSERT INTO article_comment (content, article_id, emo, member_id) VALUES (?, 3, 0, 3)`,
      [content]
    )

    // 检查是否成功插入评论
    if (result.affectedRows === 1) {
      res.status(201).json({ message: '评论已成功提交' })
    } else {
      res.status(500).json({ error: '评论提交失败' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
