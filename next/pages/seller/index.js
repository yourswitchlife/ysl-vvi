import React, { useEffect } from 'react'
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import { FaHome, FaStore, FaFileAlt, FaStar, FaCoins, FaPlus, FaAngleDown, FaFilter } from 'react-icons/fa'
import { IoIosArrowForward } from "react-icons/io";
import { IoGameController } from 'react-icons/io5'
import Link from 'next/link'
import profileImg from '@/public/images/profile-photo/peach.png'
import Image from 'next/image'
import SellerFooter from '@/components/layout/footer/footer-backstage'



export default function Seller() {
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

  return (
    <>
    {/* <div className={styles.outsideHeight}> */}
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
                <Image src={profileImg} alt="profile-photo" className={styles.fit} />
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center">
                <h5 className="mb-1">碧姬公主的玩具城堡</h5>
                <p className="mb-1">ysl.com/princepeach8888</p>
              </div>
              <div><button className='btn btn-danger'>查看賣場</button></div>
            </div>
            <hr />
          </div>
          <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <div className="d-flex align-items-end mb-4">
                <h4 className="text-dark mb-0 me-3">待辦事項清單</h4>
                <p className="text-primary mb-0">您的待處理事項</p>
              </div>
              <div className="d-flex justify-content-between">
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">4</h4>
                  <h6 className="text-dark">待付款訂單</h6>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">6</h4>
                  <h6 className="text-dark">待處理訂單</h6>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">35</h4>
                  <h6 className="text-dark">已完成訂單</h6>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">0</h4>
                  <h6 className="text-dark">已售完商品</h6>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">1</h4>
                  <h6 className="text-dark">待取消訂單</h6>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">2</h4>
                  <h6 className="text-dark">待退貨訂單</h6>
                </Link>
              </div>
            </div>
            <div className={`${styles.dashboardStyle} mb-4`}>
              <div className="d-flex align-items-end mb-4">
                <h4 className="text-dark mb-0 me-3">賣場評價</h4>
                <p className="text-primary mb-0">賣場評價總計</p>
              </div>
              <div className="d-flex justify-content-around">
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">5.0</h4>
                  <h6 className="text-dark">平均分數</h6>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h4 className="text-danger">124</h4>
                  <h6 className="text-dark">評論總數</h6>
                </Link>
              </div>
            </div>
          </div>
          <div className='d-block d-md-none container ps-4 pe-4'>
            <div className="d-flex justify-content-between mb-3">
              <h6 className="mb-0 me-3">我的銷售</h6>
              <Link href="/" className={styles.linkstyle}>
              <p className="mb-0">查看銷售紀錄<IoIosArrowForward /></p>
              </Link>
            </div>
            <div className="d-flex justify-content-around">
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">6</h5>
                  <p className="text-secondary">待處理訂單</p>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">35</h5>
                  <p className="text-secondary">已完成訂單</p>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">0</h5>
                  <p className="text-secondary">已售完商品</p>
                </Link>
                <Link
                  href="/"
                  className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                >
                  <h5 className="text-danger">2</h5>
                  <p className="text-secondary">評價</p>
                </Link>
                
            </div>
            <hr />
              <h6 className="mb-3">賣家中心</h6>
              <ul className={`nav nav-pills flex-column mb-auto ${styles.sidebarRWD}`}>
          <li className="nav-item">
            <Link
              href="/seller/seller"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
              aria-current="page"
            >
              <FaHome className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>賣家中心</h6>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaStore className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>賣場管理</h6>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <IoGameController className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>商品管理</h6>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaFileAlt className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>訂單管理</h6>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaStar className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>評價管理</h6>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaCoins className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>行銷活動</h6>
            </Link>
          </li>
        </ul>
          </div>
        </div>
      </main>
      <footer><SellerFooter /></footer>
      {/* </div> */}
    </>
  )
}
