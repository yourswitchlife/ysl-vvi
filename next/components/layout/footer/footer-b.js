import React from 'react'
import styles from '@/components/layout/footer/footer-b.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import yslLogo from '@/public/images/logo/logo-sm.svg'
import yslLogoMobile from '@/public/images/logo/logo_White-mobileLogo.svg'
import { FaLine, FaInstagram, FaFacebook } from 'react-icons/fa6'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.infoTop}>
          <div className={styles.infoTextWrap}>
            <Link href="" className={styles.infoText}>
              關於我們
            </Link>
            <Link href="" className={styles.infoText}>
              聯絡我們
            </Link>
            <Link href="" className={styles.infoText}>
              Ｑ＆Ａ
            </Link>
          </div>
          <div>
            <Link href="" className={styles.infoIcon}>
              <FaLine className={styles.icon} />
            </Link>
            <Link href="" className={styles.infoIcon}>
              <FaInstagram className={styles.icon} />
            </Link>
            <Link href="" className={styles.infoIcon}>
              <FaFacebook className={styles.icon} />
            </Link>
          </div>
        </div>
        <div className={styles.logoWrap}>
          <Image src={yslLogo} alt="" className={styles.logo} />
          <Image src={yslLogoMobile} alt="" className={styles.logoMobile} />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <p className={styles.infoBottom}>
            copyright © 2024 Your Switch Life. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
