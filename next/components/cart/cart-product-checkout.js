import React from 'react'
import styles from '@/components/cart/order-detail.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function CartProductConfirm() {
  return (
    <>
      <div className={styles.product}>
        {/* 手機板商品圖 */}
        <Link href="" className={styles.pImgMobile}>
          <Image
            src="https://tshop.r10s.com/9d8/189/0ce7/b2d8/4078/5eba/1119/1117eb82f60242ac110006.jpg"
            width={65}
            height={105}
            layout="fixed"
            alt=""
          />
        </Link>
        <div className={styles.pInfoFrame}>
          {/* 商品名稱*/}
          <div className={`${styles.pInfoBar} ${styles.pb}`}>
            <div className="d-flex">
              <Link href="" className={styles.pImg}>
                <Image
                  src="https://tshop.r10s.com/9d8/189/0ce7/b2d8/4078/5eba/1119/1117eb82f60242ac110006.jpg"
                  width={85}
                  height={140}
                  layout="fixed"
                  alt=""
                />
              </Link>
              <div className={styles.pDetailFrame}>
                <div className={styles.pNameMobile}>
                  <Link href="" className={styles.pName}>
                    PUI PUI 天竺鼠車車 一起來！天竺鼠車車派對！
                  </Link>
                  <h6 className={styles.language}>中文版</h6>
                </div>
                <h6 className={styles.discount}>8折</h6>
                <div className={styles.priceQuanMobile}>
                  {/* 商品金額 */}
                  <div className={styles.priceBar}>
                    <span className={`d-none ${styles.price}`}>$1200</span>
                    <span className={styles.prePrice}>$1200</span>
                    <span className={styles.discountPrice}>$960</span>
                  </div>
                  {/* 購買數量 */}
                  <div className={styles.control}>x 1</div>
                </div>
              </div>
            </div>
          </div>
          {/* 商品金額 */}
          <div className={`${styles.priceBar} ${styles.ab}`}>
            <span className={`d-none ${styles.price}`}>$1200</span>
            <span className={styles.prePrice}>$1200</span>
            <span className={styles.discountPrice}>$960</span>
          </div>
          {/* 購買數量 */}
          <div className={`${styles.control} ${styles.qb}`}>1</div>

          {/* 總金額 */}
          <div className={`${styles.totalBar} ${styles.sb}`}>
            <span className={styles.total}>$1920</span>
          </div>
        </div>
      </div>
    </>
  )
}
