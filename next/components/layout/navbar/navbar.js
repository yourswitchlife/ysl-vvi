import React, { useState, useEffect, useContext, useRef } from 'react'
import LogoSm from '@/components/common/logo-sm'
import styles from '@/components/layout/navbar/navbar.module.scss'
import yslLogoSm from '@/public/images/logo/logo-sm.svg'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
// import SearchBar from './searchBar'
// import SearchBarB from './searchBarB'
import Image from 'next/image'
import Link from 'next/link'
// import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import {
  FaHeart,
  FaShoppingCart,
  FaBell,
  FaStore,
  FaSearch,
} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown'
import BurgerMenu from './burgermenu'
//登出邏輯
import handleLogout from '@/services/logout'
//context hooks
import { useAuth } from '@/hooks/use-Auth'

//我做完的組件 可以用到評論上 已套用會員等級框
import NavPic from '@/hooks/use-navpic'
// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/router'
//websocket
import { useWebSocket } from '@/context/member/websocketLong'

export default function Navbar(props) {
  const { searchWord, setSearchWord } = props
  const { isLoggedIn, memberId, memberData } = useAuth()

  const [isHovered, setIsHovered] = useState(false)
  const { totalProducts } = useCart()
  const { unreadCount } = useWebSocket()

  // const [unreadCount, setUnreadCount] = useState(0);
  // const socket = io('http://localhost:3005');

  /*   useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the webserver');
      if (memberId) {
        // console.log('傳送memberId給後端');
        socket.emit('member_connected', { memberId: memberId });
      }
    });
    socket.on('unread_count', (count) => {
      console.log('收到未讀通知:', count);
      setUnreadCount(count);
    });

    return () => {
      console.log('Disconnecting from the webserver...');
      socket.off('connect');
      socket.off('unread_count');
      socket.close();
    };

  }, [memberId]) */

  return (
    <>
      <div className={`${styles.navbar}`}>
        <header
          className={`w-100 mx-lg-5 mx-0 px-lg-5 me-4 me-lg-5 px-0 d-flex justify-content-between align-items-center`}
        >
          <div
            className="ms-lg-5 ms-4" // logo
          >
            <Link href="/" title="Your Switch Life首頁">
              <LogoSm />
            </Link>
          </div>
          <div className="d-lg-block d-none">
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

          <div className={styles.display}>
            <button type="button" className={`${styles.button}`}>
              <FaSearch className={styles.icon} />
            </button>
            <input
              type="text"
              // text="search"
              placeholder="搜尋所有商品..."
              className={styles.search}
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value)
              }}
            />
          </div>

          {isLoggedIn ? (
            // 登入後顯示
            <div className={`d-lg-flex d-none align-items-center`}>
              <Link href="/member/fav-product" className={styles.loginIcon}>
                <FaHeart className={styles.icon} />
              </Link>
              <Link
                href="/cart"
                className={`${styles.loginIcon} position-relative`}
              >
                <FaShoppingCart className={styles.icon} />
                {totalProducts > 0 && (
                  <span class="position-absolute top-0 start-99 translate-middle badge rounded-pill bg-danger">
                    {totalProducts}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </Link>
              <Link href="/member/notify-coupon" className={styles.loginIcon}>
                <FaBell className={styles.icon} />
                {unreadCount > 0 && (
                  <span className="position-absolute start-99 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link href="/seller" className={styles.loginIconEnd}>
                <FaStore className={styles.icon} />
              </Link>
            </div>
          ) : (
            // 未登入時顯示
            <div className={`me-5 d-lg-block d-none`}>
              <Link href="/member/login" className={styles.link}>
                登入
              </Link>
              <span className={styles.unlogin}>|</span>
              <Link href="/member/register" className={styles.link}>
                註冊
              </Link>
            </div>
          )}
          {/* <div className='d-none d-lg-block'> */}
          <div className={styles.phoneNone} style={{ display: isLoggedIn && memberData ? 'block' : 'none' }}>
            {isLoggedIn ? (
              <Dropdown>
                <Dropdown.Toggle
                  className={`${styles.member_drop} ${
                    isHovered ? 'hover_toggle' : ''
                  }`}
                  variant="black"
                  id="dropdown-basic"
                >
                  <NavPic />
                  <h6 className="ps-2 fw-bold">{memberData?.account}</h6>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link
                    style={{ textDecoration: 'none' }}
                    href="/member/points"
                    passHref
                  >
                    <Dropdown.Item as="a">會員專區</Dropdown.Item>
                  </Link>
                  <Dropdown.Item
                    as="button"
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    登出
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </div>
          {/* </div> */}
        <BurgerMenu />
        </header>
      </div>
    </>
  )
}
