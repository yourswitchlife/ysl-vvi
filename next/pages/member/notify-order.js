import React from 'react'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import mStyle from '@/styles/member/g-valuable.module.scss'
import styles from '@/styles/member/mseller.module.scss'
import oStyles from '@/styles/member/order.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import fsStyle from '@/styles/member/fav-s.module.scss'
import pStyle from '@/styles/member/points.module.scss'

import sellerImg from '@/public/images/profile-photo/peach.png'
import { FaShop } from 'react-icons/fa6'
import { IoNotificationsCircle } from "react-icons/io5";

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
          <div className={mStyle.card + ' container mt-5 d-flex flex-column mb-5'}>
            <div className={fpStyle.page_check + " pt-5"}>
              <Link href="" className={fsStyle.pages_btn}>
                訂單通知<IoNotificationsCircle className={mStyle.iconb+' text-danger mb-1'}/>
              </Link>
              <h3 className={pStyle.gray_text}>|</h3>
              <Link href="" className={fsStyle.pagep_btn}>
              <span></span>優惠通知 <IoNotificationsCircle className={mStyle.iconc+' text-danger mb-1'}/>
              </Link>
            </div>
            <div className="pt-5"></div>

            {/* CARD TITLE */}
            <div>
              <Card className={oStyles.bg_card + " px-5 d-flex flex-row border-0"}>
                <Card.Body className="d-flex flex-row m-2 justify-content-between align-items-center">
                  <h5 className="fw-bold text-info ps-3">
                    YSL通知
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
              <Card className={oStyles.shop_xs + " px-5 container d-flex flex-row"}>
                <div className={styles.profile + ' m-3'}>
                  <Image className={styles.fit} src={sellerImg} />
                </div>
                <Card.Body className={oStyles.order_xs+" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <div className='d-flex flex-wrap align-items-center'>
                  <h5 className={oStyles.h4text_xs+" mx-3 text-danger fw-bold"}>已出貨</h5>
                  <h5 className={oStyles.h4text_xs+" mx-3 my-3"}>訂單編號489416161616516已出貨。請留意後續訂單訊息。</h5>
                  </div>
                  <h5 className={oStyles.h4text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY */}

              <Card className={oStyles.shop_xs + " px-5 container d-flex flex-row"}>
                <div className={styles.profile + ' m-3'}>
                  <Image className={styles.fit} src={sellerImg} />
                </div>
                <Card.Body className={oStyles.order_xs+" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <div className='d-flex flex-wrap align-items-center'>
                  <h5 className={oStyles.h4text_xs+" mx-3 text-danger fw-bold"}>已出貨</h5>
                  <h5 className={oStyles.h4text_xs+" mx-3 my-3"}>訂單編號489416161616516已出貨。請留意後續訂單訊息。</h5>
                  </div>
                  <h5 className={oStyles.h4text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>

              <Card className={oStyles.shop_xs + " px-5 container d-flex flex-row"}>
                <div className={styles.profile + ' m-3'}>
                  <Image className={styles.fit} src={sellerImg} />
                </div>
                <Card.Body className={oStyles.order_xs+" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <div className='d-flex flex-wrap align-items-center'>
                  <h5 className={oStyles.h4text_xs+" mx-3 text-danger fw-bold"}>已出貨</h5>
                  <h5 className={oStyles.h4text_xs+" mx-3 my-3"}>訂單編號489416161616516已出貨。請留意後續訂單訊息。</h5>
                  </div>
                  <h5 className={oStyles.h4text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>

              <Card className={oStyles.shop_xs + " px-5 container d-flex flex-row"}>
                <div className={styles.profile + ' m-3'}>
                  <Image className={styles.fit} src={sellerImg} />
                </div>
                <Card.Body className={oStyles.order_xs+" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <div className='d-flex flex-wrap align-items-center'>
                  <h5 className={oStyles.h4text_xs+" mx-3 text-danger fw-bold"}>已出貨</h5>
                  <h5 className={oStyles.h4text_xs+" mx-3 my-3"}>訂單編號489416161616516已出貨。請留意後續訂單訊息。</h5>
                  </div>
                  <h5 className={oStyles.h4text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>

              <Card className={oStyles.shop_xs + " px-5 container d-flex flex-row"}>
                <div className={styles.profile + ' m-3'}>
                  <Image className={styles.fit} src={sellerImg} />
                </div>
                <Card.Body className={oStyles.order_xs+" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <div className='d-flex flex-wrap align-items-center'>
                  <h5 className={oStyles.h4text_xs+" mx-3 text-danger fw-bold"}>已出貨</h5>
                  <h5 className={oStyles.h4text_xs+" mx-3 my-3"}>訂單編號489416161616516已出貨。請留意後續訂單訊息。</h5>
                  </div>
                  <h5 className={oStyles.h4text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>

              <Card className={oStyles.shop_xs + " px-5 container d-flex flex-row"}>
                <div className={styles.profile + ' m-3'}>
                  <Image className={styles.fit} src={sellerImg} />
                </div>
                <Card.Body className={oStyles.order_xs+" d-flex flex-row m-3 justify-content-between align-items-center"}>
                  <div className='d-flex flex-wrap align-items-center'>
                  <h5 className={oStyles.h4text_xs+" mx-3 text-danger fw-bold"}>已出貨</h5>
                  <h5 className={oStyles.h4text_xs+" mx-3 my-3"}>訂單編號489416161616516已出貨。請留意後續訂單訊息。</h5>
                  </div>
                  <h5 className={oStyles.h4text_xs+" me-2 text-secondary"}>
                    2024/01/16
                    12:26:03
                  </h5>
                </Card.Body>
              </Card>






            </div>
            <Paginage className="pt-5 mt-5" />
          </div>
          
        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}
