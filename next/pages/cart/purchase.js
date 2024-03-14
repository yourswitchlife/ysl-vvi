import React, { useEffect, useState } from 'react'
import CartNavbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/step-progress'
import ProductList from '@/components/products/product-card'
import styles from '@/styles/cart/purchase.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaCheck } from 'react-icons/fa6'

//使用SweetAlert2 API
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import useRequireCart from '@/hooks/use-require-cart'

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useAuth } from '@/hooks/use-Auth'


export default function Purchase() {

  // useRequireCart()
  const router = useRouter()


  const { orderId, transactionId } = router.query

  // LINEPAY導頁進來
  useEffect(() => {
    if (orderId && transactionId) {
      const checkTransactionUrl = `http://localhost:3005/api/cart/check-transaction?transactionId=${transactionId}&groupId=${orderId}`

      fetch(checkTransactionUrl)
        .then(response => response.json())
        .then(data => {
          console.log('交易結果:', data);
          if (data.status === 'success') {
            MySwal.fire({
              icon: 'success',
              title: '付款成功',
              showConfirmButton: false,
              timer: 2000,
            })
          } else {
            MySwal.fire({
              text: '付款失敗',
              confirmButtonColor: '#E41E49',
            })
          }
        })
        .catch(error => console.error('付款驗證失敗:', error))
    }
  }, [orderId, transactionId])
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

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
