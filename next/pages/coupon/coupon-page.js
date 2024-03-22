import React, { useEffect, useState } from 'react'

import io from 'socket.io-client'

import Dropdown from 'react-bootstrap/Dropdown'
import sStyles from '@/styles/member/mseller.module.scss'

import CouponLa from '@/components/coupon/couponla'
import MissionTest from '@/components/mission/mission-fav'
import { useAuth } from '@/hooks/use-Auth'


export default function CouponMemberPage() {
  const [currentFilter, setCurrentFilter] = useState('valid')
  const socket = io.connect('http://localhost:3005')
  const { isLoggedIn, memberId } = useAuth()

  // const handleFilter = (newFilter) => {
  //   setCurrentFilter(newFilter)
  // }

 

  return (
    <>
    <div className='bg-light'>
      <MissionTest/>
      </div>
    </>
  )
}
