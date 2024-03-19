import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'

export function setupChat(io) {
  io.on('connection', (socket) => {
    console.log(`聊天室連線: ${socket.id}`)

    socket.on('create_room', (data) => {
      socket.join(data)
      console.log(`用戶: ${socket.id} 加入聊天室: ${data}`)
    })
    socket.on('send_message', async (data) => {
      io.to(data).emit('receive_message', data)
      console.log(data)

      //   const { room, message } = data
      // Implement saveMessageToDatabase or similar
      //   saveMessageToDatabase(room, message).then(() => {
      //     socket.to(room).emit('receive_message', message)
      //   })
    })

    // Other chat-related socket event handlers...
  })
}

router.get('/', (req, res) => {
  res.send('聊天室')
})

export default router
