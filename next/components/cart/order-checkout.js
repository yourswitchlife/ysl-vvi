import React from 'react'
import styles from '@/components/cart/order-detail.module.scss'
import ProductCheckout from './cart-product-checkout'
import DeliveryOrderCheckout from './delivery-order-checkout'
import { FaShopify } from 'react-icons/fa'

export default function OrderCheckout() {
  return (
    <>
      <div className={styles.orderList}>
        {/* 單一賣場購買商品清單 */}
        <div className={styles.topFrame}>
          <div className={styles.shop}>
            <div className={styles.shopName}>
              <FaShopify className={styles.icon} />
              <h5>
                <b>玩具熊的小窩</b>
              </h5>
            </div>
          </div>

          <div className={styles.listFrame}>
            <div className={`${styles.list} ${styles.pb}`}></div>
            <div className={`${styles.list} ${styles.ab}`}>單價</div>
            <div className={`${styles.list} ${styles.qb}`}>數量</div>
            <div className={`${styles.list} ${styles.sb}`}>總價</div>
          </div>
          <div className={styles.pContainer}>
            {/* 商品 */}
            <ProductCheckout />
            <ProductCheckout />
          </div>
        </div>
        <div className={styles.deliveryContainer}>
          {/* 寄送資訊、收件資訊 */}
          <DeliveryOrderCheckout />
        </div>
      </div>
    </>
  )
}
