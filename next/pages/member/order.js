import React, { useState } from 'react'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import mStyle from '@/styles/member/g-valuable.module.scss'
import styles from '@/styles/member/mseller.module.scss'
import oStyles from '@/styles/member/order.module.scss'

import aragami from '@/public/images/member/aragami2.jpg'
import { FaShop } from 'react-icons/fa6'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'

export default function order() {
  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="m-auto mt-5">
          {/* 白卡 */}
          <div
            className={mStyle.card + ' container mt-5 mb-5 d-flex flex-column'}
          >
            <div
              className={
                oStyles.bg_card + ' container d-flex justify-content-end py-3'
              }
            >
              <Dropdown className="p-3">
                <Dropdown.Toggle
                  variant="danger"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center ${styles.statusBtn}`}
                >
                  <h6 className={`mb-0 fw-bold d-md-block ${styles.textColor}`}>
                    依訂單狀態
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>待出貨</Dropdown.Item>
                  <Dropdown.Item>運送中</Dropdown.Item>
                  <Dropdown.Item>已完成</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="m-3">
                <Dropdown.Toggle
                  variant="secondary"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                >
                  <h6 className={`mb-0 fw-bold d-md-block ${styles.textColor}`}>
                    依時間排序
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>從新到舊</Dropdown.Item>
                  <Dropdown.Item>從舊到新</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* CARD TITLE */}
            {/* div這樣是一個賣場的所有商品 */}
            <div>
              <Card className={oStyles.order_xs + ' px-5 d-flex flex-row'}>
                <Card.Body
                  className={
                    oStyles.nopdmn +
                    ' d-flex flex-row m-2 justify-content-between align-items-center'
                  }
                >
                  <div
                    className={
                      oStyles.nopdmn_xs +
                      ' me-3 text-info d-flex align-items-center flex-wrap'
                    }
                  >
                    <FaShop className="me-3 fw-bold" />
                    <h5 className="text-info fw-bold">泰山的賣場</h5>
                    <Button
                      className={oStyles.nopdmn_block_xs + ' mx-5 fw-bold'}
                      variant="secondary"
                    >
                      逛逛賣場
                    </Button>
                  </div>

                  <h5
                    className={oStyles.nopdmn_xs + ' pe-5 text-danger fw-bold'}
                  >
                    待出貨
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY */}
              <Card
                className={oStyles.order_xs + ' px-5 container d-flex flex-row'}
              >
                <div className={oStyles.img_frame + ' m-3'}>
                  <Image className={oStyles.img_fit} src={aragami} />
                </div>
                <Card.Body
                  className={
                    oStyles.nopdmn_xs +
                    ' d-flex flex-row m-3 justify-content-between '
                  }
                >
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className={oStyles.h4text_xs + ' mx-3'}>
                      MOTOGP 2023 攜帶版 便宜賣 必收藏
                    </h5>
                    <h5 className={oStyles.h6text_xs + ' mx-3 my-3'}>x 1</h5>
                  </div>
                  <h5
                    className={
                      oStyles.h5text_xs +
                      ' mx-2 me-5 mt-4 d-flex justify-content-center'
                    }
                  >
                    $ 699
                  </h5>
                </Card.Body>
              </Card>

              <Card
                className={oStyles.order_xs + ' px-5 container d-flex flex-row'}
              >
                <div className={oStyles.img_frame + ' m-3'}>
                  <Image className={oStyles.img_fit} src={aragami} />
                </div>
                <Card.Body
                  className={
                    oStyles.nopdmn_xs +
                    ' d-flex flex-row m-3 justify-content-between '
                  }
                >
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className={oStyles.h4text_xs + ' mx-3'}>
                      MOTOGP 2023 攜帶版 便宜賣 必收藏
                    </h5>
                    <h5 className={oStyles.h6text_xs + ' mx-3 my-3'}>x 1</h5>
                  </div>
                  <h5
                    className={
                      oStyles.h5text_xs +
                      ' mx-2 me-5 mt-4 d-flex justify-content-center'
                    }
                  >
                    $ 699
                  </h5>
                </Card.Body>
              </Card>

              <Card
                className={oStyles.order_xs + ' px-5 container d-flex flex-row'}
              >
                <div className={oStyles.img_frame + ' m-3'}>
                  <Image className={oStyles.img_fit} src={aragami} />
                </div>
                <Card.Body
                  className={
                    oStyles.nopdmn_xs +
                    ' d-flex flex-row m-3 justify-content-between '
                  }
                >
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className={oStyles.h4text_xs + ' mx-3'}>
                      MOTOGP 2023 攜帶版 便宜賣 必收藏
                    </h5>
                    <h5 className={oStyles.h6text_xs + ' mx-3 my-3'}>x 1</h5>
                  </div>
                  <h5
                    className={
                      oStyles.h5text_xs +
                      ' mx-2 me-5 mt-4 d-flex justify-content-center'
                    }
                  >
                    $ 699
                  </h5>
                </Card.Body>
              </Card>
            </div>

            {/* div這樣是一個賣場的所有商品 */}
            {/* div這樣是一個賣場的所有商品 */}
            <div>
              <Card className={oStyles.order_xs + ' px-5 d-flex flex-row'}>
                <Card.Body
                  className={
                    oStyles.nopdmn +
                    ' d-flex flex-row m-2 justify-content-between align-items-center'
                  }
                >
                  <div
                    className={
                      oStyles.nopdmn_xs +
                      ' me-3 text-info d-flex align-items-center flex-wrap'
                    }
                  >
                    <FaShop className="me-3 fw-bold" />
                    <h5 className="text-info fw-bold">泰山的小小賣場</h5>
                    <Button
                      className={oStyles.nopdmn_block_xs + ' mx-5 fw-bold'}
                      variant="secondary"
                    >
                      逛逛賣場
                    </Button>
                  </div>

                  <h5
                    className={oStyles.nopdmn_xs + ' pe-5 text-danger fw-bold'}
                  >
                    待出貨
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY */}
              <Card
                className={oStyles.order_xs + ' px-5 container d-flex flex-row'}
              >
                <div className={oStyles.img_frame + ' m-3'}>
                  <Image className={oStyles.img_fit} src={aragami} />
                </div>
                <Card.Body
                  className={
                    oStyles.nopdmn_xs +
                    ' d-flex flex-row m-3 justify-content-between '
                  }
                >
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className={oStyles.h4text_xs + ' mx-3'}>
                      MOTOGP 2023 攜帶版 便宜賣 必收藏
                    </h5>
                    <h5 className={oStyles.h6text_xs + ' mx-3 my-3'}>x 1</h5>
                  </div>
                  <h5
                    className={
                      oStyles.h5text_xs +
                      ' mx-2 me-5 mt-4 d-flex justify-content-center'
                    }
                  >
                    $ 699
                  </h5>
                </Card.Body>
              </Card>

              <Card
                className={oStyles.order_xs + ' px-5 container d-flex flex-row'}
              >
                <div className={oStyles.img_frame + ' m-3'}>
                  <Image className={oStyles.img_fit} src={aragami} />
                </div>
                <Card.Body
                  className={
                    oStyles.nopdmn_xs +
                    ' d-flex flex-row m-3 justify-content-between '
                  }
                >
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className={oStyles.h4text_xs + ' mx-3'}>
                      MOTOGP 2023 攜帶版 便宜賣 必收藏
                    </h5>
                    <h5 className={oStyles.h6text_xs + ' mx-3 my-3'}>x 1</h5>
                  </div>
                  <h5
                    className={
                      oStyles.h5text_xs +
                      ' mx-2 me-5 mt-4 d-flex justify-content-center'
                    }
                  >
                    $ 699
                  </h5>
                </Card.Body>
              </Card>
            </div>

            <Paginage />
          </div>
        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}
