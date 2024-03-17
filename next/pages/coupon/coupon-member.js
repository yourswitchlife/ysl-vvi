import React, { useEffect, useState } from 'react'

import io from 'socket.io-client'

// import CouponDelivery from '@/components/coupon/coupon-member/couponD-member'
// import CouponMember from '@/components/coupon/coupon-member/couponP-member'
// import CouponSeller from '@/components/coupon/coupon-seller/coupon-seller'

import Dropdown from 'react-bootstrap/Dropdown'
import sStyles from '@/styles/member/mseller.module.scss'

import CC from '@/components/coupon/couponPdd-member'
import MissionTest from '@/components/mission/mission-test'
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
      {/* <CouponMember/> */}
      {/* <CouponDelivery/>
      <CouponMember/> */}

      <MissionTest/>
     


      {/* <CC /> */}
      {/* <Couponn currentFilter={currentFilter}/> */}

      {/* <CouponSeller/> */}
    </>
  )
}
