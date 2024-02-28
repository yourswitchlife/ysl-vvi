import React from 'react'
import styles from './select-coupon-modal.module.scss'
import { FaGamepad } from 'react-icons/fa'

export default function ProductCoupon() {
  return (
    <>
      <div className={styles.coupon}>
        {/* 勾選框框 */}
        <div className={styles.radioBar}>
          <input
            className={`form-check-input ${styles.radioBox}`}
            type="radio"
            name="p-coupon"
            value=""
          />
        </div>
        {/* 優惠券icon圖 */}
        <div className={styles.iconFrame}>
          <div className={styles.iconCircle}>
            <FaGamepad className={styles.icon} />
            <div className={styles.text}>遊戲優惠</div>
          </div>
        </div>
        {/* 優惠券詳細資訊 */}
        <div className={styles.couponInfoFrame}>
          <div className={styles.mainText}>折抵 $100 </div>
          <div className={styles.mainText}>
            適用於全站 - RPG遊戲，消費滿 $1000
          </div>
          <div className={styles.sub}>優惠券將於 2024.03.30(六) 到期</div>
          <div className={styles.rule}>使用規則</div>
        </div>
      </div>
    </>
  )
}
