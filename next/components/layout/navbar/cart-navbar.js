import { useState } from 'react'
import styles from '@/components/layout/navbar/navbar.module.scss'
import yslLogo from '@/public/images/logo/logo-sm.svg'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import SearchBarB from './searchBarB'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaBell, FaStore, FaArrowRight } from 'react-icons/fa'
import BurgerMenu from './burgermenu'
//登出邏輯
import handleLogout from '@/services/logout';
//context hooks
import { useAuth } from '@/hooks/use-Auth';

//我做完的組件 可以用到評論上 已套用會員等級框
import NavPic from '@/hooks/use-navpic';
// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function CartNavbar() {
  const { isLoggedIn, memberData } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const {totalProducts} = useCart()
  return (
    <>
    <div className='d-none d-lg-block'>
      <header className={styles.cartNav}>
        <div // logo
        >
          <Link href="/cart" className={styles.link}>
            <Image src={yslLogo} alt="ysl-logo" />
            <span className="ps-4 pe-4">|</span>
            <h3 className={styles.text}>購物車</h3>
          </Link>
        </div>
        {isLoggedIn ? (
            // 登入後顯示
        <div className={styles.cartRight}>
          <div className={styles.iconGroup}>
            <Link href="/member/fav-product" className={styles.loginIcon}>
              <FaHeart className={styles.icon}/>
            </Link>
            <Link href="/member/notify-order" className={styles.loginIcon}>
              <FaBell className={styles.icon}/>
            </Link>
            <Link href="/seller" className={styles.loginIconEnd}>
              <FaStore className={styles.icon} />
            </Link>
          </div>
          <div className={styles.circleCut}>
            <Link href="/member/account">
              <Image src={profilePhoto} alt="profile-photo" />
            </Link>
          </div>
        </div>
        ) : (// 未登入時顯示
            <div>
              <Link href="/member/login" className={styles.link}>
                登入
              </Link>
              <span className={styles.unlogin}>|</span>
              <Link href="/member/register" className={styles.link}>
                註冊
              </Link>
            </div>
          )}
      </header>
    </div>
      <div className='d-flex flex-column d-lg-none'>
      {/* RWD 抓標題版本*/}
      <header className={styles.navbarB}>
        <div // logo
        >
          <Link href="/cart">
            <Image src={yslLogoXs} alt="ysl-logo" />
          </Link>
        </div>
          <h5 className='mb-0'>結帳</h5>
        <Link href="/" className="text-white ps-5">
          <FaArrowRight />
        </Link>
      </header>
      {/* RWD 一般版本*/}
      {/* <header className={styles.navbarB}>
        <div // logo
        >
          <Link href="/index.js">
            <Image src={yslLogoXs} alt="" />
          </Link>
        </div>
        
        <div className="">
          <SearchBarB />
        </div>
        <BurgerMenu />
      </header> */}
      </div>      
    </>
  )
}
