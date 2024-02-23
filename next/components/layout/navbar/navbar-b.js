import react, { useState } from 'react'
import styles from '@/components/layout/navbar/navbar.module.scss'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import SearchBarB from '@/components/layout/navbar/searchBarB'
import Image from 'next/image'
import Link from 'next/link'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import { FaHeart, FaShoppingCart, FaBell, FaStore } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
//toggle list from react bootstrap
import Collapse from 'react-bootstrap/Collapse'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaPlus, FaAngleDown, FaFilter } from 'react-icons/fa'

// //dropdown menu
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

export default function NavbarB({ end, ...props }) {
  const [showMenu, setShowMenu] = useState(false)

  const handleCloseMenu = () => setShowMenu(false)
  const handleShowMenu = () => setShowMenu(true)

  //toggle
  // const [openSort, setOpenSort] = useState(false)
  // const [openRate, setOpenRate] = useState(false)

  return (
    <>
      <div className={styles.navbarB}>
        <div // logo
        >
          <Link href="/index.js">
            <Image src={yslLogoXs} alt="" />
          </Link>
        </div>
        
        <div className="">
          <SearchBarB />
        </div>
        {/* <button 
        type="button"
            className={`btn text-white ${styles.outline} ${styles.menu}`} >
          <IoMenu className={styles.menuicon} />
        </button> */}

        <button
          type="button"
          onClick={handleShowMenu}
          className={`btn text-white ${styles.outline} ${styles.menu}`}
        >
          <IoMenu className={styles.menuicon} />
        </button>
        <Offcanvas
          show={showMenu}
          onHide={handleCloseMenu}
          className={styles.navMenu}
          {...props}
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

        {/* 本來要用dropdown但效果不好，不是整個視窗，也會有爆版的情形 */}
        {/* 也沒辦法使用toggle+collapse：navbar會爆版 */}
        {/* <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" className={`btn text-white ${styles.outline} ${styles.menu} ${styles.dropdownToggle}`}>
          <IoMenu className={styles.menuicon} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" active>
            商品專區
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">優惠報報</Dropdown.Item>
          <Dropdown.Item href="#/action-3">最新攻略</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}

        {/* 未登入時顯示 */}
        {/* <div className="d-none">
          <Link href="" className={styles.link}>
            登入
          </Link>
          <span className={styles.unlogin}>|</span>
          <Link href="" className={styles.link}>
            註冊
          </Link>
        </div> */}
        
        {/* <div className={styles.circleCut}>
          <Link href="">
            <Image src={profilePhoto} alt="" />
          </Link>
        </div> */}
      </div>
    </>
  )
}
// export default function RightMenu() {
//   return (
//     <>
//     <NavbarB placement="end" name="end" />
//     </>
//   );
// }
