import styles from '../cart/order-list.module.scss'
import Order from './order'
import Image from 'next/image'

// 引用優惠券選擇區
import UseCoupon from './use-coupon'

// 引用星星優惠券
import CouponStar from '@/public/images/cart/couponStar.svg'
// 引用漸層優惠券
import coupon from '@/public/images/cart/coupon.svg'

export default function OrderList() {
  return (
    <>
      <section className="container">
        {/* 購物車有商品顯示畫面 */}
        <div className="bg-white py-3 px-4 rounded-4 mb-5">
          <div className="row mb-3">
            <div className="col">
              <div className={`form-check ${styles.selectAllBar}`}>
                <input
                  className={`form-check-input me-3 ${styles.checkBox}`}
                  type="checkbox"
                  value=""
                  id="selectAll"
                />
                <label className="form-check-label fs-5" htmlFor="selectAll">
                  選擇全部
                </label>
              </div>
            </div>
          </div>
          <div className="row gx-0">
            <div className={`col-8 ${styles.orderListBar}`}>
              {/* 單一賣場訂單 */}
              <Order />
              <Order />
            </div>
            {/* 電腦版訂單總覽 */}
            <div className={`col-4 ${styles.orderOverviewBar}`}>
              <div className={styles.stickyBar}>
                <div className={styles.cartFrame}>
                  <div className={styles.framHeader}>
                    <h5 className={styles.title}>訂單總覽</h5>
                    <div className={styles.totalQuantity}>共 5 件商品</div>
                  </div>
                  <div className={styles.frameBody}>
                    <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>商品總計</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={styles.summaryItemPrice}>$1920</div>
                    </div>
                    <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>運費總計</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={styles.summaryItemPrice}>$120</div>
                    </div>
                    <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>商品折抵</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={`text-danger ${styles.summaryItemPrice}`}>
                        $200
                      </div>
                    </div>
                    <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>運費折抵</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={`text-danger ${styles.summaryItemPrice}`}>
                        $60
                      </div>
                    </div>
                    <UseCoupon />
                    <div className={styles.summeryTotal}>
                      <div className={styles.totalText}>訂單總金額</div>
                      <div className={styles.totalPrice}>$1920</div>
                    </div>
                    <div className={styles.payBtnBar}>
                      <button className={`btn btn-danger ${styles.btnPay}`}>
                        <span>去買單</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 手機版訂單總覽 */}
      <div className={styles.stickyMobileBar}>
        <div className={styles.orderOverviewMobileBar}>
          <div className={styles.useDiscountBar}>
            <div className={styles.discountLeft}>
              <Image src={CouponStar} />
              <div className={styles.coupon}>優惠券</div>
            </div>
            <div className={styles.discountRight}>選擇使用優惠券</div>
          </div>
          <div className={styles.discountInfo}>
            <div className={styles.infoLeft}>
              <Image src={coupon} />
              <div className={styles.discountPrice}>已折抵 $160</div>
            </div>
            <div className={styles.infoRight}>顯示完整折扣細節</div>
          </div>
        </div>
        <div className={styles.checkoutBar}>
          <div className={styles.checkout}>
            <div className={styles.textContent}>
              <div className={styles.totalPrice}>
                總金額{' '}
                <span className="text-danger">
                  <b>$7516</b>
                </span>
              </div>
              <div className={styles.totalQuantity}>共 5 件商品</div>
            </div>
            <button
              className={`btn btn-danger rounded-0 ${styles.checkoutBtn}`}
            >
              去買單
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
