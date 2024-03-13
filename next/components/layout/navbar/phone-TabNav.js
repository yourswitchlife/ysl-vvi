import React from 'react'
import styles from '@/components/layout/navbar/navbar.module.scss'
import { FaHome, FaHeart, FaBell, FaUserAlt, FaStore, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
//登出邏輯
import handleLogout from '@/services/logout';
//context hooks
import { useAuth } from '@/hooks/use-Auth';
// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function PhoneTabNav() {
  const { totalProducts } = useCart()
  return (
    <>
      <div className={`row g-0 text-center d-lg-none ${styles.phoneNav}`}>
        <div className="d-flex align-items-center">
          <div className="col">
            <Link href="/" className={styles.phoneNavContent}>
              <h5 className='mb-1'><FaHome /></h5>
              <p>首頁</p>
            </Link>
          </div>
          <div className="col">
            <Link href="/member/fav-product" className={styles.phoneNavContent}>
            <h5 className='mb-1'><FaHeart /></h5>
              <p>追蹤清單</p>
            </Link>
          </div>
          <div className="col">
            <Link href="/member/notify-order" className={styles.phoneNavContent}>
              <h5 className='mb-1'><FaBell /></h5>
              <p>通知</p>
            </Link>
          </div>
          <div className="col">
            <Link href="/member" className={styles.phoneNavContent}>
            <h5 className='mb-1'><FaUserAlt /></h5>
              <p>會員中心</p>
            </Link>
          </div>
          <div className="col">
            <Link href="/seller" className={styles.phoneNavContent}>
            <h5 className='mb-1'><FaStore /></h5>
              <p>賣場中心</p>
            </Link>
          </div>
          <div className="col">
            <Link href="/cart" className={`${styles.phoneNavContent} position-relative`}>
            <h5 className='mb-1'><FaShoppingCart /></h5>
              {totalProducts > 0 && (
                <span className={styles.cartBadge}>{totalProducts}</span>
              )}
              <p>購物車</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
