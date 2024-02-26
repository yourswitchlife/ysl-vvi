import React from 'react'
import ControlledCarousel from '@/components/common/ControlledCarousel'
import styles from '../styles/index.module.scss'
import Image from 'next/image'
import ProductList from '@/components/products/product-list'
import Footer from '@/components/layout/footer/footer-front'
// import Navbar from '@/components/layout/navbar/navbar'

export default function Index() {
  return (
    <>
      <div
        className={`${styles.headTitleCard} z-1 position-absolute d-inline-flex flex-column justify-content-center`}
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
        <div className={styles.wrap}>
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
        </div>
      </section>
      <section class="container sec4 pt-5 pb-5">
        <h4 className="text-white mb-2">商品分類</h4>
      </section>
      <section class="container sec5 pt-5 pb-5 ">
        <div className="row d-flex justify-content-between">
          <div class="col">
            <h4 className="text-white mb-2">精選文章</h4>
          </div>
          <div class="col">
            <h4 className="text-white mb-2">好康資訊</h4>
            <h4 className="text-white mb-2">精選賣家</h4>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}