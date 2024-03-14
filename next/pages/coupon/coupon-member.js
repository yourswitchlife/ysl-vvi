import React, { useEffect, useState } from 'react'
// import CouponMember from '@/components/coupon/coupon-member/couponP-member'
import CouponDelivery from '@/components/coupon/coupon-member/couponD-member'
import CouponMember from '@/components/coupon/coupon-member/couponP-member'
import CouponSeller from '@/components/coupon/coupon-seller/coupon-seller'

export default function couponMember() {
  return (
    <>
    {/* <CouponMember/> */}
      <CouponDelivery/>
      <CouponMember/>

      <CouponSeller/>
    </>
  )
}
