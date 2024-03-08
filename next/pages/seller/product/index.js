import React, { useEffect } from 'react'
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import { FaStar, FaPlus, FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'
import profileImg from '@/public/images/profile-photo/peach.png'
import defaultHead from '@/public/images/profile-photo/default-profile-img.svg'
import gameCover from '@/public/images/seller/product-cover/crymachina.jpg'
import Image from 'next/image'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaCalendarAlt } from 'react-icons/fa'
import { BsFiles, BsSignStopLightsFill, BsHeart, BsFlag } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Pagination from '@/components/common/pagination'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import BreadCrumb from '@/components/common/breadcrumb'

export default function Product() {
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)
    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
    }
  }, [])

  // function handleSubmit(e) {
  //   e.prevent.default()
  // }

  return (
    <>
      <header>
        <SellerNavbar />
      </header>
      <main className={styles.mainContainer}>
        <div className="d-none d-md-block">
          <Sidebar />
        </div>
        <div>
          {/* cover */}
          <SellerCover />
          <div className="d-flex flex-column d-lg-none container ps-4 pe-4">
            <div className="d-flex justify-content-around align-items-center mt-4 mb-2">
              <div className={`${styles.profile}`}>
                <Image src={profileImg} alt="" className={styles.fit} />
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center">
                <h5 className="mb-1 fw-bold">碧姬公主的玩具城堡</h5>
                <p className="mb-1">ysl.com/princepeach8888</p>
              </div>
              <div>
                <button className="btn btn-danger btn-sm">查看賣場</button>
              </div>
            </div>
            <hr />
          </div>
          <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
            <BreadCrumb />
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <div className="d-flex justify-content-start align-items-center mb-3">
                <h5 className="text-dark fw-bold">我的商品</h5>
                <h6 className="text-secondary ms-2">查看您的賣場商品</h6>
              </div>
              <Form className="row">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">商品名稱</h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">類別名稱</h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入類別名稱" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="productAmount">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">商品數量</h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="最小值" />
                      <p className="text-dark mx-2">-</p>
                      <Form.Control type="text" placeholder="最大值" />
                    </div>
                  </Form.Group>
                </div>
                <div className="d-flex justify-content-start align-items-center mt-2">
                  <button type="button" className="btn btn-danger me-2">
                    搜尋
                  </button>
                  <button type="button" className="btn btn-danger">
                    取消
                  </button>
                </div>
              </Form>
            </div>
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <Tabs
                defaultActiveKey="all-order"
                id="orderStatusTabs"
                className="mb-3"
              >
                <Tab
                  eventKey="all-order"
                  title={<span style={{ color: '#e41e49' }}>全部</span>}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-bold">152件商品</h5>
                    <Link href="./new">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex align-items-center text-decoration-none"
                    >
                      <FaPlus className="me-1" />
                      <h6 className='text-decoration-none'>新增商品</h6>
                    </button>
                    </Link>
                  </div>
                  <div className="container">
                    {/*--------------Rating Subtitle------------------ */}
                    <div
                      className={`row mt-3 py-2 text-center ${styles.ratingST}`}
                    >
                      <h6 className="mb-0 col-1 fw-normal text-start"><Form.Check aria-label="option 1" /></h6>
                      <h6 className="mb-0 col-3 fw-normal">商品名稱</h6>
                      <h6 className="mb-0 col-1 fw-normal">級別</h6>
                      <h6 className="mb-0 col-1 fw-normal">語言</h6>
                      <h6 className="mb-0 col-2 fw-normal">
                        售價 <span className={styles.fsSmall}>(原價)</span>
                      </h6>
                      <h6 className="mb-0 col-1 fw-normal">數量</h6>
                      <h6 className="mb-0 col-1 fw-normal px-0">已售出</h6>
                      <h6 className="mb-0 col-2 fw-normal">操作</h6>
                    </div>
                  </div>
                  {/*--------------Rating Content------------------ */}
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start"><Form.Check aria-label="option 1" /></h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </Tab>
                <Tab
                  eventKey="unsend"
                  title={<span style={{ color: '#2D2D2D' }}>架上商品</span>}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-bold">152件商品</h5>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex align-items-center"
                    >
                      <FaPlus className="me-1" />
                      新增商品
                    </button>
                  </div>
                  <div className="container">
                    {/*--------------Rating Subtitle------------------ */}
                    <div
                      className={`row mt-3 py-2 text-center ${styles.ratingST}`}
                    >
                      <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                      <h6 className="mb-0 col-3 fw-normal">商品名稱</h6>
                      <h6 className="mb-0 col-1 fw-normal">級別</h6>
                      <h6 className="mb-0 col-1 fw-normal">語言</h6>
                      <h6 className="mb-0 col-2 fw-normal">
                        售價 <span className={styles.fsSmall}>(原價)</span>
                      </h6>
                      <h6 className="mb-0 col-1 fw-normal">數量</h6>
                      <h6 className="mb-0 col-1 fw-normal px-0">已售出</h6>
                      <h6 className="mb-0 col-2 fw-normal">操作</h6>
                    </div>
                  </div>
                  {/*--------------Rating Content------------------ */}
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </Tab>
                <Tab
                  eventKey="sending"
                  title={<span style={{ color: '#2D2D2D' }}>已售完</span>}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-bold">152件商品</h5>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex align-items-center"
                    >
                      <FaPlus className="me-1" />
                      新增商品
                    </button>
                  </div>
                  <div className="container">
                    {/*--------------Rating Subtitle------------------ */}
                    <div
                      className={`row mt-3 py-2 text-center ${styles.ratingST}`}
                    >
                      <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                      <h6 className="mb-0 col-3 fw-normal">商品名稱</h6>
                      <h6 className="mb-0 col-1 fw-normal">級別</h6>
                      <h6 className="mb-0 col-1 fw-normal">語言</h6>
                      <h6 className="mb-0 col-2 fw-normal">
                        售價 <span className={styles.fsSmall}>(原價)</span>
                      </h6>
                      <h6 className="mb-0 col-1 fw-normal">數量</h6>
                      <h6 className="mb-0 col-1 fw-normal px-0">已售出</h6>
                      <h6 className="mb-0 col-2 fw-normal">操作</h6>
                    </div>
                  </div>
                  {/*--------------Rating Content------------------ */}
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 border-bottom">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start">O</h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                              </p>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-2 text-secondary" />
                                <p className="text-secondary ms-1">9</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <p className="text-secondary">普遍級</p>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <p className="text-secondary">中文版</p>
                          <p className="text-secondary">英文版</p>
                          <p className="text-secondary">日文版</p>
                        </div>
                        <div className="col-2">
                          <p className="fw-bold">NT$ 760</p>
                          <p className="text-secondary">(NT$ 990)</p>
                        </div>
                        <div className="col-1">
                          <p>3</p>
                        </div>
                        <div className="col-1">
                          <p>1</p>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm mb-1"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger btn-sm"
                          >
                            下架
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Pagination />
                </Tab>
                <Tab
                  eventKey="done"
                  title={<span style={{ color: '#2D2D2D' }}>未上架</span>}
                >
                  <h6 className="text-secondary">尚無商品資訊</h6>
                </Tab>
              </Tabs>
              {/* <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="text-dark mb-0 me-3">41筆評價</h5>
                <div className="d-flex ">
                  <Dropdown className="me-2">
                    <Dropdown.Toggle
                      variant="success"
                      id="ranking"
                      type="button"
                      className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                    >
                      <h6
                        className={`mb-0 d-none d-md-block ${styles.textColor}`}
                      >
                        訂單成立時間
                      </h6>
                      <p className="mb-0 d-block d-md-none">訂單成立時間</p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        時間由近到遠
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        時間由遠到近
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="ranking"
                      type="button"
                      className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                    >
                      <h6
                        className={`mb-0 d-none d-md-block ${styles.textColor}`}
                      >
                        評價分數
                      </h6>
                      <p className="mb-0 d-block d-md-none">評價分數</p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        分數由高到低
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        分數由低到高
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div> */}
            </div>
          </div>
          <div className="d-block d-md-none container ps-4 pe-4">
            <Tabs
              defaultActiveKey="all-order"
              id="orderStatusTabs"
              className="mb-3"
            >
              <Tab
                eventKey="all-order"
                title={<span style={{ color: '#e41e49' }}>全部</span>}
              >
                <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>遊戲類別</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入類別名稱" />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                    >
                      搜尋
                    </button>
                    <button type="button" className="btn btn-danger btn-sm">
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold">152件商品</h6>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                  >
                    <FaPlus className="me-1" />
                    新增商品
                  </button>
                </div>
                {/*--------------Rating Content------------------ */}
                <div className={`px-3 py-2 mb-2 ${styles.productCard}`}>
                  <div className="text-dark">
                    <div className="row align-items-center text-center">
                      <h6 className="mb-0 col-2 fw-normal text-start">O</h6>
                      <div className="col-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={42}
                            height={70}
                          />
                          <div className="d-flex justify-content-start align-items-start flex-column">
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                            </p>
                            <div>
                              <p className="text-secondary ms-2">NT$ 760</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm mb-1"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm"
                        >
                          下架
                        </button>
                      </div>
                      <hr className='mb-2 mt-1'/>
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                      <BsFlag className='me-1 fs-small'/>
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                      <BsFiles className='me-1'/>
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className='me-1'/>
                        <p className="text-secondary">已售出 1</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <BsHeart className="me-1" />
                        <p className="text-secondary">收藏 9</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-2 mb-2 ${styles.productCard}`}>
                  <div className="text-dark">
                    <div className="row align-items-center text-center">
                      <h6 className="mb-0 col-2 fw-normal text-start">O</h6>
                      <div className="col-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={42}
                            height={70}
                          />
                          <div className="d-flex justify-content-start align-items-start flex-column">
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                            </p>
                            <div>
                              <p className="text-secondary ms-2">NT$ 760</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm mb-1"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm"
                        >
                          下架
                        </button>
                      </div>
                      <hr className='mb-2 mt-1'/>
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                      <BsFlag className='me-1 fs-small'/>
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                      <BsFiles className='me-1'/>
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className='me-1'/>
                        <p className="text-secondary">已售出 1</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <BsHeart className="me-1" />
                        <p className="text-secondary">收藏 9</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-2 mb-2 ${styles.productCard}`}>
                  <div className="text-dark">
                    <div className="row align-items-center text-center">
                      <h6 className="mb-0 col-2 fw-normal text-start">O</h6>
                      <div className="col-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={42}
                            height={70}
                          />
                          <div className="d-flex justify-content-start align-items-start flex-column">
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                            </p>
                            <div>
                              <p className="text-secondary ms-2">NT$ 760</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm mb-1"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm"
                        >
                          下架
                        </button>
                      </div>
                      <hr className='mb-2 mt-1'/>
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                      <BsFlag className='me-1 fs-small'/>
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                      <BsFiles className='me-1'/>
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className='me-1'/>
                        <p className="text-secondary">已售出 1</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <BsHeart className="me-1" />
                        <p className="text-secondary">收藏 9</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-2 mb-2 ${styles.productCard}`}>
                  <div className="text-dark">
                    <div className="row align-items-center text-center">
                      <h6 className="mb-0 col-2 fw-normal text-start">O</h6>
                      <div className="col-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={42}
                            height={70}
                          />
                          <div className="d-flex justify-content-start align-items-start flex-column">
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                            </p>
                            <div>
                              <p className="text-secondary ms-2">NT$ 760</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm mb-1"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm"
                        >
                          下架
                        </button>
                      </div>
                      <hr className='mb-2 mt-1'/>
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                      <BsFlag className='me-1 fs-small'/>
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                      <BsFiles className='me-1'/>
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className='me-1'/>
                        <p className="text-secondary">已售出 1</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <BsHeart className="me-1" />
                        <p className="text-secondary">收藏 9</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-2 mb-2 ${styles.productCard}`}>
                  <div className="text-dark">
                    <div className="row align-items-center text-center">
                      <h6 className="mb-0 col-2 fw-normal text-start">O</h6>
                      <div className="col-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={42}
                            height={70}
                          />
                          <div className="d-flex justify-content-start align-items-start flex-column">
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                            </p>
                            <div>
                              <p className="text-secondary ms-2">NT$ 760</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm mb-1"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm"
                        >
                          下架
                        </button>
                      </div>
                      <hr className='mb-2 mt-1'/>
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                      <BsFlag className='me-1 fs-small'/>
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                      <BsFiles className='me-1'/>
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className='me-1'/>
                        <p className="text-secondary">已售出 1</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <BsHeart className="me-1" />
                        <p className="text-secondary">收藏 9</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-2 mb-2 ${styles.productCard}`}>
                  <div className="text-dark">
                    <div className="row align-items-center text-center">
                      <h6 className="mb-0 col-2 fw-normal text-start">O</h6>
                      <div className="col-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={42}
                            height={70}
                          />
                          <div className="d-flex justify-content-start align-items-start flex-column">
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                            </p>
                            <div>
                              <p className="text-secondary ms-2">NT$ 760</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm mb-1"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger btn-sm"
                        >
                          下架
                        </button>
                      </div>
                      <hr className='mb-2 mt-1'/>
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                      <BsFlag className='me-1 fs-small'/>
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                      <BsFiles className='me-1'/>
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className='me-1'/>
                        <p className="text-secondary">已售出 1</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <BsHeart className="me-1" />
                        <p className="text-secondary">收藏 9</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Pagination />
              </Tab>
              <Tab eventKey="unsend" title="架上商品">
              <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>遊戲類別</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入類別名稱" />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                    >
                      搜尋
                    </button>
                    <button type="button" className="btn btn-danger btn-sm">
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
              </Tab>
              <Tab
                eventKey="sending"
                title="已售完"
              >
                <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>遊戲類別</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入類別名稱" />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                    >
                      搜尋
                    </button>
                    <button type="button" className="btn btn-danger btn-sm">
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
              </Tab>
              <Tab
                eventKey="done"
                title="未上架"
              >
              <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>遊戲類別</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入類別名稱" />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                    >
                      搜尋
                    </button>
                    <button type="button" className="btn btn-danger btn-sm">
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
                <h6 className="text-secondary">尚無商品資訊</h6>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className={`d-block d-md-none ${styles.spaceForPhoneTab}`}></div>
        <div className="d-block d-md-none">
          <PhoneTabNav />
        </div>
        <div className="d-none d-md-block">
          <SellerFooter />
        </div>
      </main>
    </>
  )
}
