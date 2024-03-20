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
import TypeSlider from '@/components/common/typeSlider'

export default function Index() {
  const router = useRouter()
  const [shop, setShop] = useState([])
  const [selectedShops, setSelectedShops] = useState([null, null])
  const [rating, setRating] = useState([])
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [roundedRating, setRoundedRating] = useState(0)

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


  //隨機選擇精選賣場

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
        <div>
          <h3 className="align-self-start text-white-50">
            <b>WEEKLY SELECT WEEKLY SELECT</b>
          </h3>
        </div>
        <div className="container d-flex justify-content-evenly align-items-center pt-2">
          <Image
            src="https://tshop.r10s.com/9d8/189/0ce7/b2d8/4078/5eba/1119/1117eb82f60242ac110006.jpg"
            alt="product"
            width={150}
            height={244}
            className="p-2"
            layout="fixed"
          />

          <Image
            src="https://tshop.r10s.com/9d8/189/0ce7/b2d8/4078/5eba/1119/1117eb82f60242ac110006.jpg"
            alt="product"
            width={225}
            height={366}
            className=""
            layout="fixed"
          />

          <Image
            src="https://tshop.r10s.com/9d8/189/0ce7/b2d8/4078/5eba/1119/1117eb82f60242ac110006.jpg"
            alt="product"
            width={150}
            height={244}
            className="p-2"
            layout="fixed"
          />
        </div>
        <div className="d-flex align-items-end mb-0">
          <h3 className="text-white-50">
            <b>WEEKLY SELECT WEEKLY SELECT</b>
          </h3>
        </div>
      </section>
      <section class="sec3 container pt-5 pb-5">
        <h4 className="text-white mb-2">特賣焦點</h4>
        <div className='container'>
          <IndexSlider /></div>
        {/* <div className={styles.wrap}>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
          <ProductList></ProductList>
        </div> */}
      </section>
      <section class="container sec4 pt-5 pb-5">
        <h4 className="text-white mb-2">商品分類</h4>
        <TypeSlider />
      </section>
      <section class="container sec5 pt-5 pb-5 ">
        <div className="row d-flex justify-content-between">
          <div class="col">
            <h4 className="text-white mb-2">精選文章</h4>
          </div>
          <div class="col">
            <h4 className="text-white mb-2">好康資訊</h4>
            <h4 className="text-white mb-2">精選賣家</h4>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
              {selectedShops[0] && <ShopCardA avgRating={roundedRating} shopInfo={selectedShops[0]} />}
              {selectedShops[1] && <ShopCardA avgRating={roundedRating} shopInfo={selectedShops[1]} />}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
