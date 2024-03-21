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
      <aside
        className={`d-none d-md-flex flex-column flex-shrink-0 ${styles.sidebar} align-self-stretch`}
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
      </aside>
    </>
  )
}
