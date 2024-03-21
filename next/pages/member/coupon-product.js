import React, { useState } from 'react'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import pStyle from '@/styles/member/points.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import fsStyle from '@/styles/member/fav-s.module.scss'
import sStyles from '@/styles/member/mseller.module.scss'
import cStyles from '@/styles/member/coupon.module.scss'


import Link from 'next/link'
import { FaRegHeart, FaCartPlus } from 'react-icons/fa'
import whitelog from '@/public/images/logo/logo_White-desktopLogo.svg'
// import styles from '@/styles/products/product-list.module.scss'


// import Paginage from '@/components/common/pagination-front'
import Dropdown from 'react-bootstrap/Dropdown'
import CouponProduct from '@/components/coupon/coupon-member/couponP-member'

export default function CouponP() {

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [currentFilter, setCurrentFilter] = useState('valid')

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="container d-flex flex-column  align-items-center pt-5">

          <div className={mStyle.card + ' container d-flex flex-column pb-5 mb-5 align-items-center pt-5'}>
            <div className={fpStyle.page_check + " pt-5"}>
              <Link href="/member/coupon-product" className={fsStyle.pages_btn}>
                商品優惠
              </Link>
              <h3 className={pStyle.gray_text}>|</h3>
              <Link href="/member/coupon-delivery" className={fsStyle.pagep_btn}>
                <span></span>運費優惠
              </Link>
            </div>
            <div className=" container d-flex justify-content-end pt-3 pe-5">

              <Dropdown className="p-2 me-5 ">
                <Dropdown.Toggle
                  variant="danger"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center ${sStyles.statusBtn}`}
                >
                  <h6 className={`mb-0 fw-bold d-md-block ${sStyles.textColor}`}>
                    依優惠券狀態
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleFilter('valid')}>可以使用</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilter('expiredORUsed')}>過期或已經使用</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>


            <CouponProduct currentFilter={currentFilter}/>
            {/* <Paginage currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} /> */}
          </div>

        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>

    </>
  )
}
