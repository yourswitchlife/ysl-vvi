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
import ProductCard from '@/components/products/product-card'

//使用SweetAlert2 API
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useAuth } from '@/hooks/use-Auth'

export default function Purchase() {
  const router = useRouter()
  const { orderId, transactionId } = router.query
  const [products, setProducts] = useState([])
  const { isLoggedIn, memberId, memberData } = useAuth()

  // LINEPAY導頁進來
  useEffect(() => {
    if (orderId && transactionId) {
      const checkTransactionUrl = `http://localhost:3005/api/cart/check-transaction?orderId=${orderId}&transactionId=${transactionId}`

      fetch(checkTransactionUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log('交易結果:', data)
          if (data.status === 'success') {
            MySwal.fire({
              icon: 'success',
              title: '付款成功',
              showConfirmButton: false,
              timer: 2000,
            })
            console.log("成功")
          } else {
            MySwal.fire({
              text: '付款失敗',
              confirmButtonColor: '#E41E49',
            })
          }
        })
        .catch((error) => console.error('付款驗證失敗:', error))
    }
  }, [orderId, transactionId])

  // 取得商品資料
  const getProducts = () => {
    const url = 'http://localhost:3005/api/products/list'
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (Array.isArray(data.products)) {
          setProducts(data.products)
        }
      })
      .catch((error) => console.error('取得會員收藏清單失敗'))
  }
  useEffect(() => {
    getProducts()
  }, [])

  // 過濾會員自己賣的商品
  const filterProducts = products.filter((p) => p.member_id !== memberId)
  // 過濾沒有description的商品
  const hasDescriptionProducts = filterProducts.filter((p) => p.description !== "" || null)
  // 打亂過濾後的產品列表
  const shuffleProducts = hasDescriptionProducts.sort(() => 0.5 - Math.random())
  // 從打亂的列表隨機取4個
  const randomProducts = shuffleProducts.slice(0, 4)

  // 設定瀏覽紀錄
  const historyRecord = (p) => {
    if (!p) {
      return
    }
    const existingRecordsStr = localStorage.getItem('readProduct')
    let historyRecordArr
    if (existingRecordsStr) {
      historyRecordArr = JSON.parse(existingRecordsStr)
      if (!Array.isArray(historyRecordArr)) {
        historyRecordArr = []
      }
    } else {
      historyRecordArr = []
    }
    const hasRecord = historyRecordArr.some(
      (item) => JSON.stringify(item) === JSON.stringify(p)
    )

    if (!hasRecord) {
      historyRecordArr.unshift(p)
    }
    if (historyRecordArr.length > 7) {
      historyRecordArr.pop()
    }
    localStorage.setItem('readProduct', JSON.stringify(historyRecordArr))
  }
  useEffect(() => {
    historyRecord()
  }, [])

  const cardIcon = (e) => {
    e.persist()
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
  }

  const handleToggleFav = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
    })
    setProducts(newProducts)
  }

  // 成功建立訂單後更新積分start
  useEffect(() => {
    if (memberId) {
      handleLevelPoint();
    }
  }, [memberId]);

  const handleLevelPoint = async () => {
    try {
      const updateResponse = await fetch(
        `http://localhost:3005/api/member/levelup/?memberId=${memberId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )

      if (!updateResponse.ok) {
        throw new Error('更新會員資料失敗')
      }

      const Data = await updateResponse.json()
      // console.log('consoleMessage',Data.message)
      if (Data.message.includes('高手獎勵')) {
        setTimeout(() => {
          Swal.fire({
            title: `${memberData.account}，恭喜升級！`,
            text: 'YSL團隊為您帶來了2張高手獎勵優惠券！',
            imageUrl: '/images/member/gift.png',
            imageWidth: 200,
            imageHeight: 230,
            imageAlt: 'gift',
            confirmButtonColor: '#43B0FF',
            confirmButtonText: '好耶！',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/member/points");
            }
          })
        }, 2000);
      } else if (Data.message.includes('菁英獎勵')) {
        setTimeout(() => {
          Swal.fire({
            title: `${memberData.account}，恭喜升級！`,
            text: 'YSL團隊為您帶來了2張菁英獎勵優惠券！',
            imageUrl: '/images/member/gift.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'gift',
            confirmButtonColor: '#43B0FF',
            confirmButtonText: '好耶！',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/member/points");
            }
          })
        }, 2000);
      } else if (Data.message.includes('大師獎勵')) {
        setTimeout(() => {
          Swal.fire({
            title: `${memberData.account}，恭喜升級！`,
            text: 'YSL團隊為您帶來了2張大師獎勵優惠券！',
            imageUrl: '/images/member/gift.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'gift',
            confirmButtonColor: '#43B0FF',
            confirmButtonText: '好耶！',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/member/points");
            }
          })
        }, 2000);
      }
    } catch (error) {
      console.error('更新會員資料時發生錯誤:', error)
    }
  }

  // 成功建立訂單後更新積分END

  return (
    <>
      <CartNavbar />
      <CartStep />
      <div className="container">
        <div className={styles.mb}>
          <section className={`${styles.mainBg} container`}>
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
                href="/member/order"
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
            {randomProducts.map((p) => {
              return (
                <div
                  key={p.id}
                  className="col"
                  onClick={() => {
                    historyRecord(p)
                  }}
                >
                  <div
                    onClick={() => {
                      router.push(`/products/${p.id}`)
                    }}
                    className={styles.link}
                  >
                    <ProductCard
                      className="p-5"
                      id={p.id}
                      name={p.name}
                      price={p.price}
                      display_price={p.display_price}
                      releaseTime={p.release_time.split('T')[0]}
                      img_cover={p.img_cover}
                      img_details={p.img_details}
                      type={p.type_id}
                      ratingId={p.rating_id}
                      fav={p.fav}
                      handleToggleFav={handleToggleFav}
                      member_id={p.member_id}
                      language={p.language}
                      cardIcon={cardIcon}
                    // imgDetails={p.img_details}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context)
}
