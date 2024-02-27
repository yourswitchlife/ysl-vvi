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
import { BsFiles, BsSignStopLightsFill, BsHeart, BsFlag } from 'react-icons/bs'
import { IoBagCheckOutline } from 'react-icons/io5'
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

export default function New() {
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
                <h5 className="text-dark fw-bold">商品基本資訊</h5>
                <h6 className="text-secondary ms-2">新增您的賣場商品</h6>
              </div>
              <Form className="row">
                  <Form.Group className="mb-3 col-12" controlId="productCover">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          商品封面照<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="請選擇商品封面照"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-12" controlId="productCover">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0 d-flex align-items-end">
                        <h5 className="text-dark mb-0">商品詳細照</h5>
                        <p className="text-secondary mb-1">
                          (1~3張)<span className="text-danger">*</span>
                        </p>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="請選擇商品封面照"
                        multiple
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          商品名稱<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3 col-6" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          遊戲類別<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>請選擇遊戲類別</option>
                        <option value="1">RPG - 角色扮演</option>
                        <option value="2">AVG - 冒險遊戲</option>
                        <option value="3">ETC - 其他類型</option>
                        <option value="4">ACT - 動作遊戲</option>
                        <option value="5">SLG - 策略遊戲</option>
                        <option value="6">RAC - 競速遊戲</option>
                        <option value="7">SPG - 體育遊戲</option>
                        <option value="8">STG - 射擊遊戲</option>
                        <option value="9">FTG - 格鬥遊戲</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          遊戲分級<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>請選擇遊戲級別</option>
                        <option value="1">普遍級</option>
                        <option value="2">保護級</option>
                        <option value="3">輔導級</option>
                        <option value="4">限制級</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  {/* {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label={`default ${type}`}
                      />
                    </div>
                  ))} */}
                  <div key="lang-checkbox" className="mb-1 d-flex justify-content-start align-items-center col-6">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          語言<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="中文版"
                        className='text-dark me-2'
                      />
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="日文版"
                        className='text-dark me-2'
                      />
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="英文版"
                        className='text-dark me-2'
                      />
                    </div>
                    <Form.Group
                  className="mb-3 col-12"
                  controlId="product-details"
                >
                  <Form.Label>賣場介紹</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="請輸入30~50字的賣場介紹"
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <button type="button" className="btn btn-danger me-2">
                    儲存並上架
                  </button>
                  <button type="button" className={`btn ${styles.btnDangerOutlined} me-2`}>
                    儲存暫不上架
                  </button>
                  <button type="button" className={`btn ${styles.btnGrayOutlined}`}>
                    取消
                  </button>
                </div>
              </Form>
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
                      <hr className="mb-2 mt-1" />
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                        <BsFlag className="me-1 fs-small" />
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <BsFiles className="me-1" />
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className="me-1" />
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
                      <hr className="mb-2 mt-1" />
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                        <BsFlag className="me-1 fs-small" />
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <BsFiles className="me-1" />
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className="me-1" />
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
                      <hr className="mb-2 mt-1" />
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                        <BsFlag className="me-1 fs-small" />
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <BsFiles className="me-1" />
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className="me-1" />
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
                      <hr className="mb-2 mt-1" />
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                        <BsFlag className="me-1 fs-small" />
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <BsFiles className="me-1" />
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className="me-1" />
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
                      <hr className="mb-2 mt-1" />
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                        <BsFlag className="me-1 fs-small" />
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <BsFiles className="me-1" />
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className="me-1" />
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
                      <hr className="mb-2 mt-1" />
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                        <BsFlag className="me-1 fs-small" />
                        <p className="text-secondary">級別 普遍級</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                        <BsFiles className="me-1" />
                        <p className="text-secondary">商品數量 3</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className="me-1" />
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
              <Tab eventKey="sending" title="已售完">
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
              <Tab eventKey="done" title="未上架">
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
