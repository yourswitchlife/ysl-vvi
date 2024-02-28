import React from 'react'
import styles from '../cart/order-list.module.scss'
import CartProduct from './cart-product'
import { FaShopify, FaTrashAlt, FaRegEdit } from 'react-icons/fa'

export default function Order() {
  return (
    <>
      {/* 單一賣場訂單 */}
      <div className={styles.orderList}>
        {/* 單一賣場購買商品清單 */}
        <div className={styles.shop}>
          <div className={styles.shopName}>
            <FaShopify className={styles.icon} />
            <h5>
              <b>玩具熊的小窩</b>
            </h5>
          </div>
          {/* 電腦版垃圾桶 */}
          <FaTrashAlt className={styles.trasgIcon} />
          {/* 手機板編輯 */}
          <div className={styles.editBar}>
            <FaRegEdit />
            <span className={styles.text}>編輯</span>
          </div>
        </div>
        <div className={styles.pContainer}>
          <CartProduct />
          <CartProduct />
        </div>
      </div>
    </>
  )
}
