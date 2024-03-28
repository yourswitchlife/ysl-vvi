import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import moment from 'moment'
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

router.get('/all', async (req, res) => {
  const memberId = req.query.memberId
  const coupons = await Coupons(memberId)
  res.json(coupons)
})

//會員在個人頁面優惠券的篩選&讀取
router.get('/memberCP', async (req, res) => {
  const memberId = req.query.memberId
  const filter = req.query.filter

  let condition = ''
  if (filter === 'valid') {
    condition = 'AND member_coupon.status = 0'
  } else if (filter === 'expiredORUsed') {
    condition = 'AND member_coupon.status = 1'
  }

  const query = `
    SELECT
      member_coupon.*,
      discount_coupon.expiration_date,
      discount_coupon.discount_value,
      discount_coupon.title,
      discount_coupon.price_rule
    FROM member_coupon
    JOIN discount_coupon ON member_coupon.coupon_id = discount_coupon.id
    WHERE member_coupon.member_id = ? ${condition}
  `

  try {
    const [coupons] = await db.execute(query, [parseInt(memberId)])
    res.json(coupons)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Server error', error: error.message })
  }
})

// 讀取單一優惠券路由
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
  const result = await AddMemberCP(memberID, couponID)
  res.status(201).send(result)
})

//member_coupon及購物車能看到的優惠券
// router.post('/member-coupons', upload.none(), async (req, res) => {
//   const { memberId } = req.body
//   const validCP = await getValidCP(memberId)
//   res.status(201).send(validCP)
// })

//新加入會員同時寫入新任務到mission
// router.post('/mission-insert', upload.none(), async (req, res) => {
//   const { memberId } = req.body
//   const missionData = await missionInsert(memberId)
//   res.status(201).send(missionData)
// })

//任務:收藏賣家
// router.post('/fav-shop', upload.none(), async (req, res) => {
//   const { memberId } = req.body
//   const favShop = await checkFavShop(memberId)
//   if (favShop.length === 0) {
//     return res.status(201).json({ message: '還沒收藏過賣家喔' })
//   } else {
//     const hasClaimed = await checkIfClaimed(memberId, 43)
//     if (hasClaimed) {
//       return res.status(200).json({ message: '已經領取過優惠券了' })
//     } else {
//       return res.status(200).json({ message: '優惠券領取成功' })
//     }
//   }

// const checkIfClaimed = await checkIfClaimed(memberId, couponId)

// res.status(201).send(favShop)
// })

//讀取leading page全部優惠券
async function getAll() {
  const [coupons] = await db.execute('SELECT * FROM `discount_coupon`')
  return coupons
}

// 把讀取全部優惠券結果印下來
// const results = await getAll()
// console.log(results)

//新增member_coupon資料表
async function AddMemberCP(memberID, couponID) {
  const [results] = await db.execute(
    'INSERT INTO `member_coupon` (`member_id`, `coupon_id`, `status`, `valid`) VALUES (?, ?, 0, 1)',
    [memberID, couponID]
  )
  return { id: results.insertId, memberID, couponID }
}

//讀取單一優惠券
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

//讀取memebr_coupon其中一個會員的可使用優惠券資料庫
async function getValidCP(id) {
  const [memberCP] = await db.execute(
    `SELECT
    member_coupon.*,
    discount_coupon.expiration_date,
    discount_coupon.discount_value, 
    discount_coupon.title,
    discount_coupon.price_rule,
    discount_coupon.rules_description
    FROM member_coupon
    JOIN discount_coupon
    ON member_coupon.coupon_id = discount_coupon.id
    WHERE member_coupon.member_id = ? AND member_coupon.status <> 1 AND expiration_date >= NOW()`,
    [id]
  )
  return memberCP
}

//讀取memebr_coupon其中一個會員的不能使用(過期或已使用)優惠券資料庫
async function getUnusedCP(id) {
  const [usedCP] = await db.execute(
    `SELECT
  member_coupon.*,
  discount_coupon.expiration_date,
  discount_coupon.discount_value,
  discount_coupon.title,
  discount_coupon.price_rule
  FROM member_coupon
  JOIN discount_coupon
  ON member_coupon.coupon_id = discount_coupon.id
  WHERE (member_coupon.member_id = ? AND member_coupon.status = 1) OR expiration_date <= NOW()`,
    [id]
  )
  return getUnusedCP
}

async function getMemberCP(id) {
  const [memberCP] = await db.execute(
    `SELECT
    member_coupon.*,
    discount_coupon.expiration_date,
    discount_coupon.discount_value, 
    discount_coupon.title,
    discount_coupon.price_rule,
    discount_coupon.rules_description
    FROM member_coupon
    JOIN discount_coupon
    ON member_coupon.coupon_id = discount_coupon.id
    WHERE member_coupon.member_id = ?`,
    [id]
  )
  return memberCP
}

async function Coupons(memberId) {
  const [coupons] = await db.execute(
    `SELECT dc.*, 
  CASE WHEN mc.coupon_id IS NOT NULL THEN true ELSE false END as claimed
  FROM discount_coupon dc
  LEFT JOIN member_coupon mc ON dc.id = mc.coupon_id AND mc.member_id = ?
  `,
    [memberId]
  )
  return coupons
}

// async function CC(memberId, couponId || couponID) {
//   const [cc] = await db.execute(
//     'UPDATE member_coupon SET status = 1 WHERE member_id = ? AND coupon_id =? ',
//     [memberId, couponId OR couponID]
//   )
//   return cc
// }

// Assuming connection is your database connection object
// and member_buyer_id, selectedProductCoupon, selectedShippingCoupon are defined

// Update for selectedProductCoupon

// const ww = await console.log(ww)

export default router
