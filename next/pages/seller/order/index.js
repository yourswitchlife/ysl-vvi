import React, { useEffect } from 'react'
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import { FaStar } from 'react-icons/fa'
import Link from 'next/link'
import profileImg from '@/public/images/profile-photo/peach.png'
import defaultHead from '@/public/images/profile-photo/default-profile-img.svg'
import gameCover from '@/public/images/seller/product-cover/crymachina.jpg'
import Image from 'next/image'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaCalendarAlt } from 'react-icons/fa'
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

export default function Order() {
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
              <Tabs
                defaultActiveKey="all-order"
                id="orderStatusTabs"
                className="mb-3"
                justify
              >
                <Tab eventKey="all-order" title="全部訂單">
                  <Form>
                    <Form.Group className="mb-3" controlId="dateSelect">
                      <Form.Label className="text-dark">
                        訂單成立日期
                      </Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectStart"
                            aria-describedby="dateSelectStart"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                        <span className="text-dark mb-0 mx-2">-</span>
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectEnd"
                            aria-describedby="dateSelectEnd"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <InputGroup className="mb-3">
                      <DropdownButton
                        variant="dark"
                        title="訂單編號"
                        id="searchAreaBtn"
                      >
                        <Dropdown.Item href="#">訂單編號</Dropdown.Item>
                        <Dropdown.Item href="#">會員名稱</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="searchAreaText" />
                    </InputGroup>
                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-danger me-2">
                        搜尋
                      </button>
                      <button type="button" className="btn btn-danger">
                        取消
                      </button>
                    </div>
                  </Form>
                  <h5 className="text-dark fw-bold">41筆訂單</h5>
                  <div className="container">
                    {/*--------------Rating Subtitle------------------ */}
                    <div
                      className={`row my-3 py-2 justify-content-center text-start ${styles.ratingST}`}
                    >
                      <h6 className="mb-0 col-4 fw-normal">商品</h6>
                      <h6 className="mb-0 col-2 fw-normal">付款金額</h6>
                      <h6 className="mb-0 col-2 fw-normal">狀態</h6>
                      <h6 className="mb-0 col-2 fw-normal">運送方式</h6>
                      <h6 className="mb-0 col-2 fw-normal">操作</h6>
                    </div>
                  </div>
                  {/*--------------Rating Content------------------ */}
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：1025484548W
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex justify-content-start align-items-center mt-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <div>
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                                <span className="text-info ms-2">x1</span>
                              </p>
                              <p className="text-secondary ms-2">
                                規格：中文版
                              </p>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$1390</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：1025484548W
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex justify-content-start align-items-center mt-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <div>
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                                <span className="text-info ms-2">x1</span>
                              </p>
                              <p className="text-secondary ms-2">
                                規格：中文版
                              </p>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$1390</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Pagination />
                </Tab>
                <Tab eventKey="unsend" title="待出貨">
                  <Form>
                    <Form.Group className="mb-3" controlId="dateSelect">
                      <Form.Label className="text-dark">
                        訂單成立日期
                      </Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectStart"
                            aria-describedby="dateSelectStart"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                        <span className="text-dark mb-0 mx-2">-</span>
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectEnd"
                            aria-describedby="dateSelectEnd"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <InputGroup className="mb-3">
                      <DropdownButton
                        variant="dark"
                        title="訂單編號"
                        id="searchAreaBtn"
                      >
                        <Dropdown.Item href="#">訂單編號</Dropdown.Item>
                        <Dropdown.Item href="#">會員名稱</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="searchAreaText" />
                    </InputGroup>
                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-danger me-2">
                        搜尋
                      </button>
                      <button type="button" className="btn btn-danger">
                        取消
                      </button>
                    </div>
                  </Form>
                  <h5 className="text-dark fw-bold">41筆訂單</h5>
                  <div className="container">
                    {/*--------------Rating Subtitle------------------ */}
                    <div
                      className={`row my-3 py-2 justify-content-center text-start ${styles.ratingST}`}
                    >
                      <h6 className="mb-0 col-4 fw-normal">商品</h6>
                      <h6 className="mb-0 col-2 fw-normal">付款金額</h6>
                      <h6 className="mb-0 col-2 fw-normal">狀態</h6>
                      <h6 className="mb-0 col-2 fw-normal">運送方式</h6>
                      <h6 className="mb-0 col-2 fw-normal">操作</h6>
                    </div>
                  </div>
                  {/*--------------Rating Content------------------ */}
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：1025484548W
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex justify-content-start align-items-center mt-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <div>
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                                <span className="text-info ms-2">x1</span>
                              </p>
                              <p className="text-secondary ms-2">
                                規格：中文版
                              </p>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$1390</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：1025484548W
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex justify-content-start align-items-center mt-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <div>
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                                <span className="text-info ms-2">x1</span>
                              </p>
                              <p className="text-secondary ms-2">
                                規格：中文版
                              </p>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$1390</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Pagination />
                </Tab>
                <Tab eventKey="sending" title="運送中">
                  <Form>
                    <Form.Group className="mb-3" controlId="dateSelect">
                      <Form.Label className="text-dark">
                        訂單成立日期
                      </Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectStart"
                            aria-describedby="dateSelectStart"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                        <span className="text-dark mb-0 mx-2">-</span>
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectEnd"
                            aria-describedby="dateSelectEnd"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <InputGroup className="mb-3">
                      <DropdownButton
                        variant="dark"
                        title="訂單編號"
                        id="searchAreaBtn"
                      >
                        <Dropdown.Item href="#">訂單編號</Dropdown.Item>
                        <Dropdown.Item href="#">會員名稱</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="searchAreaText" />
                    </InputGroup>
                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-danger me-2">
                        搜尋
                      </button>
                      <button type="button" className="btn btn-danger">
                        取消
                      </button>
                    </div>
                  </Form>
                  <h5 className="text-dark fw-bold">41筆訂單</h5>
                  <div className="container">
                    {/*--------------Rating Subtitle------------------ */}
                    <div
                      className={`row my-3 py-2 justify-content-center text-start ${styles.ratingST}`}
                    >
                      <h6 className="mb-0 col-4 fw-normal">商品</h6>
                      <h6 className="mb-0 col-2 fw-normal">付款金額</h6>
                      <h6 className="mb-0 col-2 fw-normal">狀態</h6>
                      <h6 className="mb-0 col-2 fw-normal">運送方式</h6>
                      <h6 className="mb-0 col-2 fw-normal">操作</h6>
                    </div>
                  </div>
                  {/*--------------Rating Content------------------ */}
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：1025484548W
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex justify-content-start align-items-center mt-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <div>
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                                <span className="text-info ms-2">x1</span>
                              </p>
                              <p className="text-secondary ms-2">
                                規格：中文版
                              </p>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$1390</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：1025484548W
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex justify-content-start align-items-center mt-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <div>
                              <p className="mb-0 text-dark ms-2">
                                集合啦！動物森友會
                                <span className="text-info ms-2">x1</span>
                              </p>
                              <p className="text-secondary ms-2">
                                規格：中文版
                              </p>
                            </div>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">NT$1390</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-2">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              更新狀態
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Pagination />
                </Tab>
                <Tab eventKey="done" title="已完成">
                  <h6 className="text-secondary">尚無訂單資訊</h6>
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
                id="orderStatusTabs-mobile"
                className="mb-3"
                justify
              >
                <Tab eventKey="all-order" title="全部">
                  <Form>
                    <Form.Group className="mb-3" controlId="dateSelect">
                      <Form.Label>
                        訂單成立日期
                      </Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectStart"
                            aria-describedby="dateSelectStart"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                        <span className="mb-0 mx-2">-</span>
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectEnd"
                            aria-describedby="dateSelectEnd"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <InputGroup className="mb-3">
                      <DropdownButton
                        variant="dark"
                        title="訂單編號"
                        id="searchAreaBtn"
                      >
                        <Dropdown.Item href="#">訂單編號</Dropdown.Item>
                        <Dropdown.Item href="#">會員名稱</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="searchAreaText" />
                    </InputGroup>
                    <div className="d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-danger btn-sm me-2">
                        搜尋
                      </button>
                      <button type="button" className="btn btn-danger btn-sm">
                        取消
                      </button>
                    </div>
                  </Form>
                  <hr />
                  <h5 className="fw-bold mb-2">41筆訂單</h5>
                  {/*--------------Rating Content------------------ */}
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Pagination />
                </Tab>
                <Tab eventKey="unsend" title="待出貨">
                <Form>
                    <Form.Group className="mb-3" controlId="dateSelect">
                      <Form.Label>
                        訂單成立日期
                      </Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectStart"
                            aria-describedby="dateSelectStart"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                        <span className="mb-0 mx-2">-</span>
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectEnd"
                            aria-describedby="dateSelectEnd"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <InputGroup className="mb-3">
                      <DropdownButton
                        variant="dark"
                        title="訂單編號"
                        id="searchAreaBtn"
                      >
                        <Dropdown.Item href="#">訂單編號</Dropdown.Item>
                        <Dropdown.Item href="#">會員名稱</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="searchAreaText" />
                    </InputGroup>
                    <div className="d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-danger btn-sm me-2">
                        搜尋
                      </button>
                      <button type="button" className="btn btn-danger btn-sm">
                        取消
                      </button>
                    </div>
                  </Form>
                  <hr />
                  <h5 className="fw-bold mb-2">41筆訂單</h5>
                  {/*--------------Rating Content------------------ */}
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Pagination />
                </Tab>
                <Tab eventKey="sending" title="運送中">
                <Form>
                    <Form.Group className="mb-3" controlId="dateSelect">
                      <Form.Label>
                        訂單成立日期
                      </Form.Label>
                      <div className="d-flex justify-content-between align-items-center">
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectStart"
                            aria-describedby="dateSelectStart"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                        <span className="mb-0 mx-2">-</span>
                        <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                          <Form.Control
                            type="date"
                            aria-label="dateSelectEnd"
                            aria-describedby="dateSelectEnd"
                            className={styles.dateInput}
                          />
                        </InputGroup>
                      </div>
                    </Form.Group>
                    <InputGroup className="mb-3">
                      <DropdownButton
                        variant="dark"
                        title="訂單編號"
                        id="searchAreaBtn"
                      >
                        <Dropdown.Item href="#">訂單編號</Dropdown.Item>
                        <Dropdown.Item href="#">會員名稱</Dropdown.Item>
                      </DropdownButton>
                      <Form.Control aria-label="searchAreaText" />
                    </InputGroup>
                    <div className="d-flex justify-content-center align-items-center">
                      <button type="button" className="btn btn-danger btn-sm me-2">
                        搜尋
                      </button>
                      <button type="button" className="btn btn-danger btn-sm">
                        取消
                      </button>
                    </div>
                  </Form>
                  <hr />
                  <h5 className="fw-bold mb-2">41筆訂單</h5>
                  {/*--------------Rating Content------------------ */}
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={defaultHead}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：10284390548H
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                            <div className="d-flex justify-content-start align-items-center">
                              <Image
                                src={gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  集合啦！動物森友會
                                  <span className="text-info ms-2">x1</span>
                                </p>
                                <p className="text-secondary ms-2">
                                  規格：中文版
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT$2580</p>
                            <p className="text-secondary">貨到付款</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              href="/comment/reply"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Pagination />
                </Tab>
                <Tab eventKey="done" title="已完成">
                  <h6 className="text-secondary">尚無訂單資訊</h6>
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
