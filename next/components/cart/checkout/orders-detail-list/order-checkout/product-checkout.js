import React from 'react'
import styles from '../orders-detail.module.scss'
import Link from 'next/link'
import Image from 'next/image'

// 引用use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function ProductCheckout({ item }) {
  const { totalProducts, totalPrice } = useCart()

  return (
    <>
      <div className={styles.product} key={item.id}>
        {/* 手機板商品圖 */}
        <Link href="" className={styles.pImgMobile}>
          <Image
            src={`/images/product/cover/${item.cover}`}
            width={65}
            height={105}
            layout="fixed"
            alt={item.name}
          />
        </Link>
        <div className={styles.pInfoFrame}>
          {/* 商品名稱*/}
          <div className={`${styles.pInfoBar} ${styles.pb}`}>
            <div className="d-flex">
              <Link href="" className={styles.pImg}>
                <Image
                  src={`/images/product/cover/${item.cover}`}
                  width={85}
                  height={140}
                  layout="fixed"
                  alt={item.name}
                />
              </Link>
              <div className={styles.pDetailFrame}>
                <div className={styles.pNameMobile}>
                  <Link href="" className={styles.pName}>
                    {item.name}
                  </Link>
                  <h6 className={styles.language}>中文版</h6>
                </div>
                {item.displayPrice ? (
                  <>
                    <h6 className={styles.discount}>
                      {Math.round((item.price / item.displayPrice) * 10)}折
                    </h6>
                  </>
                ) : (
                  <></>
                )}
                <div className={styles.priceQuanMobile}>
                  {/* 商品金額 */}
                  <div className={styles.priceBar}>
                    {item.displayPrice ? (
                      <>
                        <span className={styles.prePrice}>
                          ${item.displayPrice}
                        </span>
                        <span className={styles.discountPrice}>
                          ${item.price}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={`${styles.price}`}>${item.price}</span>
                      </>
                    )}
                  </div>
                  {/* 購買數量 */}
                  <div className={styles.control}>x {item.quantity}</div>
                </div>
              </div>
            </div>
          </div>
          {/* 商品金額 */}
          <div className={`${styles.priceBar} ${styles.ab}`}>
            {item.displayPrice ? (
              <>
                <span className={styles.prePrice}>${item.displayPrice}</span>
                <span className={styles.discountPrice}>${item.price}</span>
              </>
            ) : (
              <>
                <span className={`${styles.price}`}>${item.price}</span>
              </>
            )}
          </div>
          {/* 購買數量 */}
          <div className={`${styles.control} ${styles.qb}`}>
            {item.quantity}
          </div>

          {/* 總金額 */}
          <div className={`${styles.totalBar} ${styles.sb}`}>
            <span className={styles.total}>$1920</span>
          </div>
        </div>
      </div>
    </>
  )
}
