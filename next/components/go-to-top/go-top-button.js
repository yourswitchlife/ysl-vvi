import React from 'react'
import { useEffect, useState } from 'react'
// import { HiMiniArrowUpCircle } from 'react-icons/hi2'
import { HiArrowCircleUp } from 'react-icons/hi';

import styles from './go-to-top.module.scss'
import { Image } from 'react-bootstrap';

export default function GoTopButton() {
  const [goTopButton, setgoTopButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setgoTopButton(true)
      } else {
        setgoTopButton(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      {goTopButton && (
        <button className={styles.btn} onClick={scrollUp}
        >
          <Image src="/images/coupon/goTop.png" />
          {/* <HiArrowCircleUp  className={styles.icon}/> */}
        </button>
      )}
    </div>
  )
}
