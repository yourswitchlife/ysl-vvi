import React, { useState } from 'react'
import styles from '../order-list.module.scss'
import { FaPlus, FaMinus, FaHeart, FaRegHeart } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link'
import Image from 'next/image'

// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

// 收藏愛心空心圖
import heartIcon from '@/assets/heart.svg'

export default function ProductCard({ isEditing, item }) {
  // console.log(item)
  const { cartItems, increment, decrement, handleCheckboxChange, notifyAlert, changeLanguage } =
    useCart()

  return (
    <>
      <div className={styles.product} key={item.id}>
        <IoClose
          className={styles.delIcon}
          onClick={() => {
            notifyAlert(item.name, item.id)
          }}
        />
        {/* 勾選框框 */}
        <div className={styles.checkBoxBar}>
          <input
            className={`form-check-input ${styles.checkBox}`}
            type="checkbox"
            checked={item.userSelect}
            value={item}
            onChange={() => {
              handleCheckboxChange(cartItems, item.id)
            }}
          />
        </div>
        {/* 手機板商品圖 */}
        <Link href="" className={styles.pImgMobile}>
          <Image
            src={`http://localhost:3005/productImg/cover/${item.img_cover}`}
            width={65}
            height={105}
            alt={item.name}
          />
        </Link>
        <div className={styles.pInfoFrame}>
          {/* 商品名稱、加入收藏 */}
          <div className={styles.pInfoBar}>
            <div className="d-flex">
              <Link href="" className={styles.pImg}>
                <Image
                  src={`http://localhost:3005/productImg/cover/${item.img_cover}`}
                  width={85}
                  height={140}
                  alt=""
                />
              </Link>
              <div className={styles.pInfo}>
                <div className={styles.pInfoTop}>
                  <Link href="" className={styles.pName}>
                    {item.name}
                  </Link>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className={styles.language}>{changeLanguage(item.language)}版</h6>
                    {item.display_price > item.price ? (
                      <>
                        <h6 className={styles.discount}>
                          {Math.round((item.price / item.display_price) * 10)}折
                        </h6>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {/* <div className={styles.pInfoBottom}>
                  <Image src={heartIcon} className={styles.icon} />
                  <h6 className={styles.text}>加入收藏清單</h6>
                </div> */}
              </div>
            </div>
          </div>
          {/* 商品金額 */}
          <div className={styles.priceBar}>
            <div className="d-flex flex-wrap">
              {item.display_price > item.price ? (
                <>
                  <span className={styles.prePrice}>${item.display_price}</span>
                  <span className={styles.discountPrice}>${item.price}</span>
                </>
              ) : (
                <>
                  <span className={`${styles.price}`}>${item.price}</span>
                </>
              )}
            </div>
          </div>
          {isEditing ? (
            <>
              {/* 當手機版點擊編輯出現 */}
              <div className={styles.editBtn}>
                {/* <button type="button" className="btn btn-sm btn-danger">
                  <FaHeart />
                </button> */}
                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  onClick={() => {
                    notifyAlert(item.name, item.id)
                  }}
                >
                  刪除
                </button>
              </div>
            </>
          ) : (
            <>
              {/* 購買數量控制按鈕 */}
              <div className={styles.controlBar}>
                <div className={styles.control}>
                  <div
                    className={styles.btnMinus}
                    onClick={() => {
                      decrement(cartItems, item.id)
                    }}
                  >
                    <FaMinus />
                  </div>
                  <div className={styles.amount}>{item.quantity}</div>
                  <div
                    className={styles.btnPlus}
                    onClick={() => {
                      increment(cartItems, item)
                    }}
                  >
                    <FaPlus />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 總金額 */}
          <div className={styles.totalBar}>
            <span className={styles.text}>總金額：</span>
            <span className={styles.total}>${item.price * item.quantity}</span>
          </div>
        </div>
      </div>
    </>
  )
}
