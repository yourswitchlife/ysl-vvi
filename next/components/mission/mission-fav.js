import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import io from 'socket.io-client'
import JSConfetti from 'js-confetti'

//pics
import redMario from '@/public/images/mission/redMario.png'

//styles
import styles from '@/components/mission/mission.module.scss'

//hook
import { useAuth } from '@/hooks/use-Auth'



export default function MissionFavShop({ status }) {
  const { isLoggedIn, memberId } = useAuth()
  const router = useRouter()
  
  //讀取任務&其狀態
  const [mission, setMission] = useState([])

  //解任務&領獎
  const [solved, setSolved] = useState(null)
  const [prize, setPrize] = useState(false);
  const socket = io.connect('http://localhost:3005')

  //丟彩帶
  const [jsConfetti, setJsConfetti] = useState(null);

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    setJsConfetti(jsConfetti);
  }, []);


  //任務要不要顯示的判讀
  useEffect(() => {
    if (!isLoggedIn || !memberId) return

    fetch(`http://localhost:3005/api/mission/missionDisplay?memberId=${memberId}&status=${status}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result[0])
        // const ShopMission = [result[0]]
        setMission(result)
      })
  }, [memberId, isLoggedIn, status])



  const favoriteShop = () => {
    // console.log(`Emitting 'favoriteShop' event for memberId: ${memberId}`);
    socket.emit('favoriteShop', memberId);
  };

  useEffect(() => {
    // console.log('連線到 socket...')
    socket.on('connect', () => {
      //   console.log('連線id', socket.id);
    })

    favoriteShop()

    socket.on('missionUpdated', (updated) => {
      console.log(updated)
      if (updated.success === true) {
        console.log('恭喜解任務成功');
        setSolved(true);


      } else {
        console.log("還沒解完任務喔!");
      }
    })

    return () => socket.off('missionUpdated')

  }, [memberId, isLoggedIn, socket, jsConfetti, prize]);



  
  const claimPrize = async () => {
    const response = await fetch('http://localhost:3005/api/mission/get-prize',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      });
    const data = await response.json();
    console.log(data)
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "恭喜完成任務",
        text: "免運券已發放，趕快去查看有沒有領到吧！",
        confirmButtonText: '查看優惠券',

         
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/member/coupon-delivery')
        }


      })

      // if (!m.coupon_id) {
      //   jsConfetti && jsConfetti.addConfetti({
      //     confettiNumber: 300,
      //     confettiRadius: 6,
      //   });
      // }

      if (jsConfetti) {
        jsConfetti.addConfetti({
          confettiNumber: 300,
          confettiRadius: 6,
        });
      }
  
      
      setPrize(true)
      // if (jsConfetti) {
      //   jsConfetti.clearCanvas()
      // }
    } else {
      Swal.fire({
        icon: "info",
        title: "系統錯誤",
        text: "與我們聯絡吧，我們看看哪裡有問題",
      })
    }
  }



  return (
    <>
      {/* <Row xs={1} md={2} className=""> */}
      <div className='row justify-content-center '>
        {mission.map(m => (
          <div key={m.id} className={`${styles.bg} m-2 col-md-6 col-sm-12`}>
            <h4 className={`${styles.title} text-center p-2`}>{m.title}</h4>
            <div className='fs-4 p-3 text-start'>{m.content}</div>
            <div className={`${styles.Mario} d-flex justify-content-center`}>
              <Image src={redMario} className='object-fit-cover' alt="red_mario" />
            </div>

            <div className='d-flex justify-content-center align-items-center mt-3 mb-3'>
              <button className={`btn ${m.status === 1 ? (m.coupon_id || prize ? 'btn-dark' : 'btn-info') : 'btn-danger'}`}
                onClick={() => {
                  if (m.status === 1 && !m.coupon_id) {
                    claimPrize()
                  } else if (m.status === 0) {
                    router.push('/products')
                  }
                }}
                disabled={m.status === 1 && m.coupon_id}> {m.status === 1 ?(m.coupon_id || prize ? '任務完成' : '快來領獎勵') : '去解任務'}</button>
            </div>
          </div>
        ))}
      </div>


      {/* <div className='row justify-content-center '>
          {mission.map(m => (
            <div key={m.id} className={`${styles.bg} col-12 m-2 d-block d-md-none`}>
              <h4 className='text-center p-2'>{m.title}</h4>
              <div className='fs-4 p-3'>{m.content}</div>
              <div className={`${styles.Mario} d-flex justify-content-center`}>
                <Image src={redMario} className='object-fit-cover' />
              </div>

              <div className='d-flex justify-content-center align-items-center mt-3 mb-3'>
                <button className='btn btn-danger'>解任務去</button>
              </div>
            </div>
          ))}
        </div> */}
      {/* </Row> */}
    </>
  )
}
