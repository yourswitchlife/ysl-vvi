import React, { useState } from 'react'
import Image from 'next/image'
import { FaBorderAll } from 'react-icons/fa'
import { IoReorderFour } from 'react-icons/io5'
import ProductList from '@/components/products/product-list'
import BreadCrumb from '@/components/common/breadcrumb'
import Pagination from '@/components/common/pagination'
import BtnOutline from '@/components/products/btn-outline'
import Link from 'next/link'
import styles from '../../styles/products/products.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import data from '@/data/product.json'

export default function Products() {
  // console.log(products)
  const initState = data.map((p) => {
    return { ...p, fav: false }
  })
  const [products, setProducts] = useState(initState)
  // console.log(initState)
  const handleToggleFav = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) return {...p, fav:!p.fav}
      else return p
    })
  setProducts(newProducts)}

  return (
    <>
      <Navbar />
      <Image
        src="/images/product/p-index.jpg"
        alt="product"
        width={1440}
        height={560}
        priority={true}
        className={`${styles.pIndexImg}`}
      />
      <PhoneTabNav />

      <div
        className={`${styles.pTitle} z-2 position-absolute d-lg-grid d-none`}
      >
        <div className="p-slogan">
          <h4 className="text-white">Enjoy Your Switch Life!</h4>
          <h1 className="text-white">
            盡情挑選
            <br />
            喜歡的
            <br />
            遊戲
          </h1>
        </div>
      </div>
      <div className="container pt-3 px-lg-5 px-4">
        <BreadCrumb />
        <div className="d-flex justify-content-between mb-3">
          <BtnOutline></BtnOutline>
          <div>
            <FaBorderAll className="text-white me-2 h5" />
            <IoReorderFour className="text-white h4 mb-0" />
          </div>
        </div>
        <div className="container px-0 py-2 mb-3">
          <div className="row row-cols-2 row-cols-lg-5 g-0 g-lg-3">
            {products.map((p) => {
              return (
                <div key={p.id} className="col">
                  <ProductList
                    className="p-5"
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    displayPrice={p.display_price}
                    releaseTime={p.release_time}
                    cover={p.img_cover}
                    type={p.type_id}
                    ratingId={p.rating_id}
                    fav={p.fav}
                    handleToggleFav={handleToggleFav}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <Pagination />

        <div>
          <h4 className="text-white mx-3 ">猜你喜歡</h4>
          <div className={`px-0 py-2 ${styles.guessLike}`}>
            <ProductList className="" />
            <ProductList className="" />
            <ProductList className="" />
            <ProductList className="" />
            <ProductList className="" />
          </div>

          <Link
            href=""
            className={`d-block mt-2 text-end more h6 text-white ${styles.more}`}
          >
            看更多...
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
