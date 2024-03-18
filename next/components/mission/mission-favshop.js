import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import io from 'socket.io-client'

//pics
import redMario from '@/public/images/mission/redMario.png'

//styles
import styles from '@/components/mission/mission.module.scss'

//hook
import { useAuth } from '@/hooks/use-Auth'



export default function Mission() {
  const { isLoggedIn, memberId } = useAuth()
  const router = useRouter()
  const [mission, setMission] = useState([])
  const [solved, setSolved] = useState(null)
  const [prize, setPrize] = useState(false);
  const socket = io.connect('http://localhost:3005')


  //任務要不要顯示的判讀
  useEffect(() => {
    if (!isLoggedIn || !memberId) return

    fetch(`http://localhost:3005/api/mission/missionDisplay?memberId=${memberId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result[0])
        // const ShopMission = [result[0]]
        setMission(result)
      })
  }, [memberId, isLoggedIn])


  // const handleShopM = async (mission)=>{
  //   if(!isLoggedIn){
  //     return 
  //   }

  // const missionCheck = fetch('http://localhost:3005/api/mission/fav-shop', {
  //   method: 'POST',
  //   headers:{
  //     'Content-Type':'application/json',
  //   },
  //   body:JSON.stringify({memberId}),
  //   credentials: 'include',
  // })
  // .then(response => response.json())
  // .then(data => {
  //   // console.log(data);
  //   // alert(data.message)
  //   if(data.message === '還沒收藏過賣家喔'){
  //     router.push('/products')
  //   }else if(data.message === '優惠券領取成功'){
  //     // setSolved

  //   }
  // })
  // const missionData = missionCheck.json()
  // console.log(missionData);
  // }

  const checkMission = async () => {
    try {
       await fetch(`http://localhost:3005/api/mission/check-favshop?memberId=${memberId}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          // if (result.success === true){
          //   setMission(prevMissions => prevMissions.map(mission => {
          //     if (mission.mission_id === 2) { 
          //       return { ...mission, status: 1 }
          //     }
          //     return mission;
          //   }))
          // }
          // setSolved(true)

        //   if (result.success && !solved) {
        //     setSolved(true)
        // } else if (!result.success && solved) {
        //     setSolved(false)
        // }
        if (result.success) {
          console.log('Mission update successful, updating UI...');
          // Proceed to update UI based on the successful update
      } else {
          console.error('Mission update failed:', result.message);
          // Handle failure scenario
      }

        
        })
    } catch (error) {
      console.error(error)
    }
  }



  useEffect(() => {
    console.log('Connecting to socket...');
    socket.on('connect', () => {
      console.log('Connected to socket server', socket.id);
    });
    // const interval = setInterval(()=>{
    //   if (isLoggedIn && memberId) {
    //     checkMission()
    //   }
    // }, 15000)

    // return () => clearInterval(interval)
    // socket.on('missionUpdated', (updated) =>{
    //   console.log(updated)
    //   if(updated){
    //     console.log('任務狀態更新成功')
    //     setSolved(true)
    //   }else{
    //     console.log("無任務狀態更新");
    //   }
    // })

    // return () =>socket.off('missionUpdated')

  }, [memberId, isLoggedIn, socket]);


  // const claimPrize = async () => {
  //   const response = await fetch('http://localhost:3005/api/mission/get-prize', 
  //   { method: 'POST', 
  //   headers: { 'Content-Type': 'application/json' }, 
  //   body: JSON.stringify({ memberId}), });
  //   const data = await response.json();
  //   console.log(data)
  //   if (data.success) {
  //     Swal.fire('Success', '領獎成功', 'success');
  //     alert('Prize claimed successfully!');
  //   } else {
  //     alert('Failed to claim the prize.');
  //   }
  // };

  // useEffect(() => {
  //   claimPrize()
  // }, [])


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
              <button className={`btn ${m.status === 1  && solved? 'btn-info' : 'btn-danger'}`}> {m.status === 1 && solved? '快來領獎勵' : '去解任務'}</button>
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
