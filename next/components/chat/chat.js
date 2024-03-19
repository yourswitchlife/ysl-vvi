import React, { useEffect, useState } from 'react'

import styles from './chat.module.scss'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

export default function Chat({ socket, memberId, memberData, }) {
    //聊天訊息處理
    const [nowMsg, setNowMsg] = useState()
    
    const[messageList, setMessageList] = useState([])

    const sendMsg = async () => {
        if (nowMsg !== "") {
            const msgData = {
                id:memberId,
                author: memberData.account,
                message: nowMsg,
                time: new Date(Date.now()).getHours() + ":" + 
                new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", msgData)

        }
    }

    useEffect(()=>{
        socket.on("receive_message", (data)=>{
            setMessageList((list) => [...list, data])
        })
    }, [socket])


    //聊天視窗縮放
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show)
    return (

        <div className={styles.wrapper}>
            {show ? (
                <div onClick={toggleShow} className={`${styles.showUp}  d-flex justify-content-center align-items-center`}>
                    <span className='fs-4 d-flex align-items-center'><IoMdArrowDropupCircle /></span>
                    <h5>繼續聊聊</h5>

                </div>
            ) : (
                <>
                    <div className={`${styles.header} d-flex justify-content-between align-items-center`}>
                        <h5 className=''>聊天室</h5>
                        <span className='fs-4' onClick={toggleShow}><IoMdArrowDropdownCircle /></span>
                    </div>

                    <div className={styles.body}>
                        {messageList.map((msgContent)=>{
                            return <h3>{msgContent.message}</h3>
                        })}

                    </div>

                    <div className={styles.footer}>
                        <div className={styles.inputWrapper}>
                            <input type="text"
                                placeholder="輸入聊天內容"
                                onChange={(event) => {
                                    setNowMsg(event.target.value)
                                }}
                                className={styles.inputField} />
                            <button 
                            className={styles.sendButton}
                            onClick={()=>{sendMsg()}}>送出</button>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}
