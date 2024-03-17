import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import multer from 'multer'
const upload = multer()
// import { io } from '../bin/www.js'

//任務要不要顯示的邏輯
router.get('/missionDisplay', async (req, res) => {
  const memberId = req.query.memberId
  const missionShow = await missionDisplay(memberId)
  res.status(200).json(missionShow)
})

export function setupMission(io) {
  io.on('connection', async (socket) => {
    // console.log('使用者連接id:', socket.id)

    socket.on('favoriteShop', async (memberId) => {
      try {
        const favShop = await checkFavShop(memberId)
        if (favShop.length === 0) {
          socket.emit('missionUpdated', {
            success: false,
            message: '還沒收藏過賣家喔',
          })
        } else {
          const updateResult = await updateShopMission(memberId)
          if (updateResult.updated === true) {
            socket.emit('missionUpdated', {
              success: true,
              message: '任務更新成功',
            })
          } else {
            socket.emit('missionUpdated', {
              success: false,
              message: '任務更新失敗',
            })
          }
        }
      } catch (error) {
        console.error('Error handling favoriteShop event:', error)
        socket.emit('missionUpdated', {
          success: false,
          message: '內部服務錯誤',
        })
      }
    })
  })
}

//任務收藏賣家:任務狀態更新&查看
router.get('/check-favshop', async (req, res) => {
  const memberId = req.query.memberId
  const favShop = await checkFavShop(memberId)
  if (favShop.length === 0) {
    return res.status(201).json({ success: false, message: '還沒收藏過賣家喔' })
  } else {
    const [checkID] = await db.execute(
      'SELECT * FROM mission WHERE member_id = ? AND mission_id = 2',
      [memberId]
    )

    if (checkID.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: '任務資料表中無此用戶' })
    } else {
      const updateResult = await updateShopMission(memberId)
      if (updateResult.affectedRows > 0) {
        return res.status(200).json({ success: true, message: '任務更新成功' })
      } else {
        return res
          .status(500)
          .json({ success: false, message: '無執行任務更新' })
      }
    }

    // const updateResult = await updateShopMission(memberId)
    // if (updateResult.updated) {
    //   return res.status(200).json({ message: '任務更新成功' })
    // } else if (updateResult.reason === '無更新執行') {
    //   return res.status(404).json({ message: '任務表中沒有此用戶' })
    // } else {
    //   return res.status(500).json({ message: '已完成任務不須更新' })
    // }
  }
})

//任務:獎勵是否發劵的判斷
router.post('/get-prize', upload.none(), async (req, res) => {
  const { memberId } = req.body
  const missionOk = await checkMission(memberId)
  if (missionOk.hasMissionData) {
    const claimed = checkIfClaimed(memberId, 43)
    if (claimed.result === true) {
      return res
        .status(200)
        .json({ success: false, message: '已經領取過優惠券了' })
    } else {
      return res.status(201).json({ success: true, message: '優惠券領取成功' })
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: '任務未完成，無法領取優惠券' })
  }
})

//任務:收藏賣家
router.post('/fav-shop', upload.none(), async (req, res) => {
  const { memberId } = req.body
  const favShop = await checkFavShop(memberId)
  if (favShop.length === 0) {
    return res.status(201).json({ message: '還沒收藏過賣家喔' })
  } else {
    const updateMission = await updateShopMission(memberId)
    if (updateMission) {
      return res.status(200).json({ message: '任務更新成功' })
    }

    // if (!updateMission) {
    //   return res.status(500).json({ message: '任務更新失敗' })
    // } else {
    //   const hasClaimed = await checkIfClaimed(memberId, 43)
    //   if (hasClaimed) {
    //     return res.status(200).json({ message: '已經領取過優惠券了' })
    //   } else {
    //     return res.status(200).json({ message: '優惠券領取成功' })
    //   }
    // }
  }
})

//任務寫入判定：是否在任務資料表有任務且status=0(未完成任務)
async function missionDisplay(id) {
  const [missionDisplay] = await db.execute(
    `SELECT
      mission_content.*,
      mission.member_id,
      mission.mission_id, 
      mission.status
      FROM mission_content
      JOIN mission
      ON mission_content.id = mission.mission_id
      WHERE mission.member_id = ?`,
    [id]
  )
  return missionDisplay
}

//任務:查詢是否有收藏賣家
async function checkFavShop(id) {
  const [favShop] = await db.execute(
    'SELECT * FROM fav_shop WHERE buyer_id=?',
    [id]
  )
  return favShop
}

//任務:查看收藏賣家mission確認任務狀態
async function checkMission(memberId) {
  const [missions] = await db.execute(
    'SELECT * FROM mission WHERE member_id=? AND mission_id=2',
    [memberId]
  )
  return { hasMissionData: missions.length > 0 && missions[0].status === 1 }
}

//任務:查詢會員是否有獎勵優惠券，有得話就不送，沒得話就送
async function checkIfClaimed(memberId, couponId) {
  try {
    const [checkCP] = await db.execute(
      'SELECT * FROM member_coupon where member_id=? AND coupon_id=?',
      [memberId, couponId]
    )
    if (checkCP.length > 0) {
      return { result: false, reason: '使用者已經領過此優惠券' }
    } else {
      const [results] = await db.execute(
        'INSERT INTO member_coupon (member_id, coupon_id, status, valid) VALUES (?, ?, 0, 1)',
        [memberId, couponId]
      )
      if (results.affectedRows > 0) {
        return { result: true, reason: '優惠券成功發放' }
      } else {
        return { result: false, reason: '無法發放優惠券' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

//完成任務後更新狀態
async function updateShopMission(memberId) {
  const [updateResult] = await db.execute(
    'UPDATE mission SET status = 1 WHERE member_id = ? AND mission_id = 2',
    [memberId]
  )
  if (updateResult.affectedRows > 0) {
    return { updated: true, reason: '更新成功' }
  } else {
    return { updated: false, reason: '無更新執行' }
  }
}

export default router
