import React from 'react'
import cover from '@/public/images/shopCover/default-cover.jpg'
import Image from 'next/image'
import styles from '@/components/seller/seller.module.scss'

export default function Cover() {
  return (
    <>
      {/* cover */}
      <div className={styles.cover}>
        <Image src={cover} alt="shop-cover" className={styles.fit} />
      </div>
    </>
  )
}
