import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import redMario from '@/public/images/mission/redMario.png'

import styles from '@/components/mission/mission.module.scss'
import { useAuth } from '@/hooks/use-Auth'


export default function Mission() {
  const { isLoggedIn, memberId } = useAuth()
  const [solved, SetSolved] = useState()
  const [addMission, setAddMission] = useState()

  //寫入新任務
    useEffect(()=>{
      fetch('http://localhost:3005/api/coupon/mission-insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId}),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          const missionData = result
          // setAddMission(result)
        })
    }, [memberId])

    //


// useEffect(() => {
//   const localStorage = window.localStorage
//   if (localStorage.getItem('solved') === 'true') {
//     SetSolved(true)
//   }
// }, [])

  return (
    <>
    <div className='w-50 h-75 bg-info rounded p-3 m-2'>
       <h4 className='text-center text-white p-2'>任務</h4>
       <div className='fs-4 text-white p-3'>每個人都會有尬意的賣家，趕快去收藏一個賣場，就能獲得驚喜優惠券唷！</div>
       <div className={`${styles.Mario} d-flex justify-content-center`}>
          <Image src={redMario} className='object-fit-cover'/>
      </div>
      <div className='d-flex justify-content-center align-items-center mt-3'>
        <button className='btn btn-danger'>解任務去</button>
      </div>
    </div>
    </>
  )
}
