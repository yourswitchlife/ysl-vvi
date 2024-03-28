import { useState } from 'react'
import styles from './navbar.module.scss'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import Image from 'next/image'
import Link from 'next/link'
// import { FaHeart, FaShoppingCart, FaBell, FaStore } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
import Offcanvas from 'react-bootstrap/Offcanvas'
//登出邏輯
import handleLogout from '@/services/logout';
//context hooks
import { useAuth } from '@/hooks/use-Auth';


export default function BurgerMenu() {
  const { isLoggedIn } = useAuth();
  const [showMenu, setShowMenu] = useState(false)

  const handleCloseMenu = () => setShowMenu(false)
  const handleShowMenu = () => setShowMenu(true)

  return (
    <>
    <div className='d-lg-none d-block'>
      <button
        type="button"
        onClick={handleShowMenu}
        className={`btn text-white ${styles.outline} ${styles.menu}`}
      >
        <IoMenu className={styles.menuicon} />
      </button></div>
      <Offcanvas
        show={showMenu}
        onHide={handleCloseMenu}
        className={styles.navMenu}
        style={{ width: 180 }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div // logo
            >
              <Link href="/">
                <Image src={yslLogoXs} alt="" />
              </Link>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex align-items-center flex-column">
          <div className='d-flex flex-column'>
            <Link href="/products" className={`text-white pt-2 pb-2 ${styles.linkstyle}`}>
              <h5>商品專區</h5>
            </Link>
            <Link href="/coupon" className={`text-white pt-2 pb-2 ${styles.linkstyle}`}>
              <h5>優惠報報</h5>
            </Link>
            <Link href="/article" className={`text-white pt-2 pb-2 ${styles.linkstyle}`}>
              <h5>最新攻略</h5>
            </Link>
          </div>
          <div
            className={`d-flex flex-column justify-content-center ${styles.selectBtn}`}
          >
            {isLoggedIn ? (
              <div className={`d-flex justify-content-center`}>
                <button className={`text-white ${styles.linkStyle}`} onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0, color: 'blue', textDecoration: 'none', cursor: 'pointer' }}>
                  登出
                </button>
                <span className={`text-white ps-2 pe-2 ${styles.linkstyle}`}>
                  |
                </span>
                <Link href="/member/points" className={`text-white ${styles.linkstyle}`}>
                  會員專區
                </Link>
              </div>) : (
              <div className={`d-flex justify-content-center`}>
                <Link href="/member/login" className={`text-white ${styles.linkstyle}`}>
                  登入
                </Link>
                <span className={`text-white ps-2 pe-2 ${styles.linkstyle}`}>
                  |
                </span>
                <Link href="/member/register" className={`text-white ${styles.linkstyle}`}>
                  註冊
                </Link>
              </div>)}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
