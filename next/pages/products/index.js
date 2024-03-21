import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ProductCard from '@/components/products/product-card'
import BreadCrumb from '@/components/common/breadcrumb'
// import Link from 'next/link'
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
import Animation from '@/components/products/animation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Products() {
  const { isLoggedIn, memberId } = useAuth()
  const [products, setProducts] = useState([])
  const router = useRouter()
  console.log(router.query)
  // 篩選搜尋
  const [displayProducts, setDisplayProducts] = useState([])
  const [searchWord, setSearchWord] = useState('')
  // const [sortBy, setSortBy] = useState('')
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

  // 控制蒐藏icon
  const handleToggleFav = async (id) => {
    if (!memberId) {
      MySwal.fire({
        icon: 'warning',
        text: '請先登入',
        confirmButtonColor: '#E41E49',
      })
      return
    }
    // 是否蒐藏 預設為否
    let shouldAddFav = false
    const newProducts = products.map((p) => {
      if (p.id === id) {
        if (!p.fav) {
          shouldAddFav = true
        }
        return { ...p, fav: !p.fav }
      } else {
        return p
      }
    })
    setProducts(newProducts)
    if (shouldAddFav) {
      await addFav(id)
    }
  }

  // 蒐藏加入資料庫
  const addFav = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/products/favProducts?memberId=${memberId}&pid=${id}`,
        {
          method: 'POST',
          credentials: 'include',
        }
      )
      if (!res.ok) {
        throw new Error('Failed to fetch fav products')
      }
      MySwal.fire({
        icon: 'success',
        text: '成功加入收藏!',
        confirmButtonColor: '#E41E49',
      })
    } catch (err) {
      console.log('Error')
    }
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
    e.stopPropagation()
  }

  useEffect(() => {
    // 搜尋
    const baseProducts = searchWord
      ? products.filter((p) => p.name && p.name.includes(searchWord))
      : products

    // 篩選
    const typechecked = pFilter?.typechecked
    const typecheckedID = typechecked
      ? typechecked.map((v) => parseInt(v.id))
      : []

    const ratingchecked = pFilter?.ratingchecked
    const ratingcheckedID = ratingchecked
      ? ratingchecked.map((v) => parseInt(v.id))
      : []

    const filteredProducts = baseProducts.filter(
      (p) =>
        (typecheckedID.length === 0 || typecheckedID.includes(p.type_id)) &&
        (ratingcheckedID.length === 0 || ratingcheckedID.includes(p.rating_id))
    )

    setDisplayProducts(filteredProducts)
  }, [pFilter, searchWord, products])

  return (
    <>
      <GoTopButton />
      <Navbar searchWord={searchWord} setSearchWord={setSearchWord} />
      <Animation className="z-3 position-absolute"/>
      {/* <Image
        src="/images/product/p-index.jpg"
        alt="product"
        width={1440}
        height={560}
        priority={true}
        className={`${styles.pIndexImg}`}
      /> */}
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
        <div className="d-flex mb-3">
          <TypeFilter productFilter={productFilter} />

          <button
            type="button"
            onClick={() => {
              setDisplayProducts(products)
            }}
            class={styles.btnClean}
          >
            清除篩選條件
          </button>
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
                      addFav={addFav}
                      handleToggleFav={handleToggleFav}
                      member_id={p.member_id}
                      cardIcon={cardIcon}
                      product_quanty={p.product_quanty}
                      language={p.language}
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

          {/* Display the ellipsis if there are pages before the first displayed page */}
          {currentPage > 3 && <Pagination.Ellipsis disabled />}

          {/* Calculate and display page numbers */}
          {[
            ...Array(
              Math.ceil(displayProducts.length / ProductsPerPage)
            ).keys(),
          ]
            .filter((number) => {
              const maxPage = Math.ceil(
                displayProducts.length / ProductsPerPage
              )
              const firstPageToShow = Math.max(currentPage - 2, 1)
              const lastPageToShow = Math.min(firstPageToShow + 4, maxPage)
              return (
                number >= firstPageToShow - 1 && number <= lastPageToShow - 1
              )
            })
            .map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                style={
                  number + 1 === currentPage
                    ? { border: '1px solid white', borderRadius: '5px' }
                    : {}
                }
                // className={number + 1 === currentPage ? "activePage" : ""}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}

          {/* Display the ellipsis if there are pages after the last displayed page */}
          {currentPage <
            Math.ceil(displayProducts.length / ProductsPerPage) - 2 && (
            <Pagination.Ellipsis disabled />
          )}

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
            {products.slice(20, 25).map((p) => {
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
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
