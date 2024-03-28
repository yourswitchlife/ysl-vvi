import styles from './order-list.module.scss'
import Order from './order'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

//使用SweetAlert2 API
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

// 引用星星優惠券
import CouponStar from '@/public/images/cart/couponStar.svg'
// 引用漸層優惠券
import coupon from '@/public/images/cart/coupon.svg'

export default function OrderList() {
  const { cartItems, handleAllCheckboxChange, totalProducts, totalPrice } =
    useCart()
  const payingItems = cartItems.filter(item => item.userSelect !== false)
  const selectedItems = payingItems.length
  const router = useRouter()

  // 去買單
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(cartItems.length > 0 && payingItems.length > 0){
      router.push('/cart/checkout')
    }else{
      MySwal.fire({
        icon: 'warning',
        text: '請先選擇商品結帳',
        confirmButtonColor: '#E41E49',
      })
      return
    }
  }
  return (
    <>
      <section className="container">
        {/* 購物車有商品顯示畫面 */}
        <div className="bg-white py-3 px-4 rounded-4 mb-5">
          <div className="row mb-3">
            <div className="col">
              {/* 選擇全部 */}
              <div className={`form-check ${styles.selectAllBar}`}>
                <input
                  className={`form-check-input me-3 ${styles.checkBox}`}
                  type="checkbox"
                  id="selectAll"
                  value={cartItems}
                  checked={
                    cartItems.every((item) => item.userSelect === true)

                  }
                  onChange={() => {
                    handleAllCheckboxChange(cartItems)
                  }}
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
            </div>
            {/* 電腦版訂單總覽 */}
            <div className={`col-4 ${styles.orderOverviewBar}`}>
              <div className={styles.stickyBar}>
                <div className={styles.cartFrame}>
                  <div className={styles.framHeader}>
                    <h5 className={styles.title}>訂單總覽</h5>
                    <div className={styles.totalQuantity}>
                      {selectedItems ? (
                        <>
                          共 {selectedItems} 件商品
                        </>
                    ) : (
                      <></>
                    )}
                    </div>
                  </div>
                  <div className={styles.frameBody}>
                    <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>商品總計</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={styles.summaryItemPrice}>
                        ${totalPrice}
                      </div>
                    </div>
                    {/* <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>運費總計</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={styles.summaryItemPrice}>$120</div>
                    </div> */}
                    {/* <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>商品折抵</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={`text-danger ${styles.summaryItemPrice}`}>
                        $0
                      </div>
                    </div> */}
                    {/* <div className={styles.summaryItem}>
                      <div className={styles.summaryItemLabel}>運費折抵</div>
                      <div className={styles.summaryItemLine}></div>
                      <div className={`text-danger ${styles.summaryItemPrice}`}>
                        $60
                      </div>
                    </div> */}
                    <div className={styles.summeryTotal}>
                      <div className={styles.totalText}>訂單總金額</div>
                      <div className={styles.totalPrice}>${totalPrice}</div>
                    </div>
                    <div className={styles.payBtnBar}>
                      <button className={`btn btn-danger ${styles.btnPay}`} onClick={handleSubmit}>
                        去買單
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
        {/* <div className={styles.orderOverviewMobileBar}>
          <div className={styles.useDiscountBar}>
            <div className={styles.discountLeft}>
              <Image src={CouponStar} />
              <div className={styles.coupon}>優惠券</div>
            </div>
            <Link href="/cart/checkout/coupon" className={styles.discountRight}>
              選擇使用優惠券
            </Link>
          </div>
          <div className={styles.discountInfo}>
            <div className={styles.infoLeft}>
              <Image src={coupon} />
              <div className={styles.discountPrice}>已折抵 $160</div>
            </div>
            <div className={styles.infoRight}>顯示完整折扣細節</div>
          </div>
        </div> */}
        <div className={styles.checkoutBar}>
          <div className={styles.checkout}>
            <div className={styles.textContent}>
              <div className={styles.totalPrice}>
                總金額{' '}
                <span className="text-danger">
                  <b>${totalPrice}</b>
                </span>
              </div>
              <div className={styles.totalQuantity}>共 {selectedItems} 件商品</div>
            </div>
            <div
              className={`btn btn-danger rounded-0 ${styles.checkoutBtn}`} onClick={handleSubmit}
            >
              去買單
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
