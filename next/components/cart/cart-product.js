import React from 'react'
import styles from '../cart/order-list.module.scss'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link'
import Image from 'next/image'

// 收藏愛心空心圖
import heart from '@/public/images/cart/heart.svg'
// 收藏愛心實心圖
import heartFill from '@/public/images/cart/heart-fill.svg'
// 收藏愛心hover圖
import heartHover from '@/public/images/cart/heart-hover.svg'

export default function SingleProduct() {
  return (
    <>
      <div className={styles.product}>
        <IoClose className={styles.delIcon} />
        {/* 勾選框框 */}
        <div className={styles.checkBoxBar}>
          <input
            className={`form-check-input ${styles.checkBox}`}
            type="checkbox"
            value=""
          />
        </div>
        {/* 手機板商品圖 */}
        <Link href="" className={styles.pImgMobile}>
          <Image
            src="/images/cart/product.png"
            width={65}
            height={105}
            layout="fixed"
            alt=""
          />
        </Link>
        <div className={styles.pInfoMobile}>
          {/* 商品名稱、加入收藏 */}
          <div className={styles.pInfoBar}>
            <div className="d-flex">
              <Link href="" className={styles.pImg}>
                <Image
                  src="/images/cart/product.png"
                  width={85}
                  height={140}
                  layout="fixed"
                  alt=""
                />
              </Link>
              <div className={styles.pInfo}>
                <div className={styles.pInfoTop}>
                  <Link href="" className={styles.pName}>
                    PUI PUI 天竺鼠車車 一起來！天竺鼠車車派對！
                  </Link>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className={styles.language}>中文版</h6>
                    <h6 className={styles.discount}>8折</h6>
                  </div>
                </div>
                <div className={styles.pInfoBottom}>
                  <Image src={heart} className={styles.icon} />
                  <h6 className={styles.text}>加入收藏清單</h6>
                </div>
              </div>
            </div>
          </div>
          {/* 商品金額 */}
          <div className={styles.priceBar}>
            <div className="d-flex flex-wrap">
              <span className={`d-none ${styles.price}`}>$1200</span>
              <span className={styles.prePrice}>$1200</span>
              <span className={styles.discountPrice}>$960</span>
            </div>
          </div>
          {/* 購買數量控制按鈕 */}
          <div className={styles.controlBar}>
            <div className={styles.control}>
              <div className={styles.btnMinus}>
                <FaMinus />
              </div>
              <input
                type="text"
                role="spinbutton"
                aria-valuenow="1"
                value="1"
                className={styles.amount}
              />
              <div className={styles.btnPlus}>
                <FaPlus />
              </div>
            </div>
          </div>
          {/* 總金額 */}
          <div className={styles.totalBar}>
            <span className={styles.text}>總金額：</span>
            <span className={styles.total}>$1920</span>
          </div>
        </div>
      </div>
    </>
  )
}
