import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-Auth'
import io from 'socket.io-client'

import Chat from '@/components/chat/chat'


export default function ChatControl() {
  //發起聊天室的會員帳號
  const [account, setAccount] = useState("")

  //聊天室名字
  const [room, setRoom] = useState("")

  const [socket, setSocket] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const { isLoggedIn, memberId, memberData } = useAuth()
  
  useEffect(() => {
    const newSocket = io("http://localhost:3005");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  

  const createRoom = (memberId)=>{
    const room = `${memberId}的發訊息空間`
    if(socket) socket.emit("create_room", room)
    setShowChat(true)
    setRoom(room)
    // if(!isLoggedIn){
    //   router.push('/member/login')
    //   return 
    // }else{

    // }
  }


  return (
    <>
    <div className='text-white'>Chat</div>
    <button className='btn btn-danger'
    onClick={()=>createRoom(memberId) }>跟賣家聊聊</button>

    {!showChat? (""):
    (<Chat socket={socket} memberId={memberId} memberData={memberData} room={room}/>)
    }

    </>
  )
}
