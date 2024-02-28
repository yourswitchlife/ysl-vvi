import React from 'react'
import styles from './select-coupon-modal.module.scss'
import { FaShippingFast } from 'react-icons/fa'

export default function DeliveryCoupon() {
  return (
    <>
      <div className={styles.coupon}>
        {/* 勾選框框 */}
        <div className={styles.radioBar}>
          <input
            className={`form-check-input ${styles.radioBox}`}
            type="radio"
            name="d-coupon"
            value=""
          />
        </div>
        {/* 優惠券icon圖 */}
        <div className={styles.iconFrame}>
          <div className={styles.iconCircle}>
            <FaShippingFast className={styles.icon} />
            <div className={styles.text}>運費優惠</div>
          </div>
        </div>
        {/* 優惠券詳細資訊 */}
        <div className={styles.couponInfoFrame}>
          <div className={styles.mainText}>訂單免運折抵</div>
          <div className={styles.mainText}>適用於全站</div>
          <div className={styles.sub}>優惠券將於 2024.03.30(六) 到期</div>
          <div className={styles.rule}>使用規則</div>
        </div>
      </div>
    </>
  )
}
