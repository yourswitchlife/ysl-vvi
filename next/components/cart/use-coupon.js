import React from 'react'
import { useState } from 'react'
import styles from '../cart/order-list.module.scss'
import { FaAngleRight } from 'react-icons/fa'
// 選擇優惠券元件
import SelectCouponModal from './select-coupon-modal'

export default function UseCoupon() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <SelectCouponModal />
      <div className={styles.useDiscountBar}>
        <div className={styles.mainText} onClick={handleShow}>
          選擇使用優惠券
        </div>
        <SelectCouponModal show={show} handleClose={handleClose} />
        <div className={styles.divider}></div>
        <div className={styles.discountListBtn}>
          <span className={styles.text}>顯示完整折扣細節</span>
          <FaAngleRight className={styles.icon} />
        </div>
      </div>
    </>
  )
}
