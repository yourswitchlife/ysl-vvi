import { useState, useEffect } from 'react'
import styles from '../orders-detail.module.scss'
import ProductCheckout from './product-checkout'
import DeliveryCheckout from './delivery-checkout'
import { FaShopify } from 'react-icons/fa'

// 引用use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function OrderCheckout() {
  const { cartItems } = useCart()

  const [shopName, setShopName] = useState({})

  // 篩選出userSelect=true的商品
  const payingItems = cartItems.filter((item) => item.userSelect === true)
  console.log(payingItems)

  // 根據商品的memberId進行訂單分組
  const orderGroup = payingItems.reduce((group, item) => {
    const { member_id } = item
    group[member_id] = group[member_id] || []
    group[member_id].push(item)
    return group
  }, {})

  console.log(orderGroup)

  // 對應連線server端取得賣場名稱
  useEffect(() => {
    // console.log(cartItems)
    const memberIds = payingItems.map((item) => item.member_id).join(',')
    if (memberIds) {
      fetch(`http://localhost:3005/api/cart/shop-names?memberIds=${memberIds}`)
        .then((response) => response.json())
        .then((data) => {
          setShopName(data)
          console.log(data)
        })
        .catch((error) => console.error('取得賣場名稱失敗', error))
    } else {
      console.log('沒有可查詢的memberIds') // 當沒有有效的memberIds時提供反饋
    }
  }, [cartItems])

  return (
    <>
      {Object.entries(orderGroup).map(([member_id, items]) => {
        return (
          <div key={member_id} className={styles.orderList}>
            {/* 單一賣場購買商品清單 */}
            <div className={styles.topFrame}>
              <div className={styles.shop}>
                <div className={styles.shopName}>
                  <FaShopify className={styles.icon} />
                  <h5>
                    <b>{shopName[member_id]}</b>
                  </h5>
                </div>
              </div>

              <div className={styles.listFrame}>
                <div className={`${styles.list} ${styles.pb}`}></div>
                <div className={`${styles.list} ${styles.ab}`}>單價</div>
                <div className={`${styles.list} ${styles.qb}`}>數量</div>
                <div className={`${styles.list} ${styles.sb}`}>總價</div>
              </div>
              <div className={styles.pContainer}>
                {/* 商品 */}
                {items.map((item) => 
                  <ProductCheckout key={item.id} item={item} />
                )}
              </div>
            </div>
            <div className={styles.deliveryContainer}>
              {/* 寄送資訊、收件資訊 */}
              <DeliveryCheckout />
            </div>
          </div>
        )
      })}
    </>
  )
}
