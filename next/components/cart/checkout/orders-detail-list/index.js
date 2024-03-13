import { useState, useEffect } from 'react'
import styles from './orders-detail.module.scss'
import {
  FaCircleQuestion,
  FaMoneyBillWave,
  FaClipboardList,
  FaCircleInfo,
} from 'react-icons/fa6'
import { FaAngleRight, FaGamepad, FaShippingFast } from 'react-icons/fa'
import OrderCheckout from './order-checkout'
import Image from 'next/image'
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'

// 優惠券星星圖
import couponStar from '@/public/images/cart/couponStar.svg'
// 優惠券長型圖
import coupon from '@/public/images/cart/coupon.svg'

// 引用use-cart鉤子
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-Auth'

//使用SweetAlert2 API
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)



export default function OrdersDetailList() {
  const { cartItems } = useCart()
  const { memberData } = useAuth();

  // 免運優惠券折抵金額
  const [shippingDiscount, setShippingDiscount] = useState(0)
  // 商品優惠券折抵金額
  const [productDiscount, setProductDiscount] = useState(0)

  // 儲存從order-checkout傳來的物流方式
  const [shippingMethods, setShippingMethods] = useState({});

  // 儲存從order-checkout的總運費狀態
  const [totalShippingFee, setTotalShippingFee] = useState(0)

  // 儲存從order-checkout的總運費狀態
  const [shippingInfos, setShippingInfos] = useState({})


  // 付款總金額
  const [totalPrice, setTotalPrice] = useState(0)
  // 付款方式
  const [paymentMethod, setPaymentMethod] = useState(1)


  // 電腦版modal
  const [showDesktopModal, setShowDesktopModal] = useState(false)
  const handleShowDesktopModal = () => setShowDesktopModal(true)
  const handleCloseDesktopModal = () => setShowDesktopModal(false)

  // 手機版modal
  const [showMobileModal, setShowMobileModal] = useState(false)
  const handleShowMobileModal = () => setShowMobileModal(true)
  const handleCloseMobileModal = () => setShowMobileModal(false)

  // 計算從子層傳來的每個運費的總運費
  const updateTotalShippingFee = (newFees) => {
    const totalFee = Object.values(newFees).reduce((total, fee) => total + fee, 0);
    setTotalShippingFee(totalFee)
    console.log(totalShippingFee)
  }

  // 從子層傳來的每個物流方式狀態
  const handleShippingMethodChange = (method) => {
    setShippingMethods(prevMethods => ({
      ...prevMethods,
      ...method
    }))
  }



  // 計算商品總金額
  const getTotalPrice = () => {
    const filterItems = cartItems.filter((item) => item.userSelect === true)
    const total = filterItems.reduce((prices, item) => {
      return prices + (item.quantity * item.price)
    }, 0)
    setTotalPrice(total)
  }

  useEffect(() => {
    getTotalPrice();
  }, [cartItems, totalShippingFee])

  // 選擇的付款方式存在狀態裡
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    console.log('選擇的付款方式:', method);
  }

  // 儲存子層傳來的收件資訊們
  const handleShippingInfos = (shippingInfo) => {
    setShippingInfos(prevData => ({
      ...prevData, ...shippingInfo
    }))
  }

  useEffect(() => {
    console.log(shippingInfos);
  }, [shippingInfos])

  // 整理shippingInfos成收件人姓名、收件人電話、地址
  const formatShippingInfos = (shippingInfos) => {
    return Object.entries(shippingInfos).map(([member_id, info]) => ({
      member_id,
      receiveName: info.name, // 收件人姓名
      receivePhone: info.phone, // 收件人電話
      receiveaddress: `${info.address} ${info.addressType} ${info.deliveryTime}`, // 地址
    }))
  }

  // 篩選出userSelect=true的商品
  const payingItems = cartItems.filter((item) => item.userSelect === true)
  // console.log(payingItems)

  const router = useRouter()

  // 結帳完成移除購物車商品
  const handleCheckoutSuccess = () =>{
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    const remainingItems = cartItems.filter(item => !item.userSelect)
    localStorage.setItem('cartItems', JSON.stringify(remainingItems))
  }


  // 處理結帳 / 下訂單按鈕的送出連接後端產生訂單
  const handleSubmit = async () => {
    if (!paymentMethod) {
      alert("請選擇一個付款方式")
      return
    }

    const formattedShippingInfos = formatShippingInfos(shippingInfos);

    const orderData = {
      member_buyer_id: memberData.id,
      paymentMethod,
      items: payingItems,
      shipping_method: shippingMethods,
      totalPrice: totalPrice + totalShippingFee, //可能用不到，先傳過去
      shippingDiscount,
      productDiscount,
      shippingInfos: formattedShippingInfos,
    }
    // console.log(orderData);

    try {

      console.log("建立訂單，付款方式:", paymentMethod)
      let url = "http://localhost:3005/api/cart/create-order"
      fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('訂單建立失敗')
          }
          return response.json()
        })
        .then((results) => {
          console.log(results)
          handleCheckoutSuccess()

          // 依據message判斷
          switch (results.message) {
            case '建立訂單成功，貨到付款':
              const groupCashId = results.groupId
              router.push(`/cart/purchase?orderId=${groupCashId}`)
              break
            case '建立訂單成功，LINEPAY':
              const groupId = results.groupId
              // 導向LINE PAY後端處理
              fetch('http://localhost:3005/api/cart/line-pay', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...orderData, groupId }),
              })
                .then(response => response.json())
                .then(data => {
                  console.log(data);
                  window.location.href = data
                })
                .catch(error => {
                  console.error('錯誤:', error)
                })
              break
            case '建立訂單成功，信用卡':
              const groupIdForCreditCard = results.groupId
              // 導向LINE PAY後端處理
              fetch('http://localhost:3005/api/cart/credit-card', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
              })
                .then(response => response.json())
                .then(data => {
                  console.log(data)
                  window.location.href = `/cart/purchase?orderId=${groupIdForCreditCard}`
                })
                .catch(error => {
                  console.error('錯誤:', error)
                })
              break
            default:
              console.log('未定義的付款方式')
          }

        })
        .catch((error) => {
          console.error('伺服器連線失敗:', error);
        })


    } catch (error) {
      console.error("訂單處理錯誤", error)
    }
  }



  return (
    <>
      <section className="container">
        <div className={styles.pcBg}>
          <div className={styles.mainTitle}>訂單詳情</div>
          {/* 單一賣場訂單 */}
          <OrderCheckout updateTotalShippingFee={setTotalShippingFee} updateShippingMethod={handleShippingMethodChange} onShippingInfoReceived={handleShippingInfos} />
        </div>

        <div className={`${styles.pcBg} ${styles.paymentPC}`}>
          <div className={styles.headerTitle}>
            <h5>
              <b>付款資訊</b>
            </h5>
            <FaCircleQuestion className={styles.icon} />
          </div>
          {/* 電腦版付款方式 */}
          <div className="border-bottom border-3 border-light py-4">
            <div className={styles.payMethodBar}>
              <span className={`${styles.payBtn} ${paymentMethod === 1 ? styles.focus : ''}`} data-payment="cash" onClick={() => handlePaymentMethodChange(1)}>
                貨到付款
              </span>
              <span className={`${styles.payBtn} ${paymentMethod === 3 ? styles.focus : ''}`} data-payment="credit-card" onClick={() => handlePaymentMethodChange(3)}>信用卡付款</span>
              <span className={`${styles.linePay} ${paymentMethod === 2 ? styles.focus : ''}`} data-payment="line-pay" onClick={() => handlePaymentMethodChange(2)}>
                <Image
                  src="/images/cart/LINE-Pay(h)_W238_n.png"
                  width={75}
                  height={22}
                  alt='LINE PAY'
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
              <Modal show={showDesktopModal} onClick={handleCloseDesktopModal}>
                <Modal.Header closeButton>
                  <Modal.Title className={styles.couponHeader}>選擇優惠券</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                          <div className={styles.sub}>優惠券將於 2024.03.30(六) 到期</div>
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
                          <div className={styles.sub}>優惠券將於 2024.03.30(六) 到期</div>
                          <div className={styles.rule}>使用規則</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDesktopModal}>
                    取消
                  </Button>
                  <Button variant="danger" onClick={handleCloseDesktopModal}>
                    完成
                  </Button>
                </Modal.Footer>
              </Modal>
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
                <div>${totalShippingFee}</div>
              </div>
              <div className={styles.summaryItem}>
                <div>運費折抵</div>
                <div className="text-danger">${shippingDiscount}</div>
              </div>
              <div className={styles.summaryItem}>
                <div>商品折抵</div>
                <div className={`text-danger ${styles.summaryItemPrice}`}>
                  ${productDiscount}
                </div>
              </div>
              <div className={styles.summeryTotal}>
                <div>總付款金額</div>
                <div className="text-danger">${totalPrice + totalShippingFee - (shippingDiscount + productDiscount)}</div>
              </div>
            </div>
          </div>
          <div className={styles.payBtnBar}>
            <button className={`btn btn-danger ${styles.btnPay}`} onClick={handleSubmit}>結帳</button>
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
              <Modal show={showMobileModal} onClick={handleCloseMobileModal}>
                <Modal.Header closeButton>
                  <Modal.Title className={styles.couponHeader}>選擇優惠券</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                          <div className={styles.sub}>優惠券將於 2024.03.30(六) 到期</div>
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
                          <div className={styles.sub}>優惠券將於 2024.03.30(六) 到期</div>
                          <div className={styles.rule}>使用規則</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMobileModal}>
                    取消
                  </Button>
                  <Button variant="danger" onClick={handleCloseMobileModal}>
                    完成
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            {/* 顯示完整優惠折抵區塊 */}
            <div className={styles.paymentItem}>
              <div className={styles.title}>
                <Image src={coupon} />
                <div className={`text-body-secondary ${styles.subtext}`}>
                  已折抵 ${shippingDiscount + productDiscount}
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
            {/* 手機版付款方式 */}
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
                  name="payment"
                  id="payment1"
                  autoComplete="off"
                  defaultChecked=""
                  onChange={() => handlePaymentMethodChange(1)}
                />
                <label className="btn btn-outline-dark" htmlFor="payment1">
                  貨到付款
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="payment"
                  id="payment2"
                  onChange={() => handlePaymentMethodChange(3)}
                />
                <label className="btn btn-outline-dark" htmlFor="payment2">
                  信用卡
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="payment"
                  id="payment3"
                  onChange={() => handlePaymentMethodChange(2)}
                />
                <label className="btn btn-outline-dark" htmlFor="payment3">
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
                <div>${totalPrice}</div>
              </div>
              <div className={styles.infoItem}>
                <div>運費總金額</div>
                <div>${totalShippingFee}</div>
              </div>
              <div className={styles.summInfo}>
                <div>總付款金額</div>
                <div className="fw-bold text-danger">${totalPrice + totalShippingFee - (shippingDiscount + productDiscount)}</div>
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
                  <b>${totalPrice + totalShippingFee}</b>
                </span>
              </div>
              <div className={styles.subInfo}>總額${totalPrice + totalShippingFee} 折抵$0</div>
            </div>
            <button
              className={`btn btn-danger rounded-0 ${styles.checkoutBtn}`} onClick={handleSubmit}
            >
              下訂單
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
