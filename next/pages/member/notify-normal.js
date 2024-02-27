import React from 'react'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import mStyle from '@/styles/member/g-valuable.module.scss'
import oStyles from '@/styles/member/order.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import fsStyle from '@/styles/member/fav-s.module.scss'
import pStyle from '@/styles/member/points.module.scss'
import styles from '@/styles/member/mseller.module.scss'

import sellerImg from '@/public/images/profile-photo/peach.png'
import { FaShop } from 'react-icons/fa6'
import { IoNotificationsCircle } from "react-icons/io5";
import { RiCoupon3Fill } from "react-icons/ri";


import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'

export default function notifyNormal() {
  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="m-auto mt-5">
          {/* 白卡 */}
          <div className={mStyle.card + ' container mt-5 mb-5 d-flex flex-column'}>
            <div className={fpStyle.page_check + " pt-5"}>
              <Link href="" className={fsStyle.pagep_btn}>
                <span></span>訂單通知<IoNotificationsCircle className={mStyle.icon+' text-danger mb-1'} />
              </Link>
              <h3 className={pStyle.gray_text}>|</h3>
              <Link href="" className={fsStyle.pages_btn}>
                優惠通知 <IoNotificationsCircle className={mStyle.iconb+' text-danger mb-1'} />
              </Link>
            </div>
            <div className="pt-5"></div>

            {/* CARD TITLE */}
            <div>
              <Card className={oStyles.bg_card + " px-5 d-flex flex-row border-0"}>
                <Card.Body className="d-flex flex-row m-2 justify-content-between align-items-center">
                  <h5 className="fw-bold text-info ps-3">
                    賣場通知
                  </h5>
                  <h5 className="fw-bold text-info">
                    內容
                  </h5>
                  <h5 className="fw-bold text-info pe-5">
                    時間
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY迴圈 */}
              <Card className={oStyles.card_xs+" px-5 container d-flex flex-row"}>
                <div className='d-flex justify-content-center align-items-center'>
                  <RiCoupon3Fill className='fs-5 text-info' />
                </div>
                <Card.Body className={oStyles.wid_xs +" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <h5 className={oStyles.h6text_xs + " mx-3 text-secondary fw-bold"}>新戶註冊 優惠券已送達</h5>
                  <h5 className={oStyles.h6text_xs+ " mx-3 my-3"}>您的新戶註冊 優惠券已送達，歡迎您！快到任務中心解鎖更多優惠！</h5>
                  <h5 className={oStyles.h6text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY */}

              {/* CARD BODY迴圈 */}
              <Card className={oStyles.card_xs+" px-5 container d-flex flex-row"}>
                <div className='d-flex justify-content-center align-items-center'>
                  <RiCoupon3Fill className='fs-5 text-info' />
                </div>
                <Card.Body className={oStyles.wid_xs +" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <h5 className={oStyles.h6text_xs+" mx-3 text-secondary fw-bold"}>角色扮演 優惠券已送達</h5>
                  <h5 className={oStyles.h6text_xs+" mx-3 my-3"}>您的角色扮演 優惠券已送達，歡迎您！快到任務中心解鎖更多優惠！</h5>
                  <h5 className={oStyles.h6text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY */}

              {/* CARD BODY迴圈 */}
              <Card className={oStyles.card_xs+" px-5 container d-flex flex-row"}>
                <div className='d-flex justify-content-center align-items-center'>
                  <RiCoupon3Fill className='fs-5 text-danger' />
                </div>
                <Card.Body className={oStyles.wid_xs +" d-flex flex-row m-3 justify-content-between align-items-center"}>
                <h5 className={oStyles.h6text_xs+" mx-3 text-secondary fw-bold"}>免運費 優惠券已送達</h5>
                  <h5 className={oStyles.h6text_xs+" mx-3 my-3"}>您的免運費 優惠券已送達，歡迎您！快到任務中心解鎖更多優惠！</h5>
                  <h5 className={oStyles.h6text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY */}

              <Card className={oStyles.card_xs+" px-5 container d-flex flex-row"}>
                <div className='d-flex justify-content-center align-items-center'>
                  <RiCoupon3Fill className='fs-5 text-danger' />
                </div>
                <Card.Body className={oStyles.wid_xs +" d-flex flex-row m-3 justify-content-between align-items-center"}>
                <h5 className={oStyles.h6text_xs+" mx-3 text-secondary fw-bold"}>免運費 優惠券已送達</h5>
                  <h5 className={oStyles.h6text_xs+" mx-3 my-3"}>您的免運費 優惠券已送達，歡迎您！快到任務中心解鎖更多優惠！</h5>
                  <h5 className={oStyles.h6text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>

              <Card className={oStyles.card_xs+" px-5 container d-flex flex-row"}>
                <div className='d-flex justify-content-center align-items-center'>
                  <RiCoupon3Fill className='fs-5 text-danger' />
                </div>
                <Card.Body className={oStyles.wid_xs +" d-flex flex-row m-3 justify-content-between align-items-center"}>
                <h5 className={oStyles.h6text_xs+" mx-3 text-secondary fw-bold"}>免運費 優惠券已送達</h5>
                  <h5 className={oStyles.h6text_xs+" mx-3 my-3"}>您的免運費 優惠券已送達，歡迎您！快到任務中心解鎖更多優惠！</h5>
                  <h5 className={oStyles.h6text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>

              <Card className={oStyles.card_xs+" px-5 container d-flex flex-row"}>
                <div className='d-flex justify-content-center align-items-center'>
                  <RiCoupon3Fill className='fs-5 text-danger' />
                </div>
                <Card.Body className={oStyles.wid_xs +" d-flex flex-row m-3 justify-content-between align-items-center"}>
                <h5 className={oStyles.h6text_xs+" mx-3 text-secondary fw-bold"}>免運費 優惠券已送達</h5>
                  <h5 className={oStyles.h6text_xs+" mx-3 my-3"}>您的免運費 優惠券已送達，歡迎您！快到任務中心解鎖更多優惠！</h5>
                  <h5 className={oStyles.h6text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>


            </div>
            <Paginage className="mt-5 mb-5" />
          </div>
        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}
