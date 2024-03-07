import React from 'react'
import Link from 'next/link'
import styles from '@/components/seller/seller.module.scss'
import coupon from '@/public/images/card/coupon.png'
import Image from 'next/image'

export default function Coupon() {
  return (
    <>
      <div className={styles.coupon}>
        <div
          className={`d-flex justify-content-between align-items-end mb-4 ${styles.coupontitle}`}
        >
          <Link
            href="/coupon"
            className={`${styles.title} ${styles.linkstyle}`}
          >
            <h4 className="mb-0">YSL官網優惠券</h4>
          </Link>
          <Link
            href="/user/coupon"
            className={`${styles.subtitle} ${styles.linkstyle}`}
          >
            <h6 className="mb-0">查看我的優惠券</h6>
          </Link>
        </div>
        <div>
          <Image src={coupon} alt="" className="me-4" />
          <Image src={coupon} alt="" />
        </div>
      </div>
    </>
  )
}
