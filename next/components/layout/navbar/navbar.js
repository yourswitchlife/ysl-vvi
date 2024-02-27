import { useState } from 'react'
import styles from '@/components/layout/navbar/navbar.module.scss'
import yslLogoSm from '@/public/images/logo/logo-sm.svg'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import SearchBar from './searchBar'
import SearchBarB from './searchBarB'
import Image from 'next/image'
import Link from 'next/link'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import { FaHeart, FaShoppingCart, FaBell, FaStore } from 'react-icons/fa'
import BurgerMenu from './burgermenu'

export default function Navbar() {

  return (
    <>
    <div className='d-none d-lg-block'>
      <header
        className={styles.navbar}
      >
        <div // logo
        >
          <Link href="/index.js">
            <Image src={yslLogoSm} alt="ysl-logo" />
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="" className={styles.linkPr}>
            商品專區
          </Link>
          <Link href="" className={styles.linkPr}>
            優惠報報
          </Link>
          <Link href="" className={styles.link}>
            最新攻略
          </Link>
        </div>
        <div className="">
          <SearchBar />
        </div>
        {/* 未登入時顯示 */}
        <div className="d-none">
          <Link href="" className={styles.link}>
            登入
          </Link>
          <span className={styles.unlogin}>|</span>
          <Link href="" className={styles.link}>
            註冊
          </Link>
        </div>
        {/* 登入後顯示 */}
        <div className="d-flex align-items-center">
          <Link href="" className={styles.loginIcon}>
            <FaHeart />
          </Link>
          <Link href="" className={styles.loginIcon}>
            <FaShoppingCart />
          </Link>
          <Link href="" className={styles.loginIcon}>
            <FaBell />
          </Link>
          <Link href="" className={styles.loginIconEnd}>
            <FaStore />
          </Link>
        </div>
        <div className={styles.circleCut}>
          <Link href="">
            <Image src={profilePhoto} alt="profile-photo" />
          </Link>
        </div>
      </header>
      </div>
      {/* RWD */}
      <div className='d-flex flex-column d-lg-none'>
      <header className={styles.navbarB}>
        <div // logo
        >
          <Link href="/index.js">
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
