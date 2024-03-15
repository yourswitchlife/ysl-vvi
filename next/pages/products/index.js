import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaBorderAll } from 'react-icons/fa'
import { IoReorderFour } from 'react-icons/io5'
import ProductCard from '@/components/products/product-card'
import BreadCrumb from '@/components/common/breadcrumb'
import Link from 'next/link'
import styles from '../../styles/products/products.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
// import data from '@/data/product.json'
import TypeFilter from '@/components/shop/type-filter'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-Auth'
import GoTopButton from '@/components/go-to-top/go-top-button'
import Pagination from 'react-bootstrap/Pagination'

export default function Products() {
  const { isLoggedIn, memberId } = useAuth()
  const [products, setProducts] = useState([])
  const router = useRouter()
  console.log(router.query)
  // 篩選搜尋
  const [displayProducts, setDisplayProducts] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [sortBy, setSortBy] = useState('')
  console.log(products)
  // const [pFilter, setPFilter] = useState('')

  // 頁數
  const [currentPage, setCurrentPage] = useState(1)
  const [ProductsPerPage] = useState(20)

  const indexOfLastProduct = currentPage * ProductsPerPage
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage
  const currentProduct = displayProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // const [totalPages, setTotalPages] = useState(0)
  // const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(20)

  // 篩選
  const [pFilter, setPFilter] = useState()
  const productFilter = (e) => {
    setPFilter(e)
    // console.log(pFilter)
  }

  useEffect(() => {
    // console.log("page Changed: " + currentPage)
    const getProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3005/api/products/list?page=${currentPage}`,
          { credentials: 'include' }
        )

        const data = await res.json()
        console.log(data)
        if (Array.isArray(data.products)) {
          setProducts(data.products)
          setDisplayProducts(data.products)
          setTotalPages(data.totalPages)
        }
      } catch (e) {
        console.error(e)
      }
      router.push(`/products?page=${currentPage}`)
    }

    getProducts()
  }, [currentPage, isLoggedIn, memberId])

  // const handlePageChange = (newPage) => {
  //   setPage(newPage)
  // }

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

  const cardIcon = (e) => {
    e.persist()
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
  }
  // const pid = pFilter.length == 0 ? []:pFilter.map(v => v.id)
  // console.log(pid)

  useEffect(() => {
    const searchP = products.filter(
      (p) => p.name && p.name.includes(searchWord)
    )
    setDisplayProducts(searchP)

    // 篩選
    const typechecked = pFilter?.typechecked
    const typecheckedID = typechecked
      ? typechecked.map((v) => parseInt(v.id))
      : []

    const ratingchecked = pFilter?.ratingchecked
    const ratingcheckedID = ratingchecked
      ? ratingchecked.map((v) => parseInt(v.id))
      : []

    const filterP = products.filter(
      (p) =>
        (ratingcheckedID.length === 0 ||
          ratingcheckedID.includes(p.rating_id)) &&
        (typecheckedID.length === 0 || typecheckedID.includes(p.type_id))
    )
    setDisplayProducts(filterP)

    const params = new URLSearchParams()
    // if (page !== undefined) params.set('page', page)
    if (typecheckedID) typecheckedID.forEach((id) => params.append('type', id))
    if (ratingcheckedID)
      ratingcheckedID.forEach((id) => params.append('rating', id))

    // router.push(`/products?${params.toString()}`)
  }, [pFilter, searchWord, products])

  return (
    <>
      <GoTopButton />
      <Navbar searchWord={searchWord} setSearchWord={setSearchWord} />
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
          <TypeFilter productFilter={productFilter} />
          <div>
            <FaBorderAll className="text-white me-2 h5" />
            <IoReorderFour className="text-white h4 mb-0" />
          </div>
        </div>
        <div className="container px-0 py-2 mb-3">
          <div className="row row-cols-2 row-cols-lg-5 g-0 g-lg-3">
            {currentProduct.map((p) => {
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
                      cardIcon={cardIcon}
                      // imgDetails={p.img_details}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Pagination className="justify-content-center mt-3 pt-3">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {/* <Pagination.Ellipsis /> */}
          {/* <Pagination.Ellipsis hidden={currentPage <= 3} /> */}
          {[
            ...Array(
              Math.ceil(displayProducts.length / ProductsPerPage)
            ).keys()
          ]
            .filter((number) => {
              if (number < 3) return true // 顯示前3页
              const maxPage = Math.ceil(
                displayProducts.length / ProductsPerPage
              )
              return (
                Math.abs(currentPage - 1 - number) <= 2 ||
                number === maxPage - 1
              )
            }
            )
            
            .map((number) => (
              <Pagination.Item
                // active={number === active}
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
          <Pagination.Ellipsis 
            hidden={
              currentPage >=
              Math.ceil(displayProducts.length / ProductsPerPage) - 10
            }
          />
      
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(displayProducts.length / ProductsPerPage)
            }
          />
          <Pagination.Last
            onClick={() =>
              handlePageChange(
                Math.ceil(displayProducts.length / ProductsPerPage)
              )
            }
          />
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
