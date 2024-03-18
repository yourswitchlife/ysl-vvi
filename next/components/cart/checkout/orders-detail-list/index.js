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
// 引入共同shipping鉤子
import { useShipping } from '@/hooks/use-shipping'

//使用SweetAlert2 API
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function OrdersDetailList() {
  const { cartItems } = useCart()
  const { shippingFees, shippingMethods, shippingInfos, setTotalShippingFee, handleShippingInfoUpdate, getFormatShippingInfos, totalShippingFee, shippingOptions } = useShipping()
  const { memberId, memberData } = useAuth()

  // 存放所有優惠券id
  const [coupons, setCoupons] = useState([])

  // 商品coupon_id暫存區
  const [tempSelectedProductCoupon, setTempSelectedProductCoupon] =
    useState(null)
  // 運費coupon_id暫存區
  const [tempSelectedShippingCoupon, setTempSelectedShippingCoupon] =
    useState(null)
  // 商品coupon_id存放區
  const [selectedProductCoupon, setSelectedProductCoupon] = useState(null)
  // 運費coupon_id存放區
  const [selectedShippingCoupon, setSelectedShippingCoupon] = useState(null)

  // 免運優惠券折抵金額
  const [shippingDiscount, setShippingDiscount] = useState(0)
  // 商品優惠券折抵金額
  const [productDiscount, setProductDiscount] = useState(0)

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

  useEffect(() => {
    const totalShippingFee = Object.values(shippingFees).reduce((total, fee) => total + fee, 0);
    setTotalShippingFee(totalShippingFee)
  }, [shippingFees])

  // 從子層傳來的每個物流方式狀態
  // const handleShippingMethodChange = (method) => {
  //   setShippingMethods((prevMethods) => ({
  //     ...prevMethods,
  //     ...method,
  //   }))
  // }

  // 計算商品總金額
  const getTotalPrice = () => {
    const filterItems = cartItems.filter((item) => item.userSelect === true)
    const total = filterItems.reduce((prices, item) => {
      return prices + item.quantity * item.price
    }, 0)
    setTotalPrice(total)
  }

  useEffect(() => {
    getTotalPrice()
  }, [cartItems])

  // 選擇的付款方式存在狀態裡
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    console.log('選擇的付款方式:', method)
  }

  // 從後端取得用戶可使用的優惠券列表
  useEffect(() => {
    if (memberData && memberData.id) {
      fetch(
        `http://localhost:3005/api/cart/get-coupons?memberId=${memberData.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setCoupons(data)
        })
        .catch((error) => console.error('取得會員優惠券失敗', error))
    }
  }, [memberData])

  // 檢查優惠券列表有沒有運費抵用券
  const hasFreeShippingCoupon = coupons.some((coupon) => coupon.id === 43)

  // 紀錄用戶暫存的優惠券
  const handleTempSelectProductCoupon = (coupon) => {
    setTempSelectedProductCoupon(coupon)
  }
  const handleTempSelectShippingCoupon = (coupon) => {
    setTempSelectedShippingCoupon(coupon)
  }

  // 確認選擇優惠券
  const handleConfirmSelection = () => {
    setSelectedProductCoupon(tempSelectedProductCoupon)
    setSelectedShippingCoupon(tempSelectedShippingCoupon)
    if (tempSelectedProductCoupon) {
      const productCoupon = coupons.find(
        (coupon) => coupon.id === tempSelectedProductCoupon
      )
      if (productCoupon) {
        handleSelectProductCoupon(productCoupon)
      }
    }

    if (tempSelectedShippingCoupon) {
      const shippingCoupon = coupons.find(
        (coupon) => coupon.id === tempSelectedShippingCoupon
      )
      if (shippingCoupon) {
        handleSelectShippingCoupon(shippingCoupon)
      }
    }
    handleCloseDesktopModal()
    handleCloseMobileModal()
  }

  useEffect(() => {
    const selectedCoupon = coupons.find(
      (coupon) => coupon.id === selectedShippingCoupon
    )
    if (selectedCoupon) {
      setShippingDiscount(totalShippingFee)
    }
  }, [totalShippingFee, selectedShippingCoupon, coupons])

  // 計算商品折扣金額
  const handleSelectProductCoupon = (coupon) => {
    const productDiscountPrice =
      coupon.discount_type === 'amount'
        ? coupon.discount_value
        : totalPrice - Math.round(totalPrice * (coupon.discount_value / 10))
    setProductDiscount(productDiscountPrice)
  }

  // 計算運費折扣金額
  const handleSelectShippingCoupon = (coupon) => {
    setShippingDiscount(totalShippingFee)
  }


  // 格式化優惠券到期日期
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  // 篩選出userSelect=true的商品
  const payingItems = cartItems.filter((item) => item.userSelect === true)
  const router = useRouter()

  // 檢查所有進入付款詳情的訂單是不是都選擇配送方式
  const allShippingMethodsSelected =
    Object.keys(shippingMethods).length === payingItems.length

  // 結帳完成移除購物車商品
  const handleCheckoutSuccess = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    const remainingItems = cartItems.filter((item) => !item.userSelect)
    localStorage.setItem('cartItems', JSON.stringify(remainingItems))
  }

  // 成功建立訂單後更新積分start
  const handleLevelPoint = async () => {
    try {
      const updateResponse = await fetch(
        `http://localhost:3005/api/member/levelup/?memberId=${memberId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalPrice }),
          credentials: 'include',
        }
      )

      if (!updateResponse.ok) {
        throw new Error('更新會員資料失敗')
      }
    } catch (error) {
      console.error('更新會員資料時發生錯誤:', error)
    }
  }
  // 成功建立訂單後更新積分END

  // 處理結帳 / 下訂單按鈕的送出連接後端產生訂單
  const handleSubmit = async () => {
    if (!paymentMethod) {
      alert('請選擇一個付款方式')
      return
    }

    // 如果用戶沒有選擇配送方式
    // const allhaveShippingMethod = payingItems.every((item) =>
    //   shippingMethods.hasOwnProperty(item.member_id)
    // )
    // if (!allhaveShippingMethod) {
    //   MySwal.fire({
    //     icon: 'warning',
    //     text: '請為所有訂單選擇配送方式',
    //     confirmButtonColor: '#E41E49',
    //   })
    //   return
    // }

    // 如果用戶沒有選取收件地址
    const allOrdersHaveShippngInfo = payingItems.every(item => !!(
      shippingInfos[item.member_id] &&
      shippingInfos[item.member_id].name &&
      shippingInfos[item.member_id].phone &&
      shippingInfos[item.member_id].address
    ))

    if (!allOrdersHaveShippngInfo) {
      MySwal.fire({
        icon: 'warning',
        text: '請為選有訂單選擇收件地址',
        confirmButtonColor: '#E41E49',
      })
      return
    }

    const formattedShippingInfos = getFormatShippingInfos(shippingInfos,shippingOptions)

    const orderData = {
      member_buyer_id: memberData.id,
      paymentMethod,
      items: payingItems,
      shipping_method: formattedShippingInfos,
      shippingDiscount,
      productDiscount,
      shippingInfos: shippingInfos,
      selectedProductCoupon,
      selectedShippingCoupon,
    }
    // console.log(orderData);

    try {
      console.log('建立訂單，付款方式:', paymentMethod)
      let url = 'http://localhost:3005/api/cart/create-order'
      fetch(url, {
        method: 'POST',
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
              const externalOrderIdForCash = results.externalOrderId
              fetch('http://localhost:3005/api/cart/cash', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  handleLevelPoint()
                  window.location.href = `/cart/purchase?orderId=${externalOrderIdForCash}`
                })
                .catch((error) => {
                  console.error('錯誤:', error)
                })
              break
            case '建立訂單成功，LINEPAY':
              const externalOrderIdForLinePay = results.externalOrderId
              // 導向LINE PAY後端處理
              fetch('http://localhost:3005/api/cart/line-pay', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...orderData, externalOrderId: externalOrderIdForLinePay }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  handleLevelPoint()
                  window.location.href = data
                })
                .catch((error) => {
                  console.error('錯誤:', error)
                })
              break
            case '建立訂單成功，信用卡':
              const externalOrderIdForCreditCard = results.externalOrderId
              // 導向後端處理
              fetch('http://localhost:3005/api/cart/credit-card', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  handleLevelPoint()
                  window.location.href = `/cart/purchase?orderId=${externalOrderIdForCreditCard}`
                })
                .catch((error) => {
                  console.error('錯誤:', error)
                })
              break
            default:
              console.log('未定義的付款方式')
          }
        })
        .catch((error) => {
          console.error('伺服器連線失敗:', error)
        })
    } catch (error) {
      console.error('訂單處理錯誤', error)
    }
  }

  return (
    <>
      <section className="container">
        <div className={styles.pcBg}>
          <div className={styles.mainTitle}>訂單詳情</div>
          {/* 單一賣場訂單 */}
          <OrderCheckout />
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
              <span
                className={`${styles.payBtn} ${paymentMethod === 1 ? styles.focus : ''
                  }`}
                data-payment="cash"
                onClick={() => handlePaymentMethodChange(1)}
              >
                貨到付款
              </span>
              <span
                className={`${styles.payBtn} ${paymentMethod === 3 ? styles.focus : ''
                  }`}
                data-payment="credit-card"
                onClick={() => handlePaymentMethodChange(3)}
              >
                信用卡付款
              </span>
              <span
                className={`${styles.linePay} ${paymentMethod === 2 ? styles.focus : ''
                  }`}
                data-payment="line-pay"
                onClick={() => handlePaymentMethodChange(2)}
              >
                <Image
                  src="/images/cart/LINE-Pay(h)_W238_n.png"
                  width={75}
                  height={22}
                  alt="LINE PAY"
                />
              </span>
            </div>
            {/* LINEPAY 及信用卡付款才顯示的提醒 */}
            <div className={styles.sub}>未完成付款請勿離開結帳頁面</div>
          </div>
          <div className="border-bottom border-3 border-light py-2">
            <div className={styles.useDiscountBar}>
              <div className={styles.mainText} onClick={handleShowDesktopModal}>
                選擇使用優惠券 <FaAngleRight />
              </div>
              <Modal show={showDesktopModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                  <Modal.Title className={styles.couponHeader}>
                    選擇優惠券
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className={styles.productFrame}>
                    <div className={styles.title}>
                      <div className={styles.text}>商品抵用券</div>
                      <FaCircleInfo className={styles.icon} />
                    </div>
                    <div className={styles.couponBody}>
                      {coupons
                        .filter((coupon) => coupon.id !== 43)
                        .map((coupon) => {
                          {
                            /* 判斷優惠券是否達到使用條件門檻 */
                          }
                          const isReach = totalPrice >= coupon.price_rule
                          return (
                            <div
                              className={`${styles.coupon} ${isReach ? '' : styles.disabledCoupon
                                }`}
                              key={coupon.id}
                            >
                              {/* 勾選框框 */}
                              <div className={styles.radioBar}>
                                <input
                                  className={`form-check-input ${styles.radioBox}`}
                                  type="radio"
                                  name="p-coupon"
                                  value={coupon.id}
                                  checked={
                                    tempSelectedProductCoupon === coupon.id
                                  }
                                  onChange={() =>
                                    handleTempSelectProductCoupon(coupon.id)
                                  }
                                  disabled={!isReach}
                                />
                              </div>
                              {/* 優惠券icon圖 */}
                              <div className={styles.iconFrame}>
                                <div className={styles.iconCircle}>
                                  <FaGamepad className={styles.icon} />
                                  <div className={styles.text}>遊戲優惠</div>
                                </div>
                              </div>
                              {/* 商品優惠券詳細資訊 */}
                              <div className={styles.couponInfoFrame}>
                                {coupon.discount_value > 9 ? (
                                  <>
                                    <div className={styles.mainText}>
                                      折抵 ${coupon.discount_value}{' '}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className={styles.mainText}>
                                      折抵 {coupon.discount_value}折{' '}
                                    </div>
                                  </>
                                )}

                                <div className={styles.mainText}>
                                  適用於全站 ，消費滿 ${coupon.price_rule}
                                </div>
                                <div className={styles.sub}>
                                  優惠券將於{' '}
                                  {formatDate(coupon.expiration_date)} 到期
                                </div>
                                {/* 如果都沒有達到優惠券門檻 */}
                                {!isReach && (
                                  <div className={styles.disabledAlert}>
                                    未達優惠券使用條件
                                  </div>
                                )}
                                <div className={styles.rule}>使用規則</div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                  <div className={styles.deliveryFrame}>
                    <div className={styles.title}>
                      <div className={styles.text}>運費抵用券</div>
                      <FaCircleInfo className={styles.icon} />
                    </div>
                    <div className={styles.couponBody}>
                      {!allShippingMethodsSelected ? (
                        // 如果用戶沒有為所有訂單選擇配送方式
                        <div>請先選擇所有訂單的配送方式</div>
                      ) : !hasFreeShippingCoupon ? (
                        <div>目前沒有運費抵用券可使用</div>
                      ) : (
                        <>
                          {coupons
                            .filter((coupon) => coupon.id === 43)
                            .map((coupon) => (
                              <div className={styles.coupon} key={coupon.id}>
                                {/* 勾選框框 */}
                                <div className={styles.radioBar}>
                                  <input
                                    className={`form-check-input ${styles.radioBox}`}
                                    type="radio"
                                    name="d-coupon"
                                    value={coupon.id}
                                    checked={
                                      tempSelectedShippingCoupon === coupon.id
                                    }
                                    onChange={() =>
                                      handleTempSelectShippingCoupon(coupon.id)
                                    }
                                    disabled={!allShippingMethodsSelected}
                                  />
                                </div>
                                {/* 優惠券icon圖 */}
                                <div className={styles.iconFrame}>
                                  <div className={styles.iconCircle}>
                                    <FaShippingFast className={styles.icon} />
                                    <div className={styles.text}>運費優惠</div>
                                  </div>
                                </div>
                                {/* 優惠券詳細資訊  */}
                                <div className={styles.couponInfoFrame}>
                                  <div className={styles.mainText}>
                                    訂單免運折抵
                                  </div>
                                  <div className={styles.mainText}>
                                    適用於全站
                                  </div>
                                  <div className={styles.sub}>
                                    優惠券將於{' '}
                                    {formatDate(coupon.expiration_date)} 到期
                                  </div>
                                  <div className={styles.rule}>使用規則</div>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDesktopModal}>
                    取消
                  </Button>
                  <Button variant="danger" onClick={handleConfirmSelection}>
                    完成
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* <div className={styles.divider}></div> */}
              <div className={styles.discountListBtn}>
                <div className={styles.couponInfo}>
                  <div className={styles.mainTitle}>完整折扣細節</div>
                  <div className={styles.line}></div>
                  <div>
                    {/* 顯示商品折抵細節 */}
                    {selectedProductCoupon && (
                      <div className={styles.item}>
                        <Image src={couponStar} className={styles.icon} />
                        {coupons
                          .filter(
                            (coupon) => coupon.id === selectedProductCoupon
                          )
                          .map((coupon) => (
                            <div key={coupon.id}>
                              {coupon.name} 全站消費滿${coupon.price_rule} 折抵
                              {coupon.discount_value > 9
                                ? `$${coupon.discount_value}`
                                : `${coupon.discount_value}折`}
                              (每人限用一次)
                            </div>
                          ))}
                      </div>
                    )}
                    {/* 顯示運費折抵細節 */}
                    {selectedShippingCoupon && (
                      <div className={styles.item}>
                        <Image src={couponStar} className={styles.icon} />
                        {coupons
                          .filter(
                            (coupon) => coupon.id === selectedShippingCoupon
                          )
                          .map((coupon) => (
                            <div key={coupon.id}>
                              運費免運全額折抵，全站適用
                            </div>
                          ))}
                      </div>
                    )}
                    {/* 如果没有選擇任何優惠券 */}
                    {!selectedProductCoupon && !selectedShippingCoupon && (
                      <div className={styles.noCouponUsed}>
                        未使用任何優惠券
                      </div>
                    )}
                  </div>
                </div>
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
                <div className="text-danger">
                  $
                  {totalPrice +
                    totalShippingFee -
                    (shippingDiscount + productDiscount)}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.payBtnBar}>
            <button
              className={`btn btn-danger ${styles.btnPay}`}
              onClick={handleSubmit}
            >
              結帳
            </button>
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
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className={styles.mainText}
                  onClick={handleShowMobileModal}
                >
                  選擇使用優惠券
                </div>
                <FaAngleRight className="text-white" />
              </div>
              <Modal show={showMobileModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                  <Modal.Title className={styles.couponHeader}>
                    選擇優惠券
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className={styles.productFrame}>
                    <div className={styles.title}>
                      <div className={styles.text}>商品抵用券</div>
                      <FaCircleInfo className={styles.icon} />
                    </div>
                    <div className={styles.couponBody}>
                      {coupons
                        .filter((coupon) => coupon.id !== 43)
                        .map((coupon) => {
                          {
                            /* 判斷優惠券是否達到使用條件門檻 */
                          }
                          const isReach = totalPrice >= coupon.price_rule
                          return (
                            <div
                              className={`${styles.coupon} ${isReach ? '' : styles.disabledCoupon
                                }`}
                              key={coupon.id}
                            >
                              {/* 勾選框框 */}
                              <div className={styles.radioBar}>
                                <input
                                  className={`form-check-input ${styles.radioBox}`}
                                  type="radio"
                                  name="p-coupon"
                                  value={coupon.id}
                                  checked={
                                    tempSelectedProductCoupon === coupon.id
                                  }
                                  onChange={() =>
                                    handleTempSelectProductCoupon(coupon.id)
                                  }
                                  disabled={!isReach}
                                />
                              </div>
                              {/* 優惠券icon圖 */}
                              <div className={styles.iconFrame}>
                                <div className={styles.iconCircle}>
                                  <FaGamepad className={styles.icon} />
                                  <div className={styles.text}>遊戲優惠</div>
                                </div>
                              </div>
                              {/* 商品優惠券詳細資訊 */}
                              <div className={styles.couponInfoFrame}>
                                {coupon.discount_value > 9 ? (
                                  <>
                                    <div className={styles.mainText}>
                                      折抵 ${coupon.discount_value}{' '}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className={styles.mainText}>
                                      折抵 {coupon.discount_value}折{' '}
                                    </div>
                                  </>
                                )}

                                <div className={styles.mainText}>
                                  適用於全站 ，消費滿 ${coupon.price_rule}
                                </div>
                                <div className={styles.sub}>
                                  優惠券將於{' '}
                                  {formatDate(coupon.expiration_date)} 到期
                                </div>
                                {/* 如果都沒有達到優惠券門檻 */}
                                {!isReach && (
                                  <div className={styles.disabledAlert}>
                                    未達優惠券使用條件
                                  </div>
                                )}
                                <div className={styles.rule}>使用規則</div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                  <div className={styles.deliveryFrame}>
                    <div className={styles.title}>
                      <div className={styles.text}>運費抵用券</div>
                      <FaCircleInfo className={styles.icon} />
                    </div>
                    <div className={styles.couponBody}>
                      {!allShippingMethodsSelected ? (
                        // 如果用戶沒有為所有訂單選擇配送方式
                        <div>請先選擇所有訂單的配送方式</div>
                      ) : !hasFreeShippingCoupon ? (
                        <div>目前沒有運費抵用券可使用</div>
                      ) : (
                        <>
                          {coupons
                            .filter((coupon) => coupon.id === 43)
                            .map((coupon) => (
                              <div className={styles.coupon} key={coupon.id}>
                                {/* 勾選框框 */}
                                <div className={styles.radioBar}>
                                  <input
                                    className={`form-check-input ${styles.radioBox}`}
                                    type="radio"
                                    name="d-coupon"
                                    value={coupon.id}
                                    checked={
                                      tempSelectedShippingCoupon === coupon.id
                                    }
                                    onChange={() =>
                                      handleTempSelectShippingCoupon(coupon.id)
                                    }
                                    disabled={!allShippingMethodsSelected}
                                  />
                                </div>
                                {/* 優惠券icon圖 */}
                                <div className={styles.iconFrame}>
                                  <div className={styles.iconCircle}>
                                    <FaShippingFast className={styles.icon} />
                                    <div className={styles.text}>運費優惠</div>
                                  </div>
                                </div>
                                {/* 優惠券詳細資訊  */}
                                <div className={styles.couponInfoFrame}>
                                  <div className={styles.mainText}>
                                    訂單免運折抵
                                  </div>
                                  <div className={styles.mainText}>
                                    適用於全站
                                  </div>
                                  <div className={styles.sub}>
                                    優惠券將於{' '}
                                    {formatDate(coupon.expiration_date)} 到期
                                  </div>
                                  <div className={styles.rule}>使用規則</div>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMobileModal}>
                    取消
                  </Button>
                  <Button variant="danger" onClick={handleConfirmSelection}>
                    完成
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            {/* 顯示完整優惠折抵區塊 */}
            {/* <div className={styles.paymentItem}>
              <div className={styles.title}>
                <Image src={coupon} />
                <div className={`text-body-secondary ${styles.subtext}`}>
                  已折抵 ${shippingDiscount + productDiscount}
                </div>
              </div>
              <div className={`text-body-secondary ${styles.subtext}`}>
                顯示完整折扣細節
              </div>
            </div> */}
            {/*完整優惠折抵細節  */}
            <div className={styles.couponInfo}>
              <div className={styles.mainTitle}>完整折扣細節</div>
              <div className={styles.line}></div>
              <div>
                {/* 顯示商品折抵細節 */}
                {selectedProductCoupon && (
                  <div className={styles.item}>
                    <Image src={couponStar} className={styles.icon} />
                    {coupons
                      .filter((coupon) => coupon.id === selectedProductCoupon)
                      .map((coupon) => (
                        <div key={coupon.id}>
                          {coupon.name} 全站消費滿${coupon.price_rule} 折抵$
                          {coupon.discount_value} (每人限用一次)
                        </div>
                      ))}
                  </div>
                )}
                {/* 顯示運費折抵細節 */}
                {selectedShippingCoupon && (
                  <div className={styles.item}>
                    <Image src={couponStar} className={styles.icon} />
                    {coupons
                      .filter((coupon) => coupon.id === selectedShippingCoupon)
                      .map((coupon) => (
                        <div key={coupon.id}>運費免運全額折抵，全站適用</div>
                      ))}
                  </div>
                )}
                {/* 如果没有選擇任何優惠券 */}
                {!selectedProductCoupon && !selectedShippingCoupon && (
                  <div className={styles.noCouponUsed}>未使用任何優惠券</div>
                )}
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
                  <span className={styles.linePay}>LINE PAY</span>
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
                <div className="fw-bold text-danger">
                  $
                  {totalPrice +
                    totalShippingFee -
                    (shippingDiscount + productDiscount)}
                </div>
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
                  <b>
                    $
                    {totalPrice +
                      totalShippingFee -
                      (shippingDiscount + productDiscount)}
                  </b>
                </span>
              </div>
              <div className={styles.subInfo}>
                總額${totalPrice + totalShippingFee} 折抵$
                {productDiscount + shippingDiscount}
              </div>
            </div>
            <button
              className={`btn btn-danger rounded-0 ${styles.checkoutBtn}`}
              onClick={handleSubmit}
            >
              下訂單
            </button>
          </div>
        </div>
      </div>
    </>
  )
}