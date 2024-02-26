import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import { FaCircleInfo } from 'react-icons/fa6'
import { FaGamepad, FaShippingFast } from 'react-icons/fa'
import ProductCoupon from '@/components/cart/product-coupon'
import DeliveryCoupon from '@/components/cart/delivery-coupon'
import styles from '@/styles/cart/coupon.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Coupon() {
  return (
    <>
      <CartNavbar />
      <section className={`container px-4 ${styles.container}`}>
        <div className={styles.couponFrame}>
          <div className={styles.productFrame}>
            <div className={styles.title}>
              <div className={styles.text}>商品抵用券</div>
              <FaCircleInfo className={styles.icon} />
            </div>
            <div className={styles.couponBody}>
              {/* 單一商品優惠券 */}
              <div className={styles.coupon}>
                {/* 勾選框框 */}
                <div className={styles.radioBar}>
                  <input
                    className={`form-check-input ${styles.radioBox}`}
                    type="radio"
                    name="p-coupon"
                    value=""
                  />
                </div>
                {/* 優惠券icon圖 */}
                <div className={styles.iconFrame}>
                  <div className={styles.iconCircle}>
                    <FaGamepad className={styles.icon} />
                    <div className={styles.text}>遊戲優惠</div>
                  </div>
                </div>
                {/* 優惠券詳細資訊 */}
                <div className={styles.couponInfoFrame}>
                  <div className={styles.mainText}>折抵 $100 </div>
                  <div className={styles.mainText}>
                    適用於全站 - RPG遊戲，消費滿 $1000
                  </div>
                  <div className={styles.sub}>
                    優惠券將於 2024.03.30(六) 到期
                  </div>
                  <div className={styles.rule}>使用規則</div>
                </div>
              </div>
              <div className={styles.coupon}>
                {/* 勾選框框 */}
                <div className={styles.radioBar}>
                  <input
                    className={`form-check-input ${styles.radioBox}`}
                    type="radio"
                    name="p-coupon"
                    value=""
                  />
                </div>
                {/* 優惠券icon圖 */}
                <div className={styles.iconFrame}>
                  <div className={styles.iconCircle}>
                    <FaGamepad className={styles.icon} />
                    <div className={styles.text}>遊戲優惠</div>
                  </div>
                </div>
                {/* 優惠券詳細資訊 */}
                <div className={styles.couponInfoFrame}>
                  <div className={styles.mainText}>折抵 $100 </div>
                  <div className={styles.mainText}>
                    適用於全站 - RPG遊戲，消費滿 $1000
                  </div>
                  <div className={styles.sub}>
                    優惠券將於 2024.03.30(六) 到期
                  </div>
                  <div className={styles.rule}>使用規則</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.deliveryFrame}>
            <div className={styles.title}>
              <div className={styles.text}>運費抵用券</div>
              <FaCircleInfo className={styles.icon} />
            </div>
            <div className={styles.couponBody}>
              {/* 單一運費優惠券 */}
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
                  <div className={styles.sub}>
                    優惠券將於 2024.03.30(六) 到期
                  </div>
                  <div className={styles.rule}>使用規則</div>
                </div>
              </div>
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
                  <div className={styles.sub}>
                    優惠券將於 2024.03.30(六) 到期
                  </div>
                  <div className={styles.rule}>使用規則</div>
                </div>
              </div>
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
                  <div className={styles.sub}>
                    優惠券將於 2024.03.30(六) 到期
                  </div>
                  <div className={styles.rule}>使用規則</div>
                </div>
              </div>
            </div>
          </div>
          <Link href="/cart/checkout" className={styles.confirmBtn}>
            確認
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
