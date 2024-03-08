import React, { useState } from 'react'
import Image from 'next/image'
import profileImg from '@/public/images/profile-photo/peach.png'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import pStyle from '@/styles/member/points.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import fsStyle from '@/styles/member/fav-s.module.scss'
import styles from '@/styles/member/mseller.module.scss'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'
import Paginage from '@/components/common/pagination'
import { FaMinus, FaAngleDown, FaFilter, FaStar } from 'react-icons/fa'
import { wrap } from 'lodash'

export default function FavShop() {
  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="container d-flex flex-column  align-items-center pt-5">
          <div
            className={
              mStyle.product_card +
              ' container d-flex flex-column align-items-center pb-5 bg-white mb-5'
            }
          >
            <div className={fpStyle.page_check + ' pt-5'}>
              <Link href="/member/fav-product" className={fsStyle.pagep_btn}>
                <span></span>商品
              </Link>
              <h3 className={pStyle.gray_text}>|</h3>
              <Link href="/member/fav-shop" className={fsStyle.pages_btn}>
                賣場
              </Link>
            </div>
            <div className="container d-flex justify-content-end py-3 pe-5">
              <Dropdown className="me-3">
                <Dropdown.Toggle
                  variant="secondary"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                >
                  <h6 className={`mb-0 d-md-block ${styles.textColor}`}>
                    依時間排序
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>從新到舊</Dropdown.Item>
                  <Dropdown.Item>從舊到新</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* 迴圈 */}
            <div
              className={
                styles.seller_frame +
                ' d-flex justify-content-between align-items-center mb-2'
              }
            >
              <div
                className={
                  styles.seller_xs +
                  ' d-flex mb-4 mt-3 justify-content-center flex-grow-1'
                }
              >
                {/* seller detail */}
                <div className={styles.profile + ' me-5'}>
                  <Image src={profileImg} alt="" className={styles.fit} />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center ms-3">
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        styles.wid_xs +
                        ' d-flex justify-content-center align-items-center flex-wrap'
                      }
                    >
                      <h4 className={styles.h4text_xs + '  pe-5 fw-bold'}>
                        碧姬公主的玩具城堡
                      </h4>
                      <h6 className={styles.h6text_xs}>@princepeach8888</h6>
                    </div>

                    <div
                      className={
                        styles.column + ' d-flex align-items-center ps-5'
                      }
                    >
                      {/* star rating */}

                      <h5 className={styles.h6text_xs + ' me-2'}>5.0</h5>
                      <div className={styles.h6text_xs + ' text-warning pe-5'}>
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                      </div>
                      <h5 className={styles.h6text_xs + ' m-auto'}>( 150 )</h5>
                    </div>
                  </div>

                  <div
                    className={
                      styles.sellers +
                      ' d-flex justify-content-between align-items-center'
                    }
                  >
                    {/* little dashboard */}
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        商品數量
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        28
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        已賣出件數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        18
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        關注人數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        186
                      </h5>
                    </div>

                    <Button
                      type="button"
                      className={
                        styles.cancle_xs +
                        ' btn btn-danger d-flex align-items-center'
                      }
                    >
                      <FaMinus className="me-3" />
                      取消收藏
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* 迴圈 */}

            <div
              className={
                styles.seller_frame +
                ' d-flex justify-content-between align-items-center mb-2'
              }
            >
              <div
                className={
                  styles.seller_xs +
                  ' d-flex mb-4 mt-3 justify-content-center flex-grow-1'
                }
              >
                {/* seller detail */}
                <div className={styles.profile + ' me-5'}>
                  <Image src={profileImg} alt="" className={styles.fit} />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center ms-3">
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        styles.wid_xs +
                        ' d-flex justify-content-center align-items-center flex-wrap'
                      }
                    >
                      <h4 className={styles.h4text_xs + '  pe-5 fw-bold'}>
                        碧姬公主的玩具城堡
                      </h4>
                      <h6 className={styles.h6text_xs}>@princepeach8888</h6>
                    </div>

                    <div
                      className={
                        styles.column + ' d-flex align-items-center ps-5'
                      }
                    >
                      {/* star rating */}

                      <h5 className={styles.h6text_xs + ' me-2'}>5.0</h5>
                      <div className={styles.h6text_xs + ' text-warning pe-5'}>
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                      </div>
                      <h5 className={styles.h6text_xs + ' m-auto'}>( 150 )</h5>
                    </div>
                  </div>

                  <div
                    className={
                      styles.sellers +
                      ' d-flex justify-content-between align-items-center'
                    }
                  >
                    {/* little dashboard */}
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        商品數量
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        28
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        已賣出件數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        18
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        關注人數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        186
                      </h5>
                    </div>

                    <Button
                      type="button"
                      className={
                        styles.cancle_xs +
                        ' btn btn-danger d-flex align-items-center'
                      }
                    >
                      <FaMinus className="me-3" />
                      取消收藏
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                styles.seller_frame +
                ' d-flex justify-content-between align-items-center mb-2'
              }
            >
              <div
                className={
                  styles.seller_xs +
                  ' d-flex mb-4 mt-3 justify-content-center flex-grow-1'
                }
              >
                {/* seller detail */}
                <div className={styles.profile + ' me-5'}>
                  <Image src={profileImg} alt="" className={styles.fit} />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center ms-3">
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        styles.wid_xs +
                        ' d-flex justify-content-center align-items-center flex-wrap'
                      }
                    >
                      <h4 className={styles.h4text_xs + '  pe-5 fw-bold'}>
                        碧姬公主的玩具城堡
                      </h4>
                      <h6 className={styles.h6text_xs}>@princepeach8888</h6>
                    </div>

                    <div
                      className={
                        styles.column + ' d-flex align-items-center ps-5'
                      }
                    >
                      {/* star rating */}

                      <h5 className={styles.h6text_xs + ' me-2'}>5.0</h5>
                      <div className={styles.h6text_xs + ' text-warning pe-5'}>
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                      </div>
                      <h5 className={styles.h6text_xs + ' m-auto'}>( 150 )</h5>
                    </div>
                  </div>

                  <div
                    className={
                      styles.sellers +
                      ' d-flex justify-content-between align-items-center'
                    }
                  >
                    {/* little dashboard */}
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        商品數量
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        28
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        已賣出件數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        18
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        關注人數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        186
                      </h5>
                    </div>

                    <Button
                      type="button"
                      className={
                        styles.cancle_xs +
                        ' btn btn-danger d-flex align-items-center'
                      }
                    >
                      <FaMinus className="me-3" />
                      取消收藏
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                styles.seller_frame +
                ' d-flex justify-content-between align-items-center mb-2'
              }
            >
              <div
                className={
                  styles.seller_xs +
                  ' d-flex mb-4 mt-3 justify-content-center flex-grow-1'
                }
              >
                {/* seller detail */}
                <div className={styles.profile + ' me-5'}>
                  <Image src={profileImg} alt="" className={styles.fit} />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center ms-3">
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        styles.wid_xs +
                        ' d-flex justify-content-center align-items-center flex-wrap'
                      }
                    >
                      <h4 className={styles.h4text_xs + '  pe-5 fw-bold'}>
                        碧姬公主的玩具城堡
                      </h4>
                      <h6 className={styles.h6text_xs}>@princepeach8888</h6>
                    </div>

                    <div
                      className={
                        styles.column + ' d-flex align-items-center ps-5'
                      }
                    >
                      {/* star rating */}

                      <h5 className={styles.h6text_xs + ' me-2'}>5.0</h5>
                      <div className={styles.h6text_xs + ' text-warning pe-5'}>
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                      </div>
                      <h5 className={styles.h6text_xs + ' m-auto'}>( 150 )</h5>
                    </div>
                  </div>

                  <div
                    className={
                      styles.sellers +
                      ' d-flex justify-content-between align-items-center'
                    }
                  >
                    {/* little dashboard */}
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        商品數量
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        28
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        已賣出件數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        18
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        關注人數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        186
                      </h5>
                    </div>

                    <Button
                      type="button"
                      className={
                        styles.cancle_xs +
                        ' btn btn-danger d-flex align-items-center'
                      }
                    >
                      <FaMinus className="me-3" />
                      取消收藏
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                styles.seller_frame +
                ' d-flex justify-content-between align-items-center mb-2'
              }
            >
              <div
                className={
                  styles.seller_xs +
                  ' d-flex mb-4 mt-3 justify-content-center flex-grow-1'
                }
              >
                {/* seller detail */}
                <div className={styles.profile + ' me-5'}>
                  <Image src={profileImg} alt="" className={styles.fit} />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center ms-3">
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        styles.wid_xs +
                        ' d-flex justify-content-center align-items-center flex-wrap'
                      }
                    >
                      <h4 className={styles.h4text_xs + '  pe-5 fw-bold'}>
                        碧姬公主的玩具城堡
                      </h4>
                      <h6 className={styles.h6text_xs}>@princepeach8888</h6>
                    </div>

                    <div
                      className={
                        styles.column + ' d-flex align-items-center ps-5'
                      }
                    >
                      {/* star rating */}

                      <h5 className={styles.h6text_xs + ' me-2'}>5.0</h5>
                      <div className={styles.h6text_xs + ' text-warning pe-5'}>
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                      </div>
                      <h5 className={styles.h6text_xs + ' m-auto'}>( 150 )</h5>
                    </div>
                  </div>

                  <div
                    className={
                      styles.sellers +
                      ' d-flex justify-content-between align-items-center'
                    }
                  >
                    {/* little dashboard */}
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        商品數量
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        28
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        已賣出件數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        18
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        關注人數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        186
                      </h5>
                    </div>

                    <Button
                      type="button"
                      className={
                        styles.cancle_xs +
                        ' btn btn-danger d-flex align-items-center'
                      }
                    >
                      <FaMinus className="me-3" />
                      取消收藏
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                styles.seller_frame +
                ' d-flex justify-content-between align-items-center mb-2'
              }
            >
              <div
                className={
                  styles.seller_xs +
                  ' d-flex mb-4 mt-3 justify-content-center flex-grow-1'
                }
              >
                {/* seller detail */}
                <div className={styles.profile + ' me-5'}>
                  <Image src={profileImg} alt="" className={styles.fit} />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center ms-3">
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        styles.wid_xs +
                        ' d-flex justify-content-center align-items-center flex-wrap'
                      }
                    >
                      <h4 className={styles.h4text_xs + '  pe-5 fw-bold'}>
                        碧姬公主的玩具城堡
                      </h4>
                      <h6 className={styles.h6text_xs}>@princepeach8888</h6>
                    </div>

                    <div
                      className={
                        styles.column + ' d-flex align-items-center ps-5'
                      }
                    >
                      {/* star rating */}

                      <h5 className={styles.h6text_xs + ' me-2'}>5.0</h5>
                      <div className={styles.h6text_xs + ' text-warning pe-5'}>
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                        <FaStar className="me-1" />
                      </div>
                      <h5 className={styles.h6text_xs + ' m-auto'}>( 150 )</h5>
                    </div>
                  </div>

                  <div
                    className={
                      styles.sellers +
                      ' d-flex justify-content-between align-items-center'
                    }
                  >
                    {/* little dashboard */}
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        商品數量
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        28
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        已賣出件數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        18
                      </h5>
                    </div>
                    <div
                      className={
                        styles.padding_xs +
                        ' d-flex flex-column align-items-center pe-5'
                      }
                    >
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        關注人數
                      </h5>
                      <h5 className={styles.h6text_xs + ' text-secondary'}>
                        186
                      </h5>
                    </div>

                    <Button
                      type="button"
                      className={
                        styles.cancle_xs +
                        ' btn btn-danger d-flex align-items-center'
                      }
                    >
                      <FaMinus className="me-3" />
                      取消收藏
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Paginage className={mStyle.paginag} />
          </div>
        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}
