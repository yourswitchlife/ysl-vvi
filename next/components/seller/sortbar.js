import React from 'react'
import Link from 'next/link'
import styles from '@/components/seller/seller.module.scss'

export default function Sortbar() {
  return (
    <>
      <div className={`${styles.sortbarStyle}`}>
        <Link href="/seller/shop" className={styles.sortbar}>
          <h5 className={`d-none d-md-block ${styles.list}`}>賣場首頁</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>賣場首頁</h6>
        </Link>
        <Link href="/shop" className={styles.sortbar}>
          <h5 className={`d-none d-md-block ${styles.list}`}>所有商品</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>所有商品</h6>
        </Link>
        <Link href="/shop" className={styles.sortbar}>
          <h5 className={`d-none d-md-block ${styles.list}`}>最新上架</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>最新上架</h6>
        </Link>
        <Link href="/seller/shop" className={styles.sortbar}>
          <h5 className={`d-none d-md-block ${styles.list}`}>期間優惠</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>期間優惠</h6>
        </Link>
        <Link href="/shop" className={styles.sortbar}>
          <h5 className={`d-none d-md-block ${styles.list}`}>熱銷排行</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>熱銷排行</h6>
        </Link>
      </div>
    </>
  )
}
