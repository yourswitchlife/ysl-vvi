import { useState } from 'react'
import styles from '@/components/navbar/navbar.module.scss'
import yslLogo from '@/public/images/logo/logo-sm.svg'
import yslLogoXs from '@/public/images/logo/logo-xs.svg'
import SearchBarB from './searchBarB'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaBell, FaStore, FaArrowRight } from 'react-icons/fa'
import BurgerMenu from './burgermenu'

export default function CartNavbar() {
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
        {/* 登入後顯示 */}
        <div className={styles.cartRight}>
          <div className={styles.iconGroup}>
            <Link href="" className={styles.loginIcon}>
              <FaHeart />
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
          <SearchBarB />
        </div>
        <BurgerMenu />
      </header>
      </div>
    </>
  )
}
