import React, { use, useEffect, useState } from 'react'

import styles from './chat.module.scss'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

export default function Chat({ socket, memberId, memberData, room }) {
    //要送出的訊息&接收的訊息
    const [nowMsg, setNowMsg] = useState()
    
    //聊天紀錄
    const[messageList, setMessageList] = useState([])

    const sendMsg = async () => {
        if (nowMsg !== "") {
            const msgData = {
                room:room,
                id:memberId,
                author: memberData.account,
                message: nowMsg,
                time: new Date(Date.now()).getHours() + ":" + 
                new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", msgData)
            setMessageList((list) => [...list, msgData])

            //訊息送出後就從輸入欄位清掉
            setNowMsg("")
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
                        <span className='fs-5' onClick={toggleShow}><IoMdArrowDropdownCircle /></span>
                    </div>

                    <div className={styles.body}>
                        {messageList.map((msgContent)=>{
                            return <div className={styles.message}>
                                <div className={styles.msgContent}>
                                    <h5>{msgContent.message}</h5>
                                </div>
                                <div className={styles.msgMeta}>
                                    <h5>{msgContent.time}</h5>
                                    <h5>{msgContent.author}</h5>
                                </div>
                            </div>
                        })}
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.inputWrapper}>
                            <input type="text"
                                value={nowMsg}
                                placeholder="輸入聊天內容"
                                onChange={(event) => {
                                    setNowMsg(event.target.value)
                                }}
                                className={`${styles.inputField} p-2`}
                                onKeyUp={(event) => {event.key === "Enter" && sendMsg()}}
                                />
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
