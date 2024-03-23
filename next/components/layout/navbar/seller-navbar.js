import React, { useEffect, useState } from 'react';
import styles from '@/components/layout/navbar/navbar.module.scss'
import yslLogo from '@/public/images/logo/logo-sm.svg'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaArrowRight, FaSearch } from "react-icons/fa";
//登出邏輯
import handleLogout from '@/services/logout';
//context hooks
import { useAuth } from '@/hooks/use-Auth';
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
//我做完的組件 可以用到評論上 已套用會員等級框
import NavPic from '@/hooks/use-navpic';
// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function SellerNavbar({shopSite=""}) {
  const router = useRouter()
  const { isLoggedIn, memberData } = useAuth();
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    <div className='d-none d-lg-block'>
      <header className={styles.sellerNavbar}>
        <div // logo
        >
          <Link href="/" className={styles.link} title='回到首頁'>
            <Image src={yslLogo} alt="ysl-logo"/>
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
            {/* <Image
              src={profileImg}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            /> */}
            <NavPic />
            {memberData && <strong className='ms-2'>{memberData.account}</strong>}
          </Link>
          <ul className="dropdown-menu text-small shadow">
            <li>
            {memberData && <Link className="dropdown-item" href={`/shop/${memberData.shop_site}`}>
                我的賣場
              </Link>}
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
            {/* 登出要 */}
              <div className="dropdown-item" onClick={handleLogout}>
                登出
              </div>
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
          <Link href="/">
            <Image src={yslLogoXs} alt="ysl-logo" />
          </Link>
        </div>
        <div onClick={() => {
          router.push('http://localhost:3000/seller')
        }}>
          <h6 className='mb-0 me-2 fw-bold'>賣場中心</h6>
        </div>
      </header>
      </div>
    </>
  )
}
