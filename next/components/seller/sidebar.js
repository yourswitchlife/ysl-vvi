import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/components/seller/seller.module.scss'
import { FaHome, FaStore, FaFileAlt, FaStar, FaCoins } from 'react-icons/fa'
import { IoGameController } from 'react-icons/io5'

function NavLink({ href, icon, children }){
  const router = useRouter()
  const isActive = router.pathname === href
  console.log(isActive)
  console.log(router.pathname)

  const linkClassName = isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink

  return (
    <li>
      <Link href={href} className={`nav-link d-flex justify-content-center align-items-center text-decoration-none ${linkClassName}`}>
          {icon}
          <h6 className={`${styles.navText} text-decoration-none mb-0`}>{children}</h6>
      </Link>
    </li>
  )
}

export default function Sidebar({
  profilePhoto="",
  memberShopSite="",
  memberShopName="shop_name",
}) {

  // const router = useRouter()
  // const renderLink = (href, className) => {
  //   const isCurrentPage = router.pathname === href
  //   if(isCurrentPage){
  //     //當前頁面
  //     return (
  //       <span></span>
  //     )
  //   }
  // }
  
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
        <NavLink href="/seller" icon={<FaHome className={`${styles.navText} me-2`} />}>賣家中心</NavLink>
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
          <NavLink href="/seller/shop" icon={<FaStore className={`${styles.navText} me-2`} />}>賣場管理</NavLink>
          {/* <li>
            <Link
              href="http://localhost:3000/seller/shop"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaStore className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>賣場管理</h6>
            </Link>
          </li> */}
          <NavLink href="/seller/product" icon={<IoGameController className={`${styles.navText} me-2`} />}>商品管理</NavLink>
          {/* <li>
            <Link
              href="http://localhost:3000/seller/product"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <IoGameController className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>商品管理</h6>
            </Link>
          </li> */}
          <NavLink href="/seller/order" icon={<FaFileAlt className={`${styles.navText} me-2`} />}>訂單管理</NavLink>
          {/* <li>
            <Link
              href="http://localhost:3000/seller/order"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaFileAlt className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>訂單管理</h6>
            </Link>
          </li> */}
          <NavLink href="/seller/comment" icon={<FaStar className={`${styles.navText} me-2`} />}>評價管理</NavLink>
          {/* <li>
            <Link
              href="http://localhost:3000/seller/comment"
              className={`nav-link d-flex justify-content-center align-items-center ${styles.navLink}`}
            >
              <FaStar className={`${styles.navText} me-2`} />
              <h6 className={`${styles.navText} mb-0`}>評價管理</h6>
            </Link>
          </li> */}
        </ul>
      </aside>
    </>
  )
}
