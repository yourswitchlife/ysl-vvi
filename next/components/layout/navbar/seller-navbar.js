import react from 'react'
import styles from '@/components/layout/navbar/navbar.module.scss'
import yslLogo from '@/public/images/logo/logo-sm.svg'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import Image from 'next/image'
import Link from 'next/link'
import profileImg from '@/public/images/profile-photo/peach.png'
import { FaArrowRight, FaSearch } from "react-icons/fa";


export default function SellerNavbar() {
  return (
    <>
    <div className='d-none d-lg-block'>
      <header className={styles.sellerNavbar}>
        <div // logo
        >
          <Link href="/seller" className={styles.link}>
            <Image src={yslLogo} alt=""/>
            <span className="ps-4 pe-4">|</span>
            <h3 className={styles.text}>賣家中心</h3>
          </Link>
        </div>
        {/* <div className="d-flex align-items-center">
          <Link href="">
            <div className={styles.circleCut}>
              <Image src={profilePhoto} alt="" />
            </div>
          </Link>
          <Link href="" className={styles.linkstyled}>
            <h5 className={styles.shopname}>賣場名稱</h5>
          </Link>
        </div> */}
        <div className="dropdown">
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
            <strong>Peach princes</strong>
          </Link>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <Link className="dropdown-item" href="/">
                Your Switch Life
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/member/account">
              我的帳戶
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/coupon">
                優惠報報
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/article">
                最新攻略
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" href="/member/logout">
                登出
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
    {/* RWD */}
    <div className='d-flex flex-column d-lg-none'>
      <header className={styles.navbarB}>
        <div // logo
        >
          <Link href="/index.js">
            <Image src={yslLogoXs} alt="" />
          </Link>
        </div>
        <div className="">
          <h5 className='mb-0'>我的賣場</h5>
        </div>
        <Link href="/index.js" className="text-white ps-5">
          <FaSearch />
        </Link>
      </header>
      </div>
    </>
  )
}
