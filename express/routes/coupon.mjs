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

// router.get('/memberCP', (req, res) => {
//   const { memberID, couponID } = req.body

// })

//領取優惠券，寫新資料到member_coupon裡
router.post('/insert', upload.none(), async (req, res) => {
  const { memberID, couponID } = req.body
  const result = await AddMemberCP(memberID, couponID)
  res.status(201).send(result)
})

//member_coupon及購物車能看到的優惠券
router.post('/member-coupons', upload.none(), async (req, res) => {
  const { memberId } = req.body
  const validCP = await getMemberCoupon(memberId)
  res.status(201).send(validCP)
})

//新加入會員同時寫入新任務到mission
router.post('/mission-insert', upload.none(), async (req, res) => {
  const { memberId } = req.body
  const missionData = await missionInsert(memberId)
  res.status(201).send(missionData)
})

//任務:收藏賣家
router.post('/fav-shop', upload.none(), async (req, res) => {
  const { buyerId: memberId } = req.body
  const favShop = await checkFavShop(memberId)
  if (favShop.length === 0) {
    return res.status(201).send({ message: '還沒收藏過賣家喔' })
  } else {
    return res.status(201).send({ message: '已經收藏過了' })
  }
  // const checkIfClaimed = await checkIfClaimed(memberId, couponId)

  // res.status(201).send(favShop)
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
async function AddMemberCP(memberID, couponID) {
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

//讀取memebr_coupon其中一個會員的資料庫
async function getMemberCoupon(id) {
  const [memberCP] = await db.execute(
    `SELECT
    member_coupon.*,
    discount_coupon.expiration_date,
    discount_coupon.discount_value, 
    discount_coupon.title,
    discount_coupon.price_rule
    FROM member_coupon
    JOIN discount_coupon
    ON member_coupon.coupon_id = discount_coupon.id
    WHERE member_coupon.member_id = ? AND member_coupon.status <> 1 AND expiration_date >= NOW()`,
    [id]
  )
  return memberCP
}

//讀取memebr_coupon其中一個會員的資料庫
// async function getUnusedCP(id) {
// const [usedCP] = await db.execute(
//   `SELECT
//   member_coupon.*,
//   discount_coupon.expiration_date,
//   discount_coupon.discount_value,
//   discount_coupon.title,
//   discount_coupon.price_rule
//   FROM member_coupon
//   JOIN discount_coupon
//   ON member_coupon.coupon_id = discount_coupon.id
//   WHERE (member_coupon.member_id = ? AND member_coupon.status = 1) OR expiration_date <= NOW()`,
//   [3]
// )
// console.log(usedCP)

//任務寫入:只要加入會員，且mission_start非0，就寫入新資料
// async function missionInsert(id) {
//   try {
//     const [memberMission] = await db.execute(
//       'SELECT * FROM member WHERE id=? AND mission_start = 0',
//       [id]
//     )
//     if (memberMission.length > 0) {
//       const [insertResult] = await db.execute(
//         'INSERT INTO mission (member_id, mission_id, status ) VALUES (?, 2, 0)',
//         [id]
//       )
//       return { success: true, insertId: insertResult.insertId }
//     } else {
//       return {
//         success: false,
//         message: 'Mission already exists or mission_start is not 0.',
//       }
//     }
//   } catch (error) {
//     console.error('Database operation failed', error)
//     return { success: false, message: 'Database operation failed' }
//   }
// }

const [i] = await db.execute(
  'INSERT INTO mission (mission_id, member_id, status) VALUES (2, ?, 0)',
  [45]
)
console.log(i)

//任務:查詢是否有收藏賣家
async function checkFavShop(id) {
  const [favShop] = await db.execute(
    'SELECT * FROM fav_shop WHERE buyer_id=?',
    [id]
  )
  return favShop
}

//任務:查詢會員是否有獎勵優惠券，有得話就不送，沒得話就送
async function checkIfClaimed(memberId, couponId) {
  try {
    const [checkCP] = await db.execute(
      'SELECT * FROM member_coupon where member_id=? AND coupon_id=?',
      [memberId, couponId]
    )
    if (checkCP.length > 0) {
      console.log('User has already claimed a coupon.')
      return true
    } else {
      const [results] = await db.execute(
        'INSERT INTO member_coupon (member_id, coupon_id, status, valid) VALUES (?, ?, 0, 1)',
        [memberId, couponId]
      )
      if (results.affectedRows > 0) {
        console.log('Coupon issued successfully.')
      } else {
        console.log('Failed to issue a coupon.')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// const cc = await checkIfClaimed(4, 43)
// console.log(cc)
// const mission = await checkFavShop(4)
// console.log(mission)
// console.log(favShop)

// const [mission] = await db.execute('SELECT * FROM mission')
// console.log(mission)

// }

// }
//印出單一優惠券
// const single = await getSingle(10)
// console.log(single)

export default router
