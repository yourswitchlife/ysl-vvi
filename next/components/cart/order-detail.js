import React from 'react'
import styles from '@/components/cart/order-detail.module.scss'
import OrderCheckout from './order-checkout'

export default function OrderDetail() {
  return (
    <>
      <section className="container">
        <div className="bg-white py-3 px-4 rounded-4 mb-5">
          <div className={styles.mainTitle}>訂單詳情</div>
          <div className={styles.orderListBar}>
            {/* 單一賣場訂單 */}
            <OrderCheckout />
            <OrderCheckout />
          </div>
        </div>
      </section>
    </>
  )
}
