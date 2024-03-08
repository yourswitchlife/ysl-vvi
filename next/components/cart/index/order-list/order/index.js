import React, { useEffect, useState } from 'react'
import styles from '../order-list.module.scss'
import ProductCard from './product-card'
import { FaShopify, FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'

// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'


export default function Order() {
  const { cartItems, setCartItems, notifyOrder } = useCart()

  const [shopName, setShopName] = useState({})

  // 根據商品的memberId進行訂單分組
  const orderGroup = cartItems.reduce((group, item) => {
    const { member_id } = item
    group[member_id] = group[member_id] || []
    group[member_id].push(item)
    return group
  }, {})

  console.log(orderGroup)

  // 對應連線server端取得賣場名稱
  useEffect(() => {
    // console.log(cartItems)
    const memberIds = cartItems.map((item) => item.member_id).join(',')
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

  // 手機版編輯按鈕切換
  const [isEditing, setisEditing] = useState(false)

  const toggleEdit = () => {
    setisEditing(!isEditing)
  }

  const handleShopSelect = (member_id, checked) => {
    console.log(member_id,checked)
    console.log(cartItems)
    const updatedCartItems = cartItems.map((item) => {
     
      if (String(item.member_id) === String(member_id)) {
        return { ...item, userSelect: checked };
        //return { ...item, userSelect: !orderGroup[member_id].every(item => item.userSelect) };
      }
      return item;
    });
    console.log(updatedCartItems)
    setCartItems(updatedCartItems);
  };



  return (
    <>
      {/* 單一賣場訂單 */}
      {Object.entries(orderGroup).map(([member_id, items]) => {
        console.log(orderGroup[member_id])
        return (
          <div key={member_id} className={styles.orderList}>
            {/* 單一賣場購買商品清單 */}
            <div className={styles.shop}>
              <div className={styles.shopNameFrame}>
                {/* 賣場勾選框框 */}
                <div className={styles.checkBoxBar}>
                  <input
                    className={`form-check-input ${styles.checkBox}`}
                    type="checkbox"
                    checked={items.every((item) => item.userSelect)}
                    onChange={(e) => handleShopSelect(member_id, e.target.checked)}
                  />

                </div>
                <div className={styles.shopName}>
                  <FaShopify className={styles.icon} />
                  <h5>
                    <b>{shopName[member_id]}</b>
                  </h5>
                </div>
              </div>
              {/* 電腦版垃圾桶 */}
              <FaTrashAlt
                className={styles.trasgIcon}
                onClick={() => {
                  notifyOrder(Number(member_id))
                }}
              />
              {/* 手機板編輯 */}
              <div className={styles.editBar} onClick={toggleEdit}>
                {isEditing ? (
                  <>
                    <FaCheck className="text-info" />
                    <span className={`${styles.text} text-info`}>完成</span>
                  </>
                ) : (
                  <>
                    <FaRegEdit />
                    <span className={styles.text}>編輯</span>
                  </>
                )}
              </div>
            </div>
            <div className={styles.pContainer}>
              {items.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isEditing={isEditing}
                />
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}
