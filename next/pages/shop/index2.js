import { useEffect } from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Cover from '@/components/seller/cover'
import Image from 'next/image'
import profileImg from '@/public/images/profile-photo/peach.png'
import Sortbar from '@/components/seller/sortbar'
import Coupon from '@/components/seller/coupon'
import Hit from '@/components/seller/hit'
import productList from '@/public/images/card/product-list.png'
import SearchbarB from '@/components/seller/searchbar-b'
import Pagination from '@/components/common/pagination'
import ProductList from '@/components/products/product-list'
import Footer from '@/components/layout/footer/footer-front'
import SortDropdown from '@/components/common/sortDropdown'
import Form from 'react-bootstrap/Form'
import typeName from '@/data/type.json'
import ratings from '@/data/rating.json'
import TypeFilter from '@/components/shop/type-filter'

import CartNavbar from '@/components/layout/navbar/cart-navbar'

//Offcanvas
import { useState } from 'react'
// import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

//toggle list from react bootstrap
import Collapse from 'react-bootstrap/Collapse'

// 引入seller.module.scss
import styles from '@/components/seller/seller.module.scss'
import { FaPlus, FaAngleDown, FaFilter, FaStar } from 'react-icons/fa'
import Link from 'next/link'

export default function Shop() {
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleB)

    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleB)
    }
  }, [])

  //offcanvas const
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //toggle
  const [openSort, setOpenSort] = useState(false)
  const [openRate, setOpenRate] = useState(false)

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* <CartNavbar /> */}
      {/* cover */}
      <Cover />
      {/* shop info */}
      <div className="container">
        <div className="d-none d-lg-block">
          <div className="d-flex justify-content-around mb-5 mt-5">
            {/* seller detail */}
            <div className={styles.profile}>
              <Image src={profileImg} alt="" className={styles.fit} />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              <h3>碧姬公主的玩具城堡</h3>
              <h6>@princepeach8888</h6>
              <div className="d-flex">
                {/* star rating */}
                <p className="pe-2">5.0</p>
                <p className="text-warning">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </p>
                <p className="ps-2">(150)</p>
              </div>
              <div className="d-flex">
                {/* little dashboard */}
                <div className="d-flex flex-column align-items-center pe-4">
                  <h6>商品數量</h6>
                  <p>28</p>
                </div>
                <div className="d-flex flex-column align-items-center pe-4">
                  <h6>已賣出件數</h6>
                  <p>18</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h6>關注人數</h6>
                  <p>186</p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
              >
                <FaPlus className="me-1" />
                關注賣家
              </button>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              {/* shop detail */}
              <h5 className={styles.detailTitle}>賣場介紹</h5>
              <h6 className={`fw-normal ${styles.textarea}`}>
                這裡是碧姬公主的遊戲城堡，我們提供了品質最優良的二手遊戲，讓您可以獲得物超所值的商品們，享受遊戲帝國的美好！在這裡，您將發現從經典到最新的遊戲，全部都以令人驚喜的價格提供。我們精心挑選和維護每一片遊戲，確保您帶回家的不僅是遊戲，還有最佳的遊玩體驗。
              </h6>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column d-lg-none ps-4 pe-4">
          <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
            <div className={`me-4 ${styles.profile}`}>
              <Image src={profileImg} alt="" className={styles.fit} />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              <h5 className="mb-1">碧姬公主的玩具城堡</h5>
              <p className="mb-1">@princepeach8888</p>
              <div className="d-flex">
                {/* star rating */}
                <p className="pe-2 mb-0">5.0</p>
                <p className="text-warning mb-0">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </p>
                <p className="ps-2 mb-0">(150)</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-center mt-1 mb-1">
            {/* little dashboard */}
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>商品數量</h6>
              <h6 className="text-danger mb-0">28</h6>
            </div>
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>已賣出件數</h6>
              <h6 className="text-danger mb-0">18</h6>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h6>關注人數</h6>
              <h6 className="text-danger mb-0">186</h6>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center mb-4">
            {/* shop detail */}
            <h5 className="mb-3">賣場介紹</h5>
            <p className="mb-0 ps-2 pe-2">
              這裡是碧姬公主的遊戲城堡，我們提供了品質最優良的二手遊戲，讓您可以獲得物超所值的商品們，享受遊戲帝國的美好！在這裡，您將發現從經典到最新的遊戲，全部都以令人驚喜的價格提供。我們精心挑選和維護每一片遊戲，確保您帶回家的不僅是遊戲，還有最佳的遊玩體驗。
            </p>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center"
            >
              <FaPlus className="me-1" />
              關注賣家
            </button>
          </div>
        </div>
        <Sortbar />
        <div className="d-none d-md-block">
          <Coupon />
        </div>
        <Hit />
        <div className="d-flex d-md-none flex-column ps-4 pe-4">
          <h5 className="fw-bold mb-2">賣場商品</h5>
          <h6 className="mb-3">共66項</h6>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-none d-md-block">
            <SearchbarB />
          </div>
          <div className="d-none d-md-flex justify-content-end">
            <TypeFilter />
            <SortDropdown />
          </div>
          <div className="d-flex d-md-none ps-4 pe-4">
            <TypeFilter />
            <SortDropdown />
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-5">
          <ProductList />
          <ProductList />
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-5">
          <ProductList />
          <ProductList />
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-5">
          <ProductList />
          <ProductList />
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-5 mb-5">
          <ProductList />
          <ProductList />
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
        </div>
        <div>
          <Pagination />
        </div>
      </div>
      <Footer />
    </>
  )
}
