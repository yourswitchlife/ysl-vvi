import { useState }from 'react'
import styles from './navbar.module.scss'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import Image from 'next/image'
import Link from 'next/link'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import { FaHeart, FaShoppingCart, FaBell, FaStore } from 'react-icons/fa'
import { FaSearch } from "react-icons/fa";
import Offcanvas from 'react-bootstrap/Offcanvas'
import SearchBarB from './searchBarB'

export default function SearchMenu() {
    const [showMenu, setShowMenu] = useState(false)

    const handleCloseMenu = () => setShowMenu(false)
    const handleShowMenu = () => setShowMenu(true)

  return (
    <>
      <button
          type="button"
          onClick={handleShowMenu}
          className={`btn text-white ${styles.outline} ${styles.menu}`}
        >
          <FaSearch className={styles.menuicon} />
        </button>
        <Offcanvas
          show={showMenu}
          onHide={handleCloseMenu}
          className={styles.navMenu}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div // logo
              >
                <Link href="/index.js">
                  <Image src={yslLogoXs} alt="" />
                </Link>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex align-items-center flex-column">
            <div className='d-flex flex-column'>
                <div>
                    <SearchBarB />
                </div>
              <Link href="" className={`text-white pt-2 pb-2 ${styles.linkstyle}`}>
                <h5>商品專區</h5>
              </Link>
              <Link href="" className={`text-white pt-2 pb-2 ${styles.linkstyle}`}>
              <h5>優惠報報</h5>
              </Link>
              <Link href="" className={`text-white pt-2 pb-2 ${styles.linkstyle}`}>
              <h5>最新攻略</h5>
              </Link>
            </div>
            <div
              className={`d-flex flex-column justify-content-center ${styles.selectBtn}`}
            >
              {/* 未登入時顯示 */}
              <div className={`d-flex justify-content-end`}>
                <Link href="" className={`text-white ${styles.linkstyle}`}>
                  登入
                </Link>
                <span className={`text-white ps-2 pe-2 ${styles.linkstyle}`}>
                  |
                </span>
                <Link href="" className={`text-white ${styles.linkstyle}`}>
                  會員專區
                </Link>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
    </>
  )
}
