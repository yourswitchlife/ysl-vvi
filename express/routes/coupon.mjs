import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import multer from 'multer'
const upload = multer()

//讀取優惠券路由
router.get('/', async (req, res) => {
  const coupons = await getAll()
  try {
    res.json(coupons)
    // res.send('優惠券頁面')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

//讀取單一優惠券路由
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const coupon = await getSingle(id)
  if (coupon) {
    res.json(coupon)
  } else {
    res.status(404).send('找不到優惠券')
  }
})

//領取優惠券，寫新資料到member_coupon裡
router.post('/insert', upload.none(), async (req, res) => {
  const { memberID, couponID } = req.body
  const result = await getMemberCP(memberID, couponID)
  res.status(201).send(result)
})

//賣場視角看到的優惠券
router.get('/seller-side', async (req, res) => {
  console.log('Accessing /seller-side route')
  res.send('賣場視角優惠券')
})

//會員視角看到的優惠券
router.get('/member-side', async (req, res) => {
  res.send('會員視角優惠券')
})

//讀取leading page全部優惠券
async function getAll() {
  const [coupons] = await db.execute('SELECT * FROM `discount_coupon`')
  return coupons
}

// 把讀取全部優惠券結果印下來
// const results = await getAll()
// console.log(results)

//新增member_coupon資料表
async function getMemberCP(memberID, couponID) {
  const [results] = await db.execute(
    'INSERT INTO `member_coupon` (`member_id`, `coupon_id`, `status`, `valid`) VALUES (?, ?, 0, 1)',
    [memberID, couponID]
  )
  return { id: results.insertId, memberID, couponID }
}

//讀取leading page單一優惠券
async function getSingle(id) {
  try {
    const [coupon] = await db.execute(
      'SELECT * FROM `discount_coupon` WHERE id = ?',
      [id]
    )
    // console.log(coupon)
    return coupon
  } catch (error) {
    console.error(error)
    // return null
  }
}

//印出單一優惠券
// const single = await getSingle(10)
// console.log(single)

export default router
