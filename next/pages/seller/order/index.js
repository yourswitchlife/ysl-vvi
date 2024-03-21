import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/hooks/use-Auth'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useRouter } from 'next/router';
//components
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import Pagination from '@/components/common/pagination'
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
  const formRef = useRef(null)
  const [formHtml, setFormHtml] = useState('')
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
  const [orderNum, setOrderNum] = useState(0)
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
  //頁數
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  //執行tabs篩選
  const [selectedTab, setSelectedTab] = useState('all')
  // 表單控制狀態
  const orderOptions = ['訂單編號', '會員名稱']
  const [orderSelect, setOrderSelect] = useState('訂單編號')
  const [searchText, setSearchText] = useState('')

  //在這裡觸發來接應綠界
  const handleViewClick = async () => {
    const orderData = {
      MerchantTradeDate: '2024/02/15 08:40:00',
          LogisticsType: 'CVS',
          LogisticsSubType: 'UNIMARTC2C',
          GoodsAmount: '950',
          CollectionAmount: '950',
          IsCollection: 'Y',
          GoodsName: 'YSL商品訂單',
          SenderName: '林雅琳',
          SenderPhone: '0934567891',
          SenderCellPhone: '0934567891',
          ReceiverName: '鄭家豪',
          ReceiverPhone: '0989012345',
          ReceiverCellPhone: '0989012345',
          ReceiverEmail: '',
          TradeDesc: '',
          ServerReplyURL:
            'https://1bae-2001-b400-e332-fff7-7810-43d0-8b9d-6c84.ngrok-free.app/api/logisticsService/ecpay/serverReply',
          ClientReplyURL: 'https://1bae-2001-b400-e332-fff7-7810-43d0-8b9d-6c84.ngrok-free.app/api/logisticsService/ecpay/clientReply',
          LogisticsC2CReplyURL: 'https://1bae-2001-b400-e332-fff7-7810-43d0-8b9d-6c84.ngrok-free.app/api/logisticsService/ecpay/logisticsC2CReply',
          Remark: '',
          PlatformID: '',
          ReceiverStoreID: '131386',
          ReturnStoreID: '131386',
    }
    const response = await fetch('http://localhost:3005/api/logisticsService/create-logistics-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if(response.ok){
        //如果後端有重新導引，這裡就不用幹嘛
        //如果後端告訴我們要重新定向可以這樣處理：
        const data = await response.json()
        // window.location.href = data.redirectUrl
        setFormHtml(data.form)
      }else{
        //處理錯誤
        console.error('創建物流訂單失敗')
      }
  }

  //用useEffect來監聽
  useEffect(()=> {
    if(formHtml && formRef.current){
      // 找到当前组件中的<form>元素
      const form = formRef.current.querySelector('form');
      if (form) {
          form.submit(); // 提交表单
      }
    }
  }, [formHtml])

  
  const fetchShopOrders = async() => {
    try{
      const res = await fetch(`http://localhost:3005/api/seller/order?page=${page}&limit=${limit}&tab=${selectedTab}`, { credentials: 'include'})
      if(!res.ok){
        throw new Error('網路請求失敗，找不到賣家資料')
      }
      let data = await res.json()
   
      if(data.orders && data.orders.length > 0){
        //格式化日期再寫進去
        const formattedOrders = formatDatas(data.orders)
        setOrders(formattedOrders)
        setTotalPages(data.totalPages)
        setOrderNum(data.totalItems)
        // console.log(data.totalItems)
        //取得評價平均
        // console.log(data)
        // console.log(averageRating)
        
      }else{
        setOrders([])
        setTotalPages(0)
        setOrderNum(0)
      }
    }catch(e){
      console.error(e)
    }
  }
  useEffect(() => {
    if(isLoggedIn) {
      fetchShopOrders()
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
  }, [isLoggedIn, memberId, memberData, page, limit, selectedTab])

  const handlePageChange = (newpage) => {
    setPage(newpage)
  }

  const handleTabChange = (key) => {
    //更新狀態
    setSelectedTab(key)
    //更新url的查詢參數（但不加載頁面）
    router.push(`./order?tab=${key}`, undefined, { shallow: true })
  }
  useEffect(() => {
    //從url查詢中獲取tab值
    const { tab } = router.query
    //如果有tab值，更新狀態
    if(tab){
      setSelectedTab(tab)
    }
  }, [router.query.tab])


  // const getSellerData = async() => {
  //   try{
  //     const res = await fetch(`http://localhost:3005/api/seller/order`, { credentials: 'include'})
  //     if(!res.ok){
  //       throw new Error('網路請求失敗，找不到賣家資料')
  //     }
  //     let data = await res.json()
   
  //     if(data && data.length > 0){
  //       //格式化日期再寫進去
  //       data = formatDatas(data)
  //       setOrders(data)
  //       // console.log(data)
  //       //取得評價平均
  //       console.log(data)
  //       // console.log(averageRating)
        
  //     }
  //   }catch(e){
  //     console.error(e)
  //   }
  // } 
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
  // let orderGroups = orders.reduce((acc, order) => {
  //   if(!acc[order.order_number]){
  //     acc[order.order_number] = {productIds: [], quantities: []}
  //   }
  //   acc[order.order_number].productIds.push(order.product_id)
  //   acc[order.order_number].quantities.push(order.quantity)
  //   return acc
  // }, {})
  // console.log(orderGroups)

  // function findProductById(productId){
  //   return products.find(product => product.id === productId)
  // }

  //遍歷groupOrders，用product_id找到對應的產品資訊
  // useEffect(() => {
  //   if(!products.length || !orders.length){
  //     //沒準備好就不計算
  //     return
  //   }
  //   //計算orderProductInfos
  //   let ComputedOrderProductInfos = Object.entries(orderGroups).map(([orderNumber, info]) => {
  //     let productInfos = info.productIds.map((productId, index) => {
  //       let product = findProductById(productId);
  //       if(!product){
  //         console.error(`Product not found for ID: ${productId}`)
  //       return{
  //         name: 'Product not found',
  //         imgCover: gameCover,
  //         quantity: info.quantities[index]
  //       }
  //     }
  //       return {
  //         name: product.name,
  //         imgCover: product.img_cover,
  //         quantity: info.quantities[index]
  //       };
  //     });
  //     return { orderNumber, products: productInfos };
  //   });
  //   setOrderProductInfos(ComputedOrderProductInfos)
  // }, [products, orders])

  // console.log(orderProductInfos[0].products[0].name)

  // function handleSubmit(e) {
  //   e.prevent.default()
  // }

  return (
    <>
      <header>
        <SellerNavbar />
      </header>
      <div ref={formRef} dangerouslySetInnerHTML={{ __html: formHtml }} />
      <div className={styles.mainContainer}>
          {memberData && (
            <>
              <Sidebar profilePhoto={bigPic} memberShopSite={memberData.shop_site} memberShopName={memberData.shop_name}/>
            </>
          )}
        <main className='flex-grow-1'>
          {/* cover */}
          <div className={styles.coverB}>
          <Image height={170} width={1172} src={shopCover} alt="shop-cover" className={styles.fit} />
          </div>
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
                defaultActiveKey="all"
                id="orderStatusTabs"
                className="mb-3"
                justify
                onSelect={handleTabChange}
              >
                <Tab eventKey="all" title="全部訂單">
                { orders && <h5 className="text-dark fw-bold">{orderNum}筆訂單</h5>
                  }
                </Tab>
                <Tab eventKey="shipped" title="待出貨">
                { orders && <h5 className="text-dark fw-bold">{orderNum}筆訂單</h5>
                  }
                </Tab>
                <Tab eventKey="processing" title="運送中">
                { orders && <h5 className="text-dark fw-bold">{orderNum}筆訂單</h5>
                  }
                </Tab>
                <Tab eventKey="delivered" title="已完成">
                { orders && <h5 className="text-dark fw-bold">{orderNum}筆訂單</h5>
                  }
                </Tab>
              </Tabs>
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
                              src={v.member_pic ? (v.member_pic.startsWith("https://") 
                                ? v.member_pic 
                                : `http://localhost:3005/profile-pic/${v.member_pic}`) 
                              : profilePhoto}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">{v.member_account}</p>
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
                          {v.products.map((p, i) => {
                            return (
                              <div className="d-flex justify-content-start align-items-center mb-2" key={i}>
                              <Image
                                src={p.product_img_cover ? (p.product_img_cover.startsWith("https://") 
                                ? p.product_img_cover 
                                : `http://localhost:3005/productImg/cover/${p.product_img_cover}`) 
                              : gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                {p.product_name}
                                  <span className="text-info ms-2">x{p.quantity}</span>
                                </p>
                                {/* <p className="text-secondary ms-2">
                                  規格：中文版
                                </p> */}
                              </div>
                            </div>
                            )
                            })}
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
                              onClick={handleViewClick}
                            >
                              寄貨處理
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
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            </div>
          </div>
          <div className="d-block d-md-none container ps-4 pe-4">
          <Tabs
                defaultActiveKey="all-order"
                id="orderStatusTabs-mobile"
                className="mb-3"
                justify
                onSelect={handleTabChange}
              >
                <Tab eventKey="all" title="全部">
                  {orders &&
                    <h5 className="fw-bold mb-2">{orderNum}筆訂單</h5>
                  }
                </Tab>
                <Tab eventKey="shipped" title="待出貨">
                {orders &&
                    <h5 className="fw-bold mb-2">{orderNum}筆訂單</h5>
                  }
                </Tab>
                <Tab eventKey="processing" title="運送中">
                {orders &&
                    <h5 className="fw-bold mb-2">{orderNum}筆訂單</h5>
                  }
                </Tab>
                <Tab eventKey="delivered" title="已完成">
                {orders &&
                    <h5 className="fw-bold mb-2">{orderNum}筆訂單</h5>
                  }
                </Tab>
              </Tabs>
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
                              src={v.member_pic ? (v.member_pic.startsWith("https://") 
                                ? v.member_pic 
                                : `http://localhost:3005/profile-pic/${v.member_pic}`) 
                              : profilePhoto}
                              alt="member-profile"
                              width={25}
                              height={25}
                            />
                          </div>
                          <p className="mb-0 text-secondary">{v.member_account}</p>
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
                          {v.products.map((p, i) => {
                            return (
                              <div className="d-flex justify-content-start align-items-center mb-2" key={i}>
                              <Image
                                src={p.product_img_cover ? (p.product_img_cover.startsWith("https://") 
                                ? p.product_img_cover 
                                : `http://localhost:3005/productImg/cover/${p.product_img_cover}`) 
                              : gameCover}
                                alt="game-cover"
                                width={24}
                                height={40}
                              />
                              <div>
                                <p className="mb-0 text-dark ms-2">
                                  {p.product_name}
                                  <span className="text-info ms-2">x{p.quantity}</span>
                                </p>
                              </div>
                            </div>
                            )

                          })}
                          </div>
                          <div className="col-4">
                            <p className="fw-bold">NT${v.final_price}</p>
                            <p className="text-secondary">{paymentMethods[v.payment_method]}</p>
                          </div>
                          <div className="col-12"><hr /></div>
                          <div className="col-4 text-center">
                            <p className="fw-bold">{shippingStatuses[v.shipping_status]}</p>
                          </div>
                          <div className="col-4 text-center">
                            <p>{shippingMethods[v.shipping_method]}</p>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center">
                            {/* 可以跳出一個MODAL來處理 */}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              查看
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                        </Card>
                      )
                    })}</>
                  )}
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            
          </div>
          <div className={`d-block d-md-none ${styles.spaceForPhoneTab}`}></div>
        </main>
      </div>
      <PhoneTabNav />
      <footer className="d-none d-md-block">
          <SellerFooter />
      </footer>
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
