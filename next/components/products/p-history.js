import React, { useEffect, useState } from 'react'
import styles from '@/styles/products/product-detail.module.scss'
import Image from 'next/image'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6'
import Link from 'next/link'

export default function PHistory({ historyRecords }) {

  // 改變歷史紀錄圖位置
  const scrollContent = (distance) => {
    const element = document.querySelector('#scrollableContent')
    element.scrollTop += distance
  }

  return (
    <>
      <h6 className={`text-white text-center ${styles.f14}`}>瀏覽紀錄</h6>

      <div
        className={`text-white-50 d-flex justify-content-center align-items-center ${styles.historyUpDown}`}
        onClick={() => scrollContent(-108)}
      >
        <FaAngleUp />
      </div>
      <div
      id="scrollableContent"
        style={{ height: '332px', overflow: 'scroll' }}
      >
          {historyRecords.map((v, i) => {
            return (
              <Link key={i} href={`/products/${v.id}`}>
                <div className={`my-2 ${styles.h100px}`}>
                  <Image
                    src={`/images/product/cover/${v.img_cover}`}
                    alt="product"
                    width={450}
                    height={250}
                    priority={true}
                    className={styles.objFit}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      <div
        className={`text-white-50 d-flex justify-content-center align-items-center ${styles.historyUpDown}`}
        onClick={() => scrollContent(108)}
      >
        <FaAngleDown />
      </div>
    </>
  )
}
