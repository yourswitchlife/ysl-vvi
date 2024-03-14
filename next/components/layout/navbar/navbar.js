import React, { useState } from 'react';

import styles from '@/components/layout/navbar/navbar.module.scss'
import yslLogoSm from '@/public/images/logo/logo-sm.svg'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import SearchBar from './searchBar'
import SearchBarB from './searchBarB'
import Image from 'next/image'
import Link from 'next/link'
// import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import { FaHeart, FaShoppingCart, FaBell, FaStore, FaSearch } from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown';
import BurgerMenu from './burgermenu'
//登出邏輯
import handleLogout from '@/services/logout';
//context hooks
import { useAuth } from '@/hooks/use-Auth';

//我做完的組件 可以用到評論上 已套用會員等級框
import NavPic from '@/hooks/use-navpic';
// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'


export default function Navbar(props) {
  const { searchWord, setSearchWord } = props
  const { isLoggedIn, memberData } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const {totalProducts} = useCart()
  return (
    <>
    <div className='d-none d-lg-block'>
      <header
        className={styles.navbar}
      >
        <div // logo
        >
          <Link href="/">
            <Image src={yslLogoSm} alt="ysl-logo" />
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/products" className={styles.linkPr}>
            商品專區
          </Link>
          <Link href="/coupon" className={styles.linkPr}>
            優惠報報
          </Link>
          <Link href="/article" className={styles.link}>
            最新攻略
          </Link>
        </div>
        <div className="">
        <div className={styles.display}>
        <button type="button" className={`${styles.button}`}>
          <FaSearch className={styles.icon} />
        </button>
        <input
        type='text'
          // text="search"
          placeholder="搜尋所有商品..."
          className={styles.search}
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value)}}
        />
      </div>
        </div>
        {isLoggedIn ? (
            // 登入後顯示
            <div className="d-flex align-items-center">
              <Link href="/member/fav-product" className={styles.loginIcon}>
                <FaHeart className={styles.icon}/>
              </Link>
              <Link href="/cart" className={`${styles.loginIcon} position-relative`}>
                <FaShoppingCart className={styles.icon} />
                <span class="position-absolute top-0 start-99 translate-middle badge rounded-pill bg-danger">
                {totalProducts}
                <span className="visually-hidden">unread messages</span>
              </span>
              </Link>
              <Link href="/member/notify-order" className={styles.loginIcon}>
                <FaBell className={styles.icon}/>
              </Link>
              <Link href="/seller" className={styles.loginIconEnd}>
                <FaStore className={styles.icon} />
              </Link>
            </div>
          ) : (
            // 未登入時顯示
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

          <div
            style={{ display: isLoggedIn && memberData ? 'block' : 'none' }}
          >
            {isLoggedIn ? (
              <Dropdown >
                <Dropdown.Toggle className={`${styles.member_drop} ${isHovered ? 'hover_toggle' : ''}`} variant="black" id="dropdown-basic">
                  <NavPic />
                </Dropdown.Toggle>

                <Dropdown.Menu onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>
                  <Link style={{ textDecoration: 'none' }} href="/member/points" passHref>
                    <Dropdown.Item as="a">會員專區</Dropdown.Item>
                  </Link>
                  <Dropdown.Item as="button" onClick={handleLogout} className={styles.logoutButton}>
                    登出
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>


            ) : null}
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
        <div className="">
          <SearchBarB />
        </div>
        <BurgerMenu />
      </header>
      </div>
    </>
  )
}
