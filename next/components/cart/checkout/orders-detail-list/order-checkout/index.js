import { useState, useEffect } from 'react'
import styles from '../orders-detail.module.scss'
import ProductCheckout from './product-checkout'
import DeliveryCheckout from './delivery-checkout'
import { FaShopify } from 'react-icons/fa'

// 引用use-cart鉤子
import { useCart } from '@/hooks/use-cart'
import { method } from 'lodash'

// 引入共同shipping鉤子
import { useShipping } from '@/hooks/use-shipping'

export default function OrderCheckout() {

  const { orderGroup, shopName } = useShipping()

  return (
    <>
      {Object.entries(orderGroup).map(([member_id, items]) => {
        const name = shopName[member_id] ? shopName[member_id] : "Loading..."
        return (
          <div key={member_id} className={styles.orderList}>
            {/* 單一賣場購買商品清單 */}
            <div className={styles.topFrame}>
              <div className={styles.shop}>
                <div className={styles.shopName}>
                  <FaShopify className={styles.icon} />
                  <h5>
                    <b>{name}</b>
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
                {items.map((item) =>
                  <ProductCheckout key={item.id} item={item} />
                )}
              </div>
            </div>
            <div className={styles.deliveryContainer}>
              {/* 寄送資訊、收件資訊 */}

              <DeliveryCheckout key={member_id} memberId={member_id} items={items} />

            </div>
          </div>
        )
      })}
    </>
  )
}
