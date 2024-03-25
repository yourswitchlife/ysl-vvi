//hooks
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-Auth'
// import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import Image from 'next/image'
import { useRouter } from 'next/router'
//components
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
//styles
import styles from '@/components/seller/seller.module.scss'
//icon
import { FaHome, FaStore, FaFileAlt, FaStar, FaCoins, FaPlus, FaAngleDown, FaFilter } from 'react-icons/fa'
import { IoIosArrowForward } from "react-icons/io";
import { IoGameController } from 'react-icons/io5'
//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import cover from '@/public/images/shopCover/default-cover.jpg'



export default function Seller() {
  const router = useRouter()
  const { isLoggedIn, memberId, memberData } = useAuth()
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [shopCover, setShopCover] = useState(cover)
  const [orders, setOrders] = useState([])
  const [comments, setComments] = useState([])
  const [unpaidOrders, setUnpaidOrders] = useState(0)
  const [undealedOrders, setUndealedOrders] = useState(0)
  const [doneOrders, setDoneOrders] = useState(0)
  const [zeroItems, setZeroItems] = useState(0)
  const [shopRating, setShopRating] = useState("0.0")
  const [commentNum, setCommentNum] = useState(0)
  
  useEffect(() => {
    if(isLoggedIn && memberData) {
      // console.log(memberData.shop_cover)
      const picUrl = memberData.pic ? (memberData.pic.startsWith("https://") 
        ? memberData.pic 
        : `http://localhost:3005/profile-pic/${memberData.pic}`) 
      : profilePhoto
      setBigPic(picUrl)
      const coverUrl = memberData.shop_cover ? (memberData.shop_cover.startsWith("https://") ? memberData.shop_cover : `http://localhost:3005/shopCover/${memberData.shop_cover}`) : cover
      setShopCover(coverUrl)
      // console.log(memberData)
      getSellerData()
    }
  }, [isLoggedIn, memberId, memberData])
  

  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)
    // document.body.classList.add(styles.bodySetHeight)

    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
      // document.body.classList.remove(styles.bodySetHeight)
    }
  }, [])
  // console.log(memberData)

  const getSellerData = async() => {
    try{
      const res = await fetch(`http://localhost:3005/api/seller/`, { credentials: 'include'})
      if(!res.ok){
        throw new Error('網路請求失敗，找不到賣家資料')
      }
      const data = await res.json()
      // data = { orders: [{...}], comments: [{...}]}
      
      // console.log(data.orders[0])
      // console.log(data.comments[0])
      // console.log(memberData.pic)
      // console.log(picUrl)
   
      if(data && data.orders && data.comments && data.lackItems){
        // console.log(data)
        setOrders(data.orders[0])
        setComments(data.comments[0])
        //待處理訂單
        const newUndealOrders = data.orders.filter(order => order.shipping_status === 1)
        // console.log(newUndealOrders.length)
        setUndealedOrders(newUndealOrders.length) 
        //已完成訂單
        const newDoneOrders = data.orders.filter(order => order.shipping_status === 3)
        // console.log(newDoneOrders.length)
        setDoneOrders(newDoneOrders.length) 
        //已售完商品
        const newZeroItems = data.lackItems.filter(item => item.product_quanty === 0)
        // console.log(newZeroItems.length)
        setZeroItems(newZeroItems.length) 
        //取得評價平均
        if(data.comments.length > 0){
          const totalRating = data.comments.reduce((acc, cur) => acc + cur.rating, 0);
          const averageRating = (totalRating / data.comments.length).toFixed(1); // 保留一位小數
          // console.log(averageRating)
          setShopRating(averageRating)
        } else {
          setShopRating("0.0")
        }
        //取得評價總數
        setCommentNum(data.comments.length)
      }
      // console.log(orders)
      // console.log(comments)
    }catch(e){
      console.error(e)
    }
  } 
  return (
    <>
    {/* <div className={styles.outsideHeight}> */}
      <header>
        <SellerNavbar />
      </header>
      <div className={styles.mainContainer}>
        {memberData && (
          <>
          <Sidebar profilePhoto={bigPic} memberShopSite={memberData.shop_site || memberData.account} memberShopName={memberData.shop_name || memberData.account}/>
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
                <Image src={bigPic} width={55} height={55} alt="profile-photo" className={styles.fit} />
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center">
              {memberData && (
                <>
                <h6 className="mb-1 fw-bold">{memberData.shop_name || memberData.account}</h6>
                <p className="mb-1">@{memberData.shop_site || memberData.account}</p>
                </>
              )}
                {/* <h6 className="mb-1 fw-bold">{shop_name}</h6>
                <p className="mb-1">ysl.com/{shop_site}</p> */}
              </div>
              {memberData && (
                <>
                {memberData.shop_name ? (<button className='btn btn-danger' onClick={() => {
                router.push(`http://localhost:3000/shop/${memberData.shop_site}`)
              }}>查看賣場</button>) : (<button className='btn btn-danger' onClick={() => {
                router.push(`http://localhost:3000/seller/shop`)
              }}>建置賣場</button>)}
                </>
              )}
            </div>
            <hr />
          </div>
          <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
            <div className={`my-3 ${styles.dashboardStyle}`}>
              <div className="d-flex align-items-center mb-4">
                <h5 className="text-dark  fw-bold mb-0 me-3">待辦事項清單</h5>
                <h6 className="text-primary mb-0">您的待處理事項</h6>
              </div>
              <div className="d-flex justify-content-around py-3">
                <Link
                  href="./seller/order"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">{unpaidOrders}</h4>
                  <h6 className={`text-dark ${styles.hoverUnderline}`}>待付款訂單</h6>
                </Link>
                <Link
                  href="./seller/order"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">{undealedOrders}</h4>
                  <h6 className={`text-dark ${styles.hoverUnderline}`}>待處理訂單</h6>
                </Link>
                <Link
                  href="./seller/order"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">{doneOrders}</h4>
                  <h6 className={`text-dark ${styles.hoverUnderline}`}>已完成訂單</h6>
                </Link>
                <Link
                  href="./seller/product"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">{zeroItems}</h4>
                  <h6 className={`text-dark ${styles.hoverUnderline}`}>已售完商品</h6>
                </Link>
                {/* <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">1</h4>
                  <h6 className="text-dark">待取消訂單</h6>
                </Link> */}
                {/* <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">2</h4>
                  <h6 className="text-dark">待退貨訂單</h6>
                </Link> */}
              </div>
            </div>
            <div className={`${styles.dashboardStyle} mt-4`}>
              <div className="d-flex align-items-center mb-4">
                <h5 className="text-dark fw-bold mb-0 me-3">賣場評價</h5>
                <h6 className="text-primary mb-0">賣場評價總計</h6>
              </div>
              <div className="d-flex justify-content-around py-3">
                <Link
                  href="./seller/comment"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">{shopRating}</h4>
                  <h6 className={`text-dark ${styles.hoverUnderline}`}>平均分數</h6>
                </Link>
                <Link
                  href="./seller/comment"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">{commentNum}</h4>
                  <h6 className={`text-dark ${styles.hoverUnderline}`}>評論總數</h6>
                </Link>
              </div>
            </div>
          </div>
          <div className='d-block d-md-none container ps-4 pe-4'>
            <div className="d-flex justify-content-between mb-3">
              <h6 className="mb-0 me-3">我的銷售</h6>
              <Link href="./seller/order" className={styles.linkstyle}>
              <p className="mb-0">查看銷售紀錄<IoIosArrowForward /></p>
              </Link>
            </div>
            <div className="d-flex justify-content-around">
                <Link
                  href="./seller/order"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">{undealedOrders}</h5>
                  <p className="text-light">待處理訂單</p>
                </Link>
                <Link
                  href="./seller/order"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">{doneOrders}</h5>
                  <p className="text-light">已完成訂單</p>
                </Link>
                <Link
                  href="./seller/product"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">{zeroItems}</h5>
                  <p className="text-light">已售完商品</p>
                </Link>
                <Link
                  href="./seller/comment"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">{commentNum}</h5>
                  <p className="text-light">評價</p>
                </Link>
                
            </div>
            <hr />
              <h6 className="mb-3">賣家中心</h6>
              <ul className={`nav nav-pills flex-column mb-auto ${styles.sidebarRWD}`}>
          {/* <li className="nav-item">
            <Link
              href="http://localhost:3000/seller"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
              aria-current="page"
            >
              <FaHome className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>賣家中心</h6>
            </Link>
          </li> */}
          <li>
            <Link
              href="http://localhost:3000/seller/shop"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaStore className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>賣場管理</h6>
            </Link>
          </li>
          <li>
            <Link
              href="http://localhost:3000/seller/product"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <IoGameController className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>商品管理</h6>
            </Link>
          </li>
          <li>
            <Link
              href="http://localhost:3000/seller/order"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaFileAlt className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>訂單管理</h6>
            </Link>
          </li>
          <li>
            <Link
              href="http://localhost:3000/seller/comment"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaStar className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>評價管理</h6>
            </Link>
          </li>
        </ul>
          </div>
        </main>
      </div>
      <PhoneTabNav />
      <footer><SellerFooter /></footer>
      {/* </div> */}
    </>
  )
}
// export async function getServerSideProps(context) {
//   return await mainCheckToLogin(context);
// }
