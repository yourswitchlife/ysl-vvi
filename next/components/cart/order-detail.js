import React from 'react'
import { useState } from 'react'
import styles from '@/components/cart/order-detail.module.scss'
import {
  FaCircleQuestion,
  FaMoneyBillWave,
  FaClipboardList,
} from 'react-icons/fa6'
import { FaAngleRight } from 'react-icons/fa'
import OrderCheckout from './order-checkout'
import Image from 'next/image'
import Link from 'next/link'
// 選擇優惠券元件
import SelectCouponModal from './select-coupon-modal'

// 優惠券星星圖
import couponStar from '@/public/images/cart/couponStar.svg'
// 優惠券長型圖
import coupon from '@/public/images/cart/coupon.svg'

export default function OrderDetail() {
  const [show, setShow] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <SelectCouponModal />
      <section className="container">
        <div className={styles.pcBg}>
          <div className={styles.mainTitle}>訂單詳情</div>
          {/* 單一賣場訂單 */}
          <OrderCheckout />
          <OrderCheckout />
        </div>
        {/* 選擇優惠券/付款詳情區塊 */}
        <div className={`${styles.pcBg} ${styles.paymentPC}`}>
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
        <div className={`${styles.pcBg} ${styles.paymentMobile}`}>
          <div className={styles.payment}>
            {/* 選擇優惠券 */}
            <div className={styles.paymentItem}>
              <div className={styles.title}>
                <Image src={couponStar} />
                <div>優惠券</div>
              </div>
              <Link
                href="/cart/checkout/coupon"
                className={`text-dark ${styles.link}`}
              >
                選擇使用優惠券
              </Link>
            </div>
            {/* 顯示完整優惠折抵區塊 */}
            <div className={styles.paymentItem}>
              <div className={styles.title}>
                <Image src={coupon} />
                <div className={`text-body-secondary ${styles.subtext}`}>
                  已折抵 $160
                </div>
              </div>
              <div className={`text-body-secondary ${styles.subtext}`}>
                顯示完整折扣細節
              </div>
            </div>
            {/*完整優惠折抵細節  */}
            <div className={styles.couponInfo}>
              <div className={styles.mainTitle}>完整折扣細節</div>
              <div className={styles.line}></div>
              <div className={styles.title}>按折抵順序顯示</div>
              <div className={styles.item}>
                <Image src={couponStar} className={styles.icon} />
                <div>RPG遊戲優惠券 全站消費滿$1000 折抵$100 (每人限用一次)</div>
              </div>
              <div className={styles.item}>
                <Image src={couponStar} className={styles.icon} />
                <div>RPG遊戲優惠券 全站消費滿$1000 折抵$100 (每人限用一次)</div>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-dark btn-sm">確認</button>
              </div>
            </div>
            {/* 付款方式 */}
            <div className={styles.paymentItem}>
              <div className={styles.title}>
                <FaMoneyBillWave className={styles.billIcon} />
                <div>付款方式</div>
              </div>
              <div>
                <Link
                  href="/cart/checkout/payment"
                  className={`me-2 text-dark ${styles.link}`}
                >
                  請選擇付款方式
                </Link>
                <FaAngleRight className="text-dark" />
              </div>
            </div>
            {/* 付款詳情 */}
            <div className={`mb-3 ${styles.paymentItem}`}>
              <div className={styles.title}>
                <FaClipboardList className={styles.infoIcon} />
                <div>付款詳情</div>
              </div>
            </div>
            <div className={styles.InfoFrame}>
              <div className={styles.infoItem}>
                <div>商品總金額</div>
                <div>$3616</div>
              </div>
              <div className={styles.infoItem}>
                <div>運費總金額</div>
                <div>$60</div>
              </div>
              <div className={styles.summInfo}>
                <div>總付款金額</div>
                <div className="fw-bold text-danger">$7516</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 手機版-去買單腰帶區塊 */}
      <div className={styles.stickyMobileBar}>
        <div className={styles.checkoutBar}>
          <div className={styles.checkout}>
            <div className={styles.textContent}>
              <div className={styles.totalPrice}>
                總付款金額{' '}
                <span className="text-danger">
                  <b>$7516</b>
                </span>
              </div>
              <div className={styles.subInfo}>總額$7660 折抵$160</div>
            </div>
            <button
              className={`btn btn-danger rounded-0 ${styles.checkoutBtn}`}
            >
              下訂單
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
