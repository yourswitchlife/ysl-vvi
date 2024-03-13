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
        <div className="pt-1 d-flex">
          <div className="col">
            <Link href="/" className={styles.phoneNavContent}>
              <FaHome />
              <br />
              首頁
            </Link>
          </div>
          <div className="col">
            <Link href="/member/fav-product" className={styles.phoneNavContent}>
              <FaHeart />
              <br />
              追蹤清單
            </Link>
          </div>
          <div className="col">
            <Link href="/member/notify-order" className={styles.phoneNavContent}>
              <FaBell />
              <br />
              通知
            </Link>
          </div>
          <div className="col">
            <Link href="/member" className={styles.phoneNavContent}>
              <FaUserAlt />
              <br />
              會員中心
            </Link>
          </div>
          <div className="col">
            <Link href="/seller" className={styles.phoneNavContent}>
              <FaStore />
              <br />
              賣場中心
            </Link>
          </div>
          <div className="col">
            <Link href="/cart" className={`${styles.phoneNavContent} position-relative`}>
              <FaShoppingCart />
              {totalProducts > 0 && (
                <span className={styles.cartBadge}>{totalProducts}</span>
              )}
              <br />
              購物車
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
