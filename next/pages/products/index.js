import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaBorderAll } from 'react-icons/fa'
import { IoReorderFour } from 'react-icons/io5'
import ProductCard from '@/components/products/product-card'
import BreadCrumb from '@/components/common/breadcrumb'
import Pagination from '@/components/common/pagination'
import Link from 'next/link'
import styles from '../../styles/products/products.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
// import data from '@/data/product.json'
import TypeFilter from '@/components/shop/type-filter'
import { useRouter } from 'next/router'

export default function Products() {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const router = useRouter()
  const {page} = router.query 
  const currentPage = parseInt(page) || 1
  const limit = 20

  useEffect(() => {
    // console.log("page Changed: " + currentPage)
    const getProducts = async () => {
      try {
        const res = await fetch('http://localhost:3005/api/products/list')
        const data = await res.json()
        console.log(data)
        if (Array.isArray(data)) {
          setProducts(data)
          setTotalPages(Math.ceil(data.length / limit))
          // console.log(data.length / limit)
        }
      } catch (e) {
        console.error(e)
      }
    }
    getProducts()
  }, [currentPage])

  const updatePage = (newPage) => {
    router.push(`/?page=${newPage}`)
  }

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => updatePage(number)}>
        {number}
      </Pagination.Item>
    );
  }
  console.error(items)
  

  const initState = products.map((p) => {
    return { ...p, fav: false }
  })
  // const [products, setProducts] = useState(initState)
  // console.log(initState)
  const handleToggleFav = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
    })
    setProducts(newProducts)
  }

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

  // const pagination = (products) => {
  //   const dataTotal = products.length
  //   const perPage = 20
  //   const pageTotal = Math.ceil(dataTotal / perPage)
  //   // console.log(`全部數量:${dataTotal} 一頁:${perPage} 總頁數:${pageTotal}`)
  //   let currentPage = nowPage;
  //   if(currentPage > pageTotal){
  //     currentPage = currentPage ;
  //   }
  //   const minData = (currentPage * perPage) - perPage + 1
  //   const maxData = (currentPage * perPage)

  //   const data = []
  //   jsonData.forEach((item,i) => {
  //     const num = i + 1
  //     if(num >= minData && num <= maxData){
  //       data.push(item)
  //     }
  //   })
  //   const page = {
  //     pageTotal,
  //     currentPage,
  //     hasPage: currentPage > 1,
  //     hasNext: currentPage < pageTotal,
  //   }
  //   displayData(data)
  //   pageBtn(page)
  // }
  // pagination(products)

  const cardIcon = (e) => {
    e.persist()
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
  }

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
          <TypeFilter />
          <div>
            <FaBorderAll className="text-white me-2 h5" />
            <IoReorderFour className="text-white h4 mb-0" />
          </div>
        </div>
        <div className="container px-0 py-2 mb-3">
          <div className="row row-cols-2 row-cols-lg-5 g-0 g-lg-3">
            {products.map((p) => {
              return (
                <div
                  key={p.id}
                  className="col"
                  onClick={() => {
                    historyRecord(p)
                  }}
                >
                  <Link href={`/products/${p.id}`} className={styles.link}>
                    <ProductCard
                      className="p-5"
                      id={p.id}
                      name={p.name}
                      price={p.price}
                      display_price={p.display_price}
                      releaseTime={p.release_time.split('T')[0]}
                      img_cover={p.img_cover}
                      type={p.type_id}
                      ratingId={p.rating_id}
                      fav={p.fav}
                      handleToggleFav={handleToggleFav}
                      member_id={p.member_id}
                      cardIcon={cardIcon}
                      imgDetails={p.img_details}
                    />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        {/* {page >1 && <a href={`/?page=${page - 1}`}>prev</a>}
        頁數{page}
        {page < totalPages && <a href={`/?page=${page + 1}`}>next</a>} */}
        {/* <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" onClick={() => updatePage(currentPage - 1)}>Prev</a>
              </li>
              {[...Array(totalPages).keys()].map(number => (
                <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                  <a className="page-link" onClick={() => updatePage(number + 1)}>{number + 1}</a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a className="page-link" onClick={() => updatePage(currentPage + 1)}>Next</a>
              </li>
            </ul>
          </nav> */}
        
        {/* <Pagination /> */}

        <Pagination>
            <Pagination.Prev onClick={() => currentPage > 1 && updatePage(currentPage - 1)} />
            {items}
            <Pagination.Next onClick={() => currentPage < totalPages && updatePage(currentPage + 1)} />
          </Pagination>

        <div>
          <h4 className="text-white mx-3 ">猜你喜歡</h4>
          <div className={`px-0 py-2 ${styles.guessLike}`}>
            <ProductCard className="" />
            <ProductCard className="" />
            <ProductCard className="" />
            <ProductCard className="" />
            <ProductCard className="" />
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
