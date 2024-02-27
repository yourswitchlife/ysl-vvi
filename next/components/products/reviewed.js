import React from 'react'
import Buyer from './buyer'
import Image from 'next/image'
import RatingStars from './rating-stars'
import styles from '../../styles/products/product-detail.module.scss'

export default function Reviewed() {
  return (
    <>
      <Buyer></Buyer>
      <div className="d-flex justify-content-between">
        <div>
          <RatingStars />
          <div className="tages mb-2 mt-2">
            <span class="badge rounded-pill text-bg-primary p">運送快速</span>
            <span class="badge rounded-pill text-bg-primary ms-2 me-2 p">
              服務貼心
            </span>
            <span class="badge rounded-pill text-bg-primary p">符合期望</span>
          </div>
          <h6 className="text-white py-2">
            實在太好玩啦！實在太好玩啦！實在太好玩啦！終於入手這片了
          </h6>
        </div>

        <div className={`${styles.reviewImg} d-flex`}>
          <div className={styles.h100100px}>
            <Image
              src="/images/product/reviewed.webp"
              alt="product"
              width={100}
              height={100}
              priority={true}
              className={styles.objFit}
            />
          </div>
          <div className={styles.h100100px}>
            <Image
              src="/images/product/HOPSTEPDANCE.jpg"
              alt="product"
              width={100}
              height={100}
              priority={true}
              className={styles.objFit}
            />
          </div>
        </div>
      </div>
      <hr className="text-white border-3 my-3" />
    </>
  )
}
