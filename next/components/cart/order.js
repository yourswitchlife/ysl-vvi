import React, { useState } from 'react'
import styles from '../cart/order-list.module.scss'
import CartProduct from './cart-product'
import { FaShopify, FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'

export default function Order() {
  const [isEditing, setisEditing] = useState(false)

  const toggleEdit = () => {
    setisEditing(!isEditing)
  }

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
          <div className={styles.editBar} onClick={toggleEdit}>
            {isEditing ? (
              <>
                <FaCheck className="text-info" />
                <span className={`${styles.text} text-info`}>完成</span>
              </>
            ) : (
              <>
                <FaRegEdit />
                <span className={styles.text}>編輯</span>
              </>
            )}
          </div>
        </div>
        <div className={styles.pContainer}>
          <CartProduct isEditing={isEditing} />
          <CartProduct isEditing={isEditing} />
        </div>
      </div>
    </>
  )
}
