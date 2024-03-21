import React, { useEffect, useState } from 'react'
import styles from './chat.module.scss'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io"
import moment from 'moment/moment'
import ScrollToBottom from 'react-scroll-to-bottom'

//讀大頭貼
import { Image } from 'react-bootstrap'
// import head_pic from '@/public/images/member/profile-pic/mario.webp'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'


export default function Chat({ socket, memberId, memberData, room, isLoggedIn, sellerId }) {
    //要送出的訊息&接收的訊息
    const [nowMsg, setNowMsg] = useState()

    //頭貼
    const [pic, setPic] = useState("")

    //聊天紀錄
    const [messageList, setMessageList] = useState([])

    const sendMsg = async () => {
        if (nowMsg !== "") {
            const time = moment().format('HH:hh')
            const msgData = {
                room: room,
                id: memberId,
                author: memberData.account,
                receiver: sellerId,
                pic: memberData.pic,
                message: nowMsg,
                time: time,
            }
            await socket.emit("send_message", msgData)
            setMessageList((list) => [...list, msgData])

            //訊息送出後就從輸入欄位清掉
            setNowMsg("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])

        })

        socket.on('popout', (msgData) => {
            console.log('有人傳訊息給你喔:', msgData.message)
            
            setShowChat(true)
        });

    }, [socket])



    //聊天視窗縮放
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show)
    return (
        <>
        <div className={`${styles.wrapper} d-md-block d-none`}>
            {show ? (
                <div onClick={toggleShow} className={`${styles.showUp}  d-flex justify-content-center align-items-center`}>
                    <span className='fs-2 d-flex align-items-center'><IoMdArrowDropupCircle /></span>
                    <span className='fs-4'>繼續聊聊</span>

                </div>
            ) : (
                <>
                    <div className={`${styles.header} d-flex justify-content-between align-items-center`}>
                        <h4 className=''>聊天室</h4>
                        <span className='fs-2' onClick={toggleShow}><IoMdArrowDropdownCircle /></span>
                    </div>

                    <div className={styles.body}>
                        {/* <ScrollToBottom className={styles.scrollControl}> */}

                        {messageList.map((msgContent) => {
                            return <div className={styles.message}>
                            <div className={`${memberId === msgContent.id ? styles.sContainer:styles.rContainer }`}>
                                <div className={`${memberId === msgContent.id ? styles.sPic : styles.rPic}`}>
                                    <Image
                                        width={40}
                                        height={40}
                                        className={styles.pPic}
                                        src={msgContent.pic ? (msgContent.pic.startsWith("https://") ? msgContent.pic : `http://localhost:3005/profile-pic/${msgContent.pic}`)
                                            : profilePhoto} alt='profile_pic' />
                                </div>
                                <div className={`${memberId === msgContent.id ? styles.sender : styles.recipient}`} >
                                    <p>{msgContent.message}</p>
                                </div>
                            </div>
                                {/* <div className={styles.msgMeta}> */}
                                {/* <p className={`${memberId === msgContent.id ? styles.sTime : styles.rTime}`}>{msgContent.time}</p> */}
                                {/* <h5>{msgContent.author}</h5> */}
                                {/* </div> */}
                            </div>
                        })}
                        {/* </ScrollToBottom> */}
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
                                onKeyUp={(event) => { event.key === "Enter" && sendMsg() }}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={() => { sendMsg() }}>送出</button>
                        </div>
                    </div>

                </>
            )}
        </div>


        <div className={`${styles.wrapper} d-md-none d-block`}>
            {show ? (
                <div onClick={toggleShow} className={`${styles.showUp}  d-flex justify-content-center align-items-center`}>
                    <span className='fs-2 d-flex align-items-center'><IoMdArrowDropupCircle /></span>
                    <span className='fs-4'>繼續聊聊</span>

                </div>
            ) : (
                <>
                    <div className={`${styles.header} d-flex justify-content-between align-items-center`}>
                        <h4 className=''>聊天室</h4>
                        <span className='fs-2' onClick={toggleShow}><IoMdArrowDropdownCircle /></span>
                    </div>

                    <div className={styles.body}>
                        {/* <ScrollToBottom className={styles.scrollControl}> */}

                        {messageList.map((msgContent) => {
                            return <div className={styles.message}>
                            <div className={`${memberId === msgContent.id ? styles.sContainer:styles.rContainer }`}>
                                <div className={`${memberId === msgContent.id ? styles.sPic : styles.rPic}`}>
                                    <Image
                                        width={40}
                                        height={40}
                                        className={styles.pPic}
                                        src={msgContent.pic ? (msgContent.pic.startsWith("https://") ? msgContent.pic : `http://localhost:3005/profile-pic/${msgContent.pic}`)
                                            : profilePhoto} alt='profile_pic' />
                                </div>
                                <div className={`${memberId === msgContent.id ? styles.sender : styles.recipient}`} >
                                    <p>{msgContent.message}</p>
                                </div>
                            </div>
                                {/* <div className={styles.msgMeta}> */}
                                {/* <p className={`${memberId === msgContent.id ? styles.sTime : styles.rTime}`}>{msgContent.time}</p> */}
                                {/* <h5>{msgContent.author}</h5> */}
                                {/* </div> */}
                            </div>
                        })}
                        {/* </ScrollToBottom> */}
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
                                onKeyUp={(event) => { event.key === "Enter" && sendMsg() }}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={() => { sendMsg() }}>送出</button>
                        </div>
                    </div>

                </>
            )}
        </div>
        </>
    )
}
