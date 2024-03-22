import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'

export function setupChat(io) {
  io.on('connection', (socket) => {
    console.log(`聊天室連線: ${socket.id}`)

    socket.on('create_room', (room) => {
      socket.join(room)
      console.log(`用戶: ${socket.id} 加入聊天室: ${room}`)
    })
    socket.on('send_message', async (msgData) => {
      socket.to(msgData.room).emit('receive_message', msgData)
      // socket.to(msgData.receiver).emit('popout', msgData)
      // const { id, message } = msgData
      // await chatRead(id)
      // socket.to(msgData.room).emit('update_chat_history', msgData)
      // await chatInsert(id, message)
      // socket.broadcast.emit('receive_message', msgData)
      console.log(msgData)

      // socket.on('disconnect', () => {
      //   console.log(`用戶${socket.io}不在線上`)
      // })
    })

    // socket.on('request_chat_history', async (data) => {
    //   const { memberId, room } = data
    //   const history = await chatRead(memberId, room)
    //   socket.emit('update_chat_history', history)
    // })
  })
}

async function chatInsert(memberId, content) {
  const [chat] = await db.execute(
    'INSERT INTO CHATROOM(member_id, content) VALUES(?,?)',
    [memberId, content]
  )
  return { id: chat.insertId, memberId, content }
}

async function chatRead(memberId, chatname) {
  const [history] = await db.execute(
    'SELECT * FROM Chatroom WHERE member_id=? AND chat_name=?',
    [memberId, chatname]
  )
  return history
}

export default router
