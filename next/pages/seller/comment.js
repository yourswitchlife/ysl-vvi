import React, { useEffect } from 'react'
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import {
  FaHome,
  FaStore,
  FaFileAlt,
  FaStar,
  FaCoins,
  FaPlus,
  FaAngleDown,
  FaFilter,
} from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { IoGameController } from 'react-icons/io5'
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
import Pagination from '@/components/common/pagination'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'

export default function Comment() {
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
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <Form>
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <div className="d-flex justify-content-start align-items-end">
                    <h5 className="text-dark mb-0 me-3">賣場評價</h5>
                    <h6 className="text-secondary fw-normal mb-0">
                      查看您的賣場評價
                    </h6>
                  </div>
                  <h6 className="text-secondary fw-normal mb-0">
                    <span className="text-danger fw-bold fs-4">4.5</span> / 5.0
                  </h6>
                </div>
                <Form.Group className="mb-3" controlId="memberName">
                  <Form.Label className="text-dark">會員名稱</Form.Label>
                  <Form.Control type="text" placeholder="請輸入會員名稱" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateSelect">
                  <Form.Label className="text-dark">評價時間</Form.Label>
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
                <div className="d-flex justify-content-center">
                  {/* <button
                    type="button"
                    href="/"
                    className="btn btn-danger me-2"
                    onChange={handleSubmit}
                  > */}
                  <button type="button" className="btn btn-danger me-2">
                    搜尋
                  </button>
                  <button type="button" className="btn btn-danger">
                    取消
                  </button>
                </div>
              </Form>
            </div>
            <div className={`mb-5 ${styles.dashboardStyle}`}>
              <Nav
                variant="tabs"
                defaultActiveKey="/comment/all"
                className="mb-4"
              >
                <Nav.Item>
                  <Nav.Link href="/comment/all" className="text-danger">
                    全部
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="unreply" className="text-secondary">
                    待回覆
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="replied" className="text-secondary">
                    已回覆
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>
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
              <ButtonGroup aria-label="ratingSort" size="sm">
                <Button variant="secondary">全部</Button>
                <Button variant="secondary">5顆星(141)</Button>
                <Button variant="secondary">4顆星(1)</Button>
                <Button variant="secondary">3顆星(0)</Button>
                <Button variant="secondary">2顆星(0)</Button>
                <Button variant="secondary">1顆星(0)</Button>
              </ButtonGroup>
              <div className="container">
                {/*--------------Rating Subtitle------------------ */}
                <div
                  className={`row my-3 py-2 justify-content-center text-center ${styles.ratingST}`}
                >
                  <h6 className="mb-0 col-4 fw-normal">訂單資訊</h6>
                  <h6 className="mb-0 col-6 fw-normal">評價內容</h6>
                  <h6 className="mb-0 col-2 fw-normal">操作</h6>
                </div>
              </div>
              {/*--------------Rating Content------------------ */}
              <Card border="light" style={{ width: '100%' }} className="mb-3">
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-secondary me-1">會員名稱:</p>
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
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-dark">
                    <p className="mb-0 text-secondary">訂單編號：1025484548W</p>
                  </Card.Title>
                  <div className="text-dark">
                    <div className="row align-items-center">
                      <div className="col-4 border-end d-flex justify-content-center align-items-center mt-2">
                        <Image
                          src={gameCover}
                          alt="game-cover"
                          width={24}
                          height={40}
                        />
                        <p className="mb-0 text-dark ms-2">
                          集合啦！動物森友會
                          <span className="text-info ms-2">x1</span>
                        </p>
                      </div>
                      <div className="col-6 border-end">
                        <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar />
                        </div>
                        <p className="mb-0 text-dark">
                          斯巴拉西！買到超值的二手遊戲好開心～我要成為西施惠的好朋友
                        </p>
                        <small className="text-secondary">
                          2024/02/16 22:51
                        </small>
                      </div>
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger"
                        >
                          回覆
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card border="light" style={{ width: '100%' }} className="mb-3">
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-secondary me-1">會員名稱:</p>
                    <div className={`me-1 ${styles.shapeCircle}`}>
                      <Image src={defaultHead} alt="" width={25} height={25} />
                    </div>
                    <p className="mb-0 text-secondary">zhang.wt</p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-dark">
                    <p className="mb-0 text-secondary">訂單編號：1025484548W</p>
                  </Card.Title>
                  <div className="text-dark mb-2">
                    <div className="row align-items-center">
                      <div className="col-4 border-end d-flex flex-column  justify-content-center align-items-center mt-2">
                        <div className="d-flex justify-content-center align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={24}
                            height={40}
                          />
                          <p className="mb-0 text-dark ms-2">
                            集合啦！動物森友會
                            <span className="text-info ms-2">x1</span>
                          </p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={24}
                            height={40}
                          />
                          <p className="mb-0 text-dark ms-2">
                            集合啦！動物森友會
                            <span className="text-info ms-2">x1</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-6 border-end">
                        <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar />
                        </div>
                        <p className="mb-0 text-dark">
                          斯巴拉西！買到超值的二手遊戲好開心～我要成為西施惠的好朋友
                        </p>
                        <small className="text-secondary">
                          2024/02/16 22:51
                        </small>
                      </div>
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger"
                        >
                          回覆
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card border="light" style={{ width: '100%' }} className="mb-3">
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-secondary me-1">會員名稱:</p>
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
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-dark">
                    <p className="mb-0 text-secondary">訂單編號：1025484548W</p>
                  </Card.Title>
                  <div className="text-dark">
                    <div className="row align-items-center">
                      <div className="col-4 border-end d-flex justify-content-center align-items-center mt-2">
                        <Image
                          src={gameCover}
                          alt="game-cover"
                          width={24}
                          height={40}
                        />
                        <p className="mb-0 text-dark ms-2">
                          集合啦！動物森友會
                          <span className="text-info ms-2">x1</span>
                        </p>
                      </div>
                      <div className="col-6 border-end">
                        <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar />
                        </div>
                        <p className="mb-0 text-dark">
                          斯巴拉西！買到超值的二手遊戲好開心～我要成為西施惠的好朋友
                        </p>
                        <small className="text-secondary">
                          2024/02/16 22:51
                        </small>
                      </div>
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger"
                        >
                          回覆
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card border="light" style={{ width: '100%' }} className="mb-3">
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-secondary me-1">會員名稱:</p>
                    <div className={`me-1 ${styles.shapeCircle}`}>
                      <Image src={defaultHead} alt="" width={25} height={25} />
                    </div>
                    <p className="mb-0 text-secondary">zhang.wt</p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-dark">
                    <p className="mb-0 text-secondary">訂單編號：1025484548W</p>
                  </Card.Title>
                  <div className="text-dark mb-2">
                    <div className="row align-items-center">
                      <div className="col-4 border-end d-flex flex-column  justify-content-center align-items-center mt-2">
                        <div className="d-flex justify-content-center align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={24}
                            height={40}
                          />
                          <p className="mb-0 text-dark ms-2">
                            集合啦！動物森友會
                            <span className="text-info ms-2">x1</span>
                          </p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mb-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={24}
                            height={40}
                          />
                          <p className="mb-0 text-dark ms-2">
                            集合啦！動物森友會
                            <span className="text-info ms-2">x1</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-6 border-end">
                        <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar className="me-1" />
                          <FaStar />
                        </div>
                        <p className="mb-0 text-dark">
                          斯巴拉西！買到超值的二手遊戲好開心～我要成為西施惠的好朋友
                        </p>
                        <small className="text-secondary">
                          2024/02/16 22:51
                        </small>
                      </div>
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          href="/comment/reply"
                          className="btn btn-danger"
                        >
                          回覆
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Pagination />
            </div>
          </div>
          <div className="d-block d-md-none container ps-4 pe-4">
            <div className="d-flex justify-content-start align-items-end mb-3">
              <div className="d-flex justify-content-start align-items-end">
                <h6 className={`mb-0 me-3 fw-bold ${styles.subtitleFs}`}>賣場評價</h6>
              </div>
              <h6 className="fw-normal mb-0">
                <span className="text-danger fw-bold fs-4">4.5</span> / 5.0
              </h6>
            </div>
            <Form className="mb-3">
              <Form.Group className="mb-3" controlId="memberName">
                <Form.Label>會員名稱</Form.Label>
                <Form.Control type="text" placeholder="請輸入會員名稱" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateSelect">
                <Form.Label>評價時間</Form.Label>
                <div className="d-flex justify-content-between align-items-center">
                  <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                    <Form.Control
                      type="date"
                      aria-label="dateSelectStart"
                      aria-describedby="dateSelectStart"
                      className={styles.dateInput}
                      onChange={(e) => handleStartDateChange(e.target.value)} // 處理開始日期變更
                    />
                  </InputGroup>
                  <span className="mb-0 mx-2">-</span>
                  <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                    <Form.Control
                      type="date"
                      aria-label="dateSelectEnd"
                      aria-describedby="dateSelectEnd"
                      className={styles.dateInput}
                      onChange={(e) => handleEndDateChange(e.target.value)} // 處理結束日期變更
                    />
                  </InputGroup>
                </div>
              </Form.Group>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <button type="button" className="btn btn-danger btn-sm me-3">
                  搜尋
                </button>
                <button type="button" className="btn btn-danger btn-sm">
                  取消
                </button>
              </div>
            </Form>
            <hr />
            <Tabs
              defaultActiveKey="all"
              id="mobile-tabs"
              className="mb-3"
              justify
            >
              <Tab eventKey="all" title="全部">
                <div className="d-flex justify-content-around">
                  <Button variant="secondary" size="sm">
                    5顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    4顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    3顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    2顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    1顆星
                  </Button>
                </div>
                <h6 className="m-2">41則評論</h6>
                <Card border="light" style={{ width: '100%' }} className="mb-3">
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 text-secondary me-1">會員名稱:</p>
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
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-dark">
                      <p className="mb-0 text-secondary">
                        訂單編號：1025484548W
                      </p>
                    </Card.Title>
                    <div className="text-dark">
                      <div className="row align-items-center">
                        <div className="col-12 border-bottom pb-2 d-flex justify-content-start align-items-center mt-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={24}
                            height={40}
                          />
                          <p className="mb-0 text-dark ms-2">
                            集合啦！動物森友會
                            <span className="text-info ms-2">x1</span>
                          </p>
                        </div>
                        <div className="col-12 py-3">
                          <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar />
                          </div>
                          <p className="mb-0 text-dark">
                            斯巴拉西！買到超值的二手遊戲好開心～我要成為西施惠的好朋友
                          </p>
                          <small className="text-secondary">
                            2024/02/16 22:51
                          </small>
                        </div>
                        <div className="col-12 d-flex justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger"
                          >
                            回覆
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Card border="light" style={{ width: '100%' }} className="mb-3">
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 text-secondary me-1">會員名稱:</p>
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
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-dark">
                      <p className="mb-0 text-secondary">
                        訂單編號：102545648S
                      </p>
                    </Card.Title>
                    <div className="text-dark">
                      <div className="row align-items-center">
                        <div className="col-12 border-bottom pb-2 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                              <span className="text-info ms-2">x1</span>
                            </p>
                          </div>
                          <div className="d-flex justify-content-start align-items-center">
                            <Image
                              src={gameCover}
                              alt="game-cover"
                              width={24}
                              height={40}
                            />
                            <p className="mb-0 text-dark ms-2">
                              集合啦！動物森友會
                              <span className="text-info ms-2">x1</span>
                            </p>
                          </div>
                        </div>
                        <div className="col-12 py-3">
                          <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar />
                          </div>
                          <p className="mb-0 text-dark">
                            斯巴拉西！買到超值的二手遊戲好開心～我要成為西施惠的好朋友
                          </p>
                          <small className="text-secondary">
                            2024/02/16 22:51
                          </small>
                        </div>
                        <div className="col-12 d-flex justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger"
                          >
                            回覆
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Card border="light" style={{ width: '100%' }} className="mb-3">
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 text-secondary me-1">會員名稱:</p>
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
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-dark">
                      <p className="mb-0 text-secondary">
                        訂單編號：1025484548W
                      </p>
                    </Card.Title>
                    <div className="text-dark">
                      <div className="row align-items-center">
                        <div className="col-12 border-bottom pb-2 d-flex justify-content-start align-items-center mt-2">
                          <Image
                            src={gameCover}
                            alt="game-cover"
                            width={24}
                            height={40}
                          />
                          <p className="mb-0 text-dark ms-2">
                            集合啦！動物森友會
                            <span className="text-info ms-2">x1</span>
                          </p>
                        </div>
                        <div className="col-12 py-3">
                          <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar className="me-1" />
                            <FaStar />
                          </div>
                          <p className="mb-0 text-dark">
                            斯巴拉西！買到超值的二手遊戲好開心～我要成為西施惠的好朋友
                          </p>
                          <small className="text-secondary">
                            2024/02/16 22:51
                          </small>
                        </div>
                        <div className="col-12 d-flex justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            href="/comment/reply"
                            className="btn btn-danger"
                          >
                            回覆
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <Pagination />
              </Tab>
              <Tab eventKey="unreply" title="待回覆">
                待回覆
              </Tab>
              <Tab eventKey="replied" title="已回覆">
                已回覆
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
