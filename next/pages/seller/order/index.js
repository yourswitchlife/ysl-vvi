import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-Auth'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useRouter } from 'next/router';
//components
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import Pagination from '@/components/common/pagination-front'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import BreadCrumb from '@/components/common/breadcrumb'
//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import cover from '@/public/images/shopCover/default-cover.jpg'
import profileImg from '@/public/images/profile-photo/peach.png'
import gameCover from '@/public/images/profile-photo/default-profile-img.svg'
import Image from 'next/image'
//react bootstrap
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'


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
  const router = useRouter()
  const { isLoggedIn, memberId, memberData } = useAuth()
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [shopCover, setShopCover] = useState(cover)
  const [orders, setOrders] = useState([])
  // const [orderProductInfos, setOrderProductInfos] = useState([])
  const shippingMethods = {
    1: '7-11超商配送',
    2: '宅配',
  }
  const paymentMethods = {
    1: '貨到付款',
    2: 'LINEPAY',
    3: '信用卡',
  }
  const shippingStatuses = {
    1: '待出貨',
    2: '已出貨',
    3: '已完成',
  }
  const orderStatuses = {
    'CAPTURE': '已付款', // 特定於LINE PAY
    '已付款': '已付款',
    '待付款': '待付款',
  }
  // const [products, setProducts] = useState([])
  // 表單控制狀態
  const orderOptions = ['訂單編號', '會員名稱']
  const [orderSelect, setOrderSelect] = useState('訂單編號')
  const [searchText, setSearchText] = useState('')

  const fetchShopOrders = async() => {
    try{
      const res = await fetch(`http://localhost:3005/api/seller/order`, { credentials: 'include'})
      if(!res.ok){
        throw new Error('網路請求失敗，找不到賣家資料')
      }
      let data = await res.json()
   
      if(data && data.length > 0){
        //格式化日期再寫進去
        data = formatDatas(data)
        setOrders(data)
        console.log(data)
        //取得評價平均
        // console.log(data)
        // console.log(averageRating)
        
      }
    }catch(e){
      console.error(e)
    }
  }
  useEffect(() => {
    if(isLoggedIn) {
      // console.log(memberData.shop_cover)
      const picUrl = memberData.pic ? (memberData.pic.startsWith("https://") 
        ? memberData.pic 
        : `http://localhost:3005/profile-pic/${memberData.pic}`) 
      : profilePhoto
      setBigPic(picUrl)
      const coverUrl = memberData.shop_cover ? (memberData.shop_cover.startsWith("https://") ? memberData.shop_cover : `http://localhost:3005/shopCover/${memberData.shop_cover}`) : cover
      setShopCover(coverUrl)
      // console.log(memberData)
      // getSellerData()
    }
  }, [isLoggedIn, memberId, memberData])




  const getSellerData = async() => {
    try{
      const res = await fetch(`http://localhost:3005/api/seller/order`, { credentials: 'include'})
      if(!res.ok){
        throw new Error('網路請求失敗，找不到賣家資料')
      }
      let data = await res.json()
   
      if(data && data.length > 0){
        //格式化日期再寫進去
        data = formatDatas(data)
        setOrders(data)
        // console.log(data)
        //取得評價平均
        console.log(data)
        // console.log(averageRating)
        
      }
    }catch(e){
      console.error(e)
    }
  } 
  // const getSellerProducts = async() => {
  //   try{
  //     const res = await fetch(`http://localhost:3005/api/seller/product`, { credentials: 'include'})
  //     if(!res.ok){
  //       throw new Error('網路請求失敗，找不到賣家資料')
  //     }
  //     const data = await res.json()
   
  //     if(data && data.length > 0){
  //       setProducts(data)
  //     }
  //   }catch(e){
  //     console.error(e)
  //   }
  // }
  // useEffect(() => {
  //   getSellerData()
  //   getSellerProducts()
  // }, [])

  function formatDatas(datas){
    return datas.map(data => {
      const date = new Date(data.order_date)
      const formattedDate = date.getFullYear() +'-'+ String(date.getMonth() + 1).padStart(2, '0') + // 月份從0開始，所以+1
      '-' + String(date.getDate()).padStart(2, '0') +
      ' ' + String(date.getHours()).padStart(2, '0') +
      ':' + String(date.getMinutes()).padStart(2, '0') +
      ':' + String(date.getSeconds()).padStart(2, '0')
      return {
        ...data,
        order_date: formattedDate
      };
    })
  }
  //處理同一訂單，同一店家，購買不只一件商品（要進行order-map中的shopItems-map）
  let orderGroups = orders.reduce((acc, order) => {
    if(!acc[order.order_number]){
      acc[order.order_number] = {productIds: [], quantities: []}
    }
    acc[order.order_number].productIds.push(order.product_id)
    acc[order.order_number].quantities.push(order.quantity)
    return acc
  }, {})
  // console.log(orderGroups)

  function findProductById(productId){
    return products.find(product => product.id === productId)
  }

  //遍歷groupOrders，用product_id找到對應的產品資訊
  useEffect(() => {
    if(!products.length || !orders.length){
      //沒準備好就不計算
      return
    }
    //計算orderProductInfos
    let ComputedOrderProductInfos = Object.entries(orderGroups).map(([orderNumber, info]) => {
      let productInfos = info.productIds.map((productId, index) => {
        let product = findProductById(productId);
        if(!product){
          console.error(`Product not found for ID: ${productId}`)
        return{
          name: 'Product not found',
          imgCover: gameCover,
          quantity: info.quantities[index]
        }
      }
        return {
          name: product.name,
          imgCover: product.img_cover,
          quantity: info.quantities[index]
        };
      });
      return { orderNumber, products: productInfos };
    });
    setOrderProductInfos(ComputedOrderProductInfos)
  }, [products, orders])

  // console.log(orderProductInfos[0].products[0].name)

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
          {memberData && (
            <>
              <Sidebar profilePhoto={bigPic} memberShopSite={memberData.shop_site} memberShopName={memberData.shop_name}/>
            </>
          )}
        </div>
        <div>
          {/* cover */}
          {memberData && (
              <>
                <SellerCover shopCover={shopCover}/>
              </>
            )}
          <div className="d-flex flex-column d-lg-none container ps-4 pe-4">
            <div className="d-flex justify-content-around align-items-center mt-4 mb-2">
              <div className={`${styles.profile}`}>
                <Image src={bigPic} width={75} height={75} alt="profile-photo" className={styles.fit} />
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center">
              {memberData && <h5 className="mb-1 fw-bold">{memberData.shop_name}</h5>}
              {memberData && <p className="mb-1">@{memberData.shop_site}</p>}
              </div>
              <div>
              {memberData &&
                <button className="btn btn-danger btn-sm" onClick={() => {
                  router.push(`/shop/${memberData.shop_site}`)
                }}>查看賣場</button>}
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
                        title={orderSelect}
                        value={orderSelect}
                        onChange={(e) => {
                          setOrderSelect(e.target.value)
                        }}
                        id="searchAreaBtn"
                        className={styles.borderRadius}
                      >
                      {orderOptions.map((v,i) => {
                        return (<Dropdown.Item key={i} value={v} href="#">{v}</Dropdown.Item>)
                      })}
                      </DropdownButton>
                      <Form.Control aria-label="searchAreaText" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value)
                      }} />
                    </InputGroup>
                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-danger me-2">
                        搜尋
                      </button>
                      <button type="button" className={`btn btn-danger ${styles.btnDangerOutlined}`}>
                        取消
                      </button>
                    </div>
                  </Form>
                  { orders && <h5 className="text-dark fw-bold">{orders.length}筆訂單</h5>
                  }
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
                  {orders && (
                    <>
                      {orders.map((v, i) => {
                        return (
                          <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                    key={v.id}
                  >
                    <Card.Header>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={v.pic ? (v.pic.startsWith("https://") 
                                ? v.pic 
                                : `http://localhost:3005/profile-pic/${v.pic}`) 
                              : profilePhoto}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">{v.member_buyer_id}</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：{v.order_number}
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-dark">
                        <div className="row align-items-center">
                          <div className="col-4 d-flex flex-column justify-content-start align-items-start mt-2">
                          {/* product-map-card */}
                          {orderProductInfos && (
                            <>
                              {orderProductInfos.map((orderInfo) => {
                                return (
                                  <>
                                    {orderInfo.products.map((v,i) => {
                                      return (
                                        <div className="d-flex justify-content-start align-items-center mb-2" key={i}>
                              <Image
                                src={
                                  typeof v.imgCover === 'string' && v.imgCover.startsWith("https://")
                                    ? v.imgCover
                                    : `http://localhost:3005/productImg/cover/${v.imgCover || 'default-img.jpg'}`
                                }
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                {v.name}
                                  <span className="text-info ms-2">x{v.quantity}</span>
                                </p>
                                {/* <p className="text-secondary ms-2">
                                  規格：中文版
                                </p> */}
                              </div>
                            </div>
                                      )
                                    })}
                                  </>
                                )
                              })}
                            </>
                          )}
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
                                  <span className="text-info ms-2">x{v.quantity}</span>
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
                            <p className="fw-bold">NT${v.final_price}</p>
                            <p className="text-secondary">{paymentMethods[v.payment_method]}</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold">{shippingStatuses[v.shipping_status]}</p>
                          </div>
                          <div className="col-2">
                            <p>{shippingMethods[v.shipping_method]}</p>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              編輯
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                        )
                      })}
                    </>
                  )}
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
                  {orders &&
                    <h5 className="text-dark fw-bold">{orders.length}筆訂單</h5>
                  }
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                  {orders &&
                    <h5 className="fw-bold mb-2">{orders.length}筆訂單</h5>
                  }
                  {/*--------------Rating Content------------------ */}
                  {orders && (
                    <>
                    {orders.map((v,i) => {
                      return (
                        <Card
                    border="light"
                    style={{ width: '100%' }}
                    className="mb-3"
                    key={v.id}
                  >
                    <Card.Header>
                      <div className="d-flex flex-column justify-content-between align-items-start">
                        <div className="d-flex align-items-center mb-2">
                          <div className={`me-1 ${styles.shapeCircle}`}>
                            <Image
                              src={v.pic ? (v.pic.startsWith("https://") 
                                ? v.pic 
                                : `http://localhost:3005/profile-pic/${v.pic}`) 
                              : profilePhoto}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">zhang.wt{v.member_buyer_id}</p>
                        </div>
                        <p className="mb-0 text-secondary">
                          訂單編號：{v.order_number}
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body className='pt-1'>
                      <div className="text-dark">
                        <div className="row align-items-center ">
                          <div className="col-8 d-flex flex-column justify-content-start align-items-start mt-2">
                          {/* product-map-card */}
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
                            <p className="fw-bold">NT${v.final_price}</p>
                            <p className="text-secondary">貨到付款{v.payment_method}</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">待出貨{v.shipping_status}</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>7-11 超商寄送{v.shipping_method}</p>
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
                      )
                    })}</>
                  )}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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
                              src={profilePhoto}
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

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
