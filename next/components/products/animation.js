import React from 'react'
import styles from '../../styles/products/products.module.scss'
import Image from 'next/image'

export default function Animation() {
  return (
    <>
    <div className={`d-flex z-3 position-absolute ${styles.wrap}`}>
      <div className={styles.aniBlue}></div>
      <div className={styles.aniRed}></div>
      </div>
      <Image
        src="/images/product/p-index.jpg"
        alt="product"
        width={1440}
        height={560}
        priority={true}
        className={`${styles.pIndexImg}`}
      />
    </>
  )
}
