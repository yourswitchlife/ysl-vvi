import { useState, useEffect } from 'react'
import styles from './orders-detail.module.scss'
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
import SelectCouponModal from '../../coupon-modal/select-coupon-modal'

// 優惠券星星圖
import couponStar from '@/public/images/cart/couponStar.svg'
// 優惠券長型圖
import coupon from '@/public/images/cart/coupon.svg'

// 引用use-cart鉤子
import { useCart } from '@/hooks/use-cart'



export default function OrdersDetailList() {
  const { cartItems } = useCart()
  const [showInfo, setShowInfo] = useState(false)

  // 付款總金額
  const [totalPrice, setTotalPrice] = useState(0)

  // 電腦版modal
  const [showDesktopModal, setShowDesktopModal] = useState(false);
  const handleShowDesktopModal = () => setShowDesktopModal(true);
  const handleCloseDesktopModal = () => setShowDesktopModal(false);

  // 手機版modal
  const [showMobileModal, setShowMobileModal] = useState(false);
  const handleShowMobileModal = () => setShowMobileModal(true);
  const handleCloseMobileModal = () => setShowMobileModal(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // 計算付款總金額
  const getTotalPrice = () => {
    const filterItems = cartItems.filter((item) => item.userSelect === true)
    const total = filterItems.reduce((prices, item) => {
      return prices + (item.quantity * item.price)
    }, 0)
    setTotalPrice(total)
  }

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);


  return (
    <>
      <SelectCouponModal />
      <section className="container">
        <div className={styles.pcBg}>
          <div className={styles.mainTitle}>訂單詳情</div>
          {/* 單一賣場訂單 */}
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
              <div className={styles.mainText} onClick={handleShowDesktopModal}>
                選擇使用優惠券
              </div>
              <SelectCouponModal show={showDesktopModal} handleClose={handleCloseDesktopModal} />
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
                <div>${totalPrice}</div>
              </div>
              <div className={styles.summaryItem}>
                <div>運費總金額</div>
                <div>$120</div>
              </div>
              <div className={styles.summaryItem}>
                <div>運費折抵</div>
                <div className="text-danger">$0</div>
              </div>
              <div className={styles.summaryItem}>
                <div>商品折抵</div>
                <div className={`text-danger ${styles.summaryItemPrice}`}>
                  $0
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
            </div>
            <div className={styles.useDiscountBar}>
              <div className='d-flex align-items-center justify-content-between'>
                <div className={styles.mainText} onClick={handleShowMobileModal}>
                  選擇使用優惠券
                </div>
                <FaAngleRight className='text-white' />
              </div>
              <SelectCouponModal show={showMobileModal} handleClose={handleCloseMobileModal} />
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
            </div>
            <div className={`${styles.paymentItem} mb-3`}>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  defaultChecked=""
                />
                <label className="btn btn-outline-dark" htmlFor="btnradio1">
                  貨到付款
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                />
                <label className="btn btn-outline-dark" htmlFor="btnradio2">
                  信用卡
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio3"
                  autoComplete="off"
                />
                <label className="btn btn-outline-dark" htmlFor="btnradio3">
                  <span className={styles.linePay}>
                    LINE PAY
                  </span>
                </label>
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
                <div className="fw-bold text-danger">${totalPrice}</div>
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
