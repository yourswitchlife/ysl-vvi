import React from 'react'
import CartNavbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/cart-step'
import ProductList from '@/components/products/product-list'
import styles from '@/styles/cart/purchase.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheck } from 'react-icons/fa6'

export default function Purchase() {
  return (
    <>
      <CartNavbar />
      <CartStep />
      <div className="container">
        <div className={styles.mb}>
          <section className={styles.mainBg}>
            <div className={styles.checkFrame}>
              <div className={styles.iconCircle}>
                <FaCheck className={styles.icon} />
              </div>
              <h4 className={styles.text}>訂購完成</h4>
            </div>
            <div className={styles.imgFrame}>
              <Image
                src="/images/cart/shoppingCart.png"
                width={998}
                height={912}
                className={styles.img}
              />
            </div>
            <div className={styles.btnFrame}>
              <Link
                href="/"
                type="button"
                className={`btn btn-info ${styles.button}`}
              >
                回首頁逛逛
              </Link>
              <Link
                href=""
                type="button"
                className={`btn btn-danger ${styles.button}`}
              >
                訂單查詢
              </Link>
            </div>
          </section>
        </div>
        <section className={styles.guessLike}>
          <div className={styles.title}>猜你喜歡</div>
          <div className="d-flex justify-content-between flex-wrap">
            <ProductList />
            <ProductList />
            <ProductList />
            <ProductList />
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
