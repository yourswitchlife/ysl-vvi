import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import styles from '@/styles/cart/payment.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

export default function Payment() {
  return (
    <>
      <CartNavbar />
      <section className={`container px-4 ${styles.container}`}>
        <div className="bg-white rounded pb-2">
          <div className={styles.paymentItem}>
            <FaCheckCircle className={styles.icon} />
            <div>貨到付款</div>
            <div className={styles.sub}>現金付款</div>
          </div>
          <div className={styles.paymentItem}>
            <div>信用卡付款</div>
            <div className={styles.sub}>未完成付款請勿離開結帳頁面</div>
          </div>
          <div className={styles.paymentItem}>
            <Image
              src="/images/cart/LINE-Pay(h)_W238_n.png"
              width={85}
              height={25}
              alt="選擇LINEPAY結帳"
            />
            <div className={styles.sub}>未完成付款請勿離開結帳頁面</div>
          </div>
          <Link href="/cart/checkout" className={styles.confirmBtn}>
            確認
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
