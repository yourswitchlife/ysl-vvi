import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import ControlledCarousel from '@/components/common/ControlledCarousel'
import styles from '../styles/index.module.scss'
import mstyles from '../styles/member/index.module.scss'
import Navbar from '@/components/layout/navbar/navbar'
import ProductList from '@/components/products/product-card'
import Footer from '@/components/layout/footer/footer-front'
import IndexSlider from '@/components/common/index-slider'
import ShopCardA from '@/components/shop/shop-card-a'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
// import Navbar from '@/components/layout/navbar/navbar'
import GoTopButton from '@/components/go-to-top/go-top-button'
import ProductCard from '@/components/products/product-card'
import WeeklySelect from '@/assets/weekly-select.svg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useAuth } from '@/hooks/use-Auth'
import TypeSlider from '@/components/common/typeSlider'

export default function Index() {
  const router = useRouter()
  const [shop, setShop] = useState([])
  const [selectedShops, setSelectedShops] = useState([null, null])
  const [rating, setRating] = useState([])
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [roundedRating, setRoundedRating] = useState(0)
  const [products, setProducts] = useState([])
  const [randomProducts, setRandomProducts] = useState([])
  const { isLoggedIn, memberId } = useAuth()
  // 設置本周精選卡片的翻面狀態
  const [flippedStates, setFlippedStates] = useState({})

  // 卡片翻轉的狀態
  const flipCard = (id) => {
    setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }))
    console.log(id)
  }

  useEffect(() => {
    console.log(flippedStates)
  }, [flippedStates])

  const getShop = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/shop/`)
      if (!res.ok) {
        throw new Error('網路請求失敗，找不到賣場資料評價')
      }
      const data = await res.json()
      const { shopRating, shop } = data
      // console.log(shop)
      // {
      //   "shopRating": [{....}],
      //   "shop": [{....}],
      // 確保返回的數據結構正確，並更新狀態
      if (data && shop.length > 0 && shopRating.length > 0) {
        setShop(shop)
        setRating(shopRating)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getShop()
  }, [])
  useEffect(() => {
    if (shop.length > 1) {
      let firstIndex = Math.floor(Math.random() * shop.length)
      let secondIndex = Math.floor(Math.random() * shop.length)
      //確保兩個索引值不同
      while (secondIndex === firstIndex) {
        secondIndex = Math.floor(Math.random() * shop.length)
      }
      setSelectedShops([shop[firstIndex], shop[secondIndex]])
    }
  }, [shop])

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

  useEffect(() => {
    if (products.length > 0) {
      // 過濾會員自己賣的商品
      const filterProducts = products.filter((p) => p.member_id !== memberId)
      // 過濾掉沒有	description內容的商品
      const hasDescriptionProducts = filterProducts.filter(
        (p) => p.description !== ''
      )
      // 打亂過濾後的產品列表
      const shuffleProducts = hasDescriptionProducts.sort(
        () => 0.5 - Math.random()
      )
      // 從打亂的列表隨機取4個
      const selectedProducts = shuffleProducts.slice(0, 3)
      setRandomProducts(selectedProducts)
    }
  }, [products, memberId])

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

  const handleToggleFav = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
    })
    setProducts(newProducts)
  }

  const cardIcon = (e) => {
    e.persist()
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
  }

  return (
    <>
      <GoTopButton />
      <Navbar />
      <div
        className={`${styles.headTitleCard} z-1 position-absolute d-lg-inline-flex d-none flex-column justify-content-center`}
      >
        <div>
          <h4 className="text-white">Let’s enjoy</h4>
          <h1 className="text-white">
            <b>
              Your <br />
              Switch <br />
              Life !
            </b>
          </h1>
          <h4 className="text-white">二手Switch遊戲販售平台</h4>
        </div>
        <div className="btns mt-4">
          <button className="btn btn-danger px-4 me-sm-3">會員登入</button>
          <button className="btn btn-info me-sm-3">加入會員</button>
        </div>
      </div>
      <ControlledCarousel />
      <section className={styles.sec2}>
        <div className={`${styles.weeklySelect} ${styles.top}`}>
          <Image src={WeeklySelect} className={styles.img} />
          <Image src={WeeklySelect} className={styles.img} />
        </div>
        <div className={styles.cardFrame}>
          <div className={`container ${styles.cardBody}`}>
            {randomProducts.map((p) => {
              const isFlipped = flippedStates[p.id] || false
              return (
                <div
                  className={styles.cardLink}
                  key={p.id}
                  onClick={() => {
                    flipCard(p.id)
                  }}
                >
                  <div className={styles.card}>
                    <div
                      className={`${styles.ura} ${
                        isFlipped ? styles.isFlipped : ''
                      }`}
                      style={{
                        backgroundImage: `url(http://localhost:3005/productImg/cover/${p.img_cover})`,
                      }}
                    >
                      <div className={styles.title}>{p.name}</div>
                      <div className={styles.description}>{p.description}</div>
                      <div
                        className={styles.more}
                        onClick={() => {
                          router.push(`/products/${p.id}`)
                        }}
                      >
                        MORE <FaArrowRightLong />
                      </div>
                    </div>
                    <div
                      className={`${styles.inner} ${
                        isFlipped ? styles.isFlipped : ''
                      }`}
                    >
                      <figure className={styles.img}>
                        <Image
                          src={`http://localhost:3005/productImg/cover/${p.img_cover}`}
                          width={250}
                          height={407}
                          alt={p.name}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`${styles.weeklySelect} ${styles.bottom}`}>
          <Image src={WeeklySelect} className={styles.img} />
          <Image src={WeeklySelect} className={styles.img} />
        </div>
      </section>
      <section class="sec3 container pt-5 pb-5">
        <h4 className="text-white mb-2">特賣焦點</h4>
        <div className="container">
        <div className='row my-3'>
        {products.slice(20, 24).map((p) => {
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
                    className="p-5 my-2"
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
                    language={p.language}
                    handleToggleFav={handleToggleFav}
                    member_id={p.member_id}
                    cardIcon={cardIcon}
                    // imgDetails={p.img_details}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className='row my-3'>
        {products.slice(30, 34).map((p) => {
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
                    className="p-5 my-2"
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
                    language={p.language}
                    handleToggleFav={handleToggleFav}
                    member_id={p.member_id}
                    cardIcon={cardIcon}
                    // imgDetails={p.img_details}
                  />
                </div>
              </div>
            )
          })}
        </div>
          
        </div>
      </section>
      <section class="container sec4 pt-5 pb-5">
        <h4 className="text-white mb-2 d-flex justify-content-center">商品分類</h4>
        <div className='d-flex flex-row'>
          <TypeSlider />
        </div>
      </section>
      <section class="container sec5 pt-5 pb-5 ">
        <div className="row d-flex justify-content-between">
          <div class="col">
            <h4 className="text-white mb-2">精選文章</h4>
          </div>
          <div class="col">
            <h4 className="text-white mb-2">好康資訊</h4>
            <h4 className="text-white mb-2">精選賣家</h4>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              {selectedShops[0] && (
                <ShopCardA
                  avgRating={roundedRating}
                  shopInfo={selectedShops[0]}
                />
              )}
              {selectedShops[1] && (
                <ShopCardA
                  avgRating={roundedRating}
                  shopInfo={selectedShops[1]}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
