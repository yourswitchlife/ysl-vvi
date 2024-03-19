import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/components/seller/seller.module.scss'
import { FaHome, FaStore, FaFileAlt, FaStar, FaCoins } from 'react-icons/fa'
import { IoGameController } from 'react-icons/io5'

export default function Sidebar({
  profilePhoto="",
  memberShopSite="",
  memberShopName="shop_name",
}) {
  
  return (
    <>
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 ${styles.sidebar}`}
      >
        <Link
          href={`http://localhost:3000/shop/${memberShopSite}`}
          className="d-flex flex-column align-items-center text-white text-decoration-none"
          title='前往我的賣場'
        >
          {/* <svg className="bi pe-none me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg> */}
          <div className={styles.sellerprofile}>
            <Image src={profilePhoto} width={100} height={100} alt="profile-photo" className={styles.fit} />
          </div>
          <h6>{memberShopName}</h6>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              href="http://localhost:3000/seller"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
              aria-current="page"
            >
              <FaHome className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>賣家中心</h6>
            </Link>
          </li>
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
        {/* <hr /> */}
        {/* <div className="dropdown">
          <Link
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image
              src={profileImg}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>會員中心</strong>
          </Link>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <Link className="dropdown-item" href="#">
                New project...
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Settings
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Sign out
              </Link>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  )
}
