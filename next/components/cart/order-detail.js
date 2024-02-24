import React from 'react'
import { useState } from 'react'
import styles from '@/components/cart/order-detail.module.scss'
import { FaCircleQuestion } from 'react-icons/fa6'
import { FaAngleRight } from 'react-icons/fa'
import OrderCheckout from './order-checkout'
import Image from 'next/image'
// 選擇優惠券元件
import SelectCouponModal from './select-coupon-modal'

export default function OrderDetail() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <SelectCouponModal />
      <section className="container">
        <div className="bg-white py-3 px-4 rounded-4 mb-4">
          <div className={styles.mainTitle}>訂單詳情</div>
          <div className={styles.orderListBar}>
            {/* 單一賣場訂單 */}
            <OrderCheckout />
            <OrderCheckout />
          </div>
        </div>
        <div className="bg-white py-3 px-4 rounded-4 mb-4">
          <div className={styles.headerTitle}>
            <h5>
              <b>付款資訊</b>
            </h5>
            <FaCircleQuestion className={styles.icon} />
          </div>
          <div className="border-bottom border-3 border-light py-4">
            <div className={styles.payMethodBar}>
              <span className={`${styles.payBtn} ${styles.focus}`}>
                貨到付款
              </span>
              <span className={styles.payBtn}>信用卡付款</span>
              <span className={styles.linePay}>
                <Image
                  src="/images/cart/LINE-Pay(h)_W238_n.png"
                  width={75}
                  height={22}
                />
              </span>
            </div>
            {/* LINEPAY 及信用卡付款才顯示的提醒 */}
            <div className={styles.sub}>未完成付款請勿離開結帳頁面</div>
          </div>
          <div className="border-bottom border-3 border-light py-2">
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
          </div>
          <div className="border-bottom border-3 border-light py-4 d-flex justify-content-end">
            <div className={styles.frameBody}>
              <div className={styles.summaryItem}>
                <div>商品總金額</div>
                <div>$1920</div>
              </div>
              <div className={styles.summaryItem}>
                <div>運費總金額</div>
                <div>$120</div>
              </div>
              <div className={styles.summaryItem}>
                <div>運費折抵</div>
                <div className="text-danger">$200</div>
              </div>
              <div className={styles.summaryItem}>
                <div>商品折抵</div>
                <div className={`text-danger ${styles.summaryItemPrice}`}>
                  $60
                </div>
              </div>
              <div className={styles.summeryTotal}>
                <div>總付款金額</div>
                <div className="text-danger">$1920</div>
              </div>
            </div>
          </div>
          <div className={styles.payBtnBar}>
            <button className={`btn btn-danger ${styles.btnPay}`}>結帳</button>
          </div>
        </div>
      </section>
    </>
  )
}
