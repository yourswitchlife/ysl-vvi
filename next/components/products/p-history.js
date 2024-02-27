import React from 'react'
import styles from '@/styles/products/product-detail.module.scss'
import Image from 'next/image'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6'

export default function PHistory() {
  return (
    <>
      <h6 className={`text-white text-center ${styles.f14}`}>瀏覽紀錄</h6>

      <div className={`text-white-50 d-flex justify-content-center align-items-center ${styles.historyUpDown}`}>
        <FaAngleUp />
      </div>
      <div className={`my-2 ${styles.h100px}`}>
        <Image
          src="/images//product/cover/BigBrainAcademy.jpg"
          alt="product"
          width={450}
          height={250}
          priority={true}
          className={styles.objFit}
        />
      </div>
      <div className={`my-2 ${styles.h100px}`}>
        <Image
          src="/images//product/cover/BigBrainAcademy.jpg"
          alt="product"
          width={450}
          height={250}
          priority={true}
          className={styles.objFit}
        />
      </div>
      <div className={`my-2 ${styles.h100px}`}>
        <Image
          src="/images//product/cover/BigBrainAcademy.jpg"
          alt="product"
          width={450}
          height={250}
          priority={true}
          className={styles.objFit}
        />
      </div>
      <div className={`text-white-50 d-flex justify-content-center align-items-center ${styles.historyUpDown}`}>
        <FaAngleDown />
      </div>
    </>
  )
}
