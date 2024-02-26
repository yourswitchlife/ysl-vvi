import React from 'react'
import styles from '@/components/seller/seller.module.scss'
import ProductList from '../products/product-list'
export default function Hit() {
  return (
    <>
      <div className={styles.hit}>
        <h4 className="mb-5 d-none d-md-block">焦點遊戲熱賣中</h4>
        <h5 className="mb-4 d-block d-sm-none">焦點遊戲熱賣中</h5>
        {/* 這邊可以放product-card */}
        <div className={`justify-content-md-around align-items-md-center ${styles.scroller}`}>
        <div className={styles.insideScr}><ProductList/></div>
        <div className={styles.insideScr}><ProductList/></div>
        <div className={styles.insideScr}><ProductList/></div>
        <div className={styles.insideScr}><ProductList/></div>
        <div className={styles.insideScr}><ProductList/></div>
        </div>
      </div>
    </>
  )
}
