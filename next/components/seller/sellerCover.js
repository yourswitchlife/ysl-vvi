import React from 'react'
import cover from '@/public/images/shop-cover/princess-peach.avif'
import Image from 'next/image'
import styles from '@/components/seller/seller.module.scss'

export default function SellerCover() {
  return (
    <>
      {/* cover */}
      <div className={styles.coverB}>
        <Image src={cover} alt="shop-cover" className={styles.fit} />
      </div>
    </>
  )
}
