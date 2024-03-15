import React from 'react'
import cover from '@/public/images/shopCover/default-cover.jpg'
import Image from 'next/image'
import styles from '@/components/seller/seller.module.scss'

export default function SellerCover({shopCover="cover"}) {
  return (
    <>
      {/* cover */}
      <div className={styles.coverB}>
        <Image height={216} width={1172} src={shopCover} alt="shop-cover" className={styles.fit} />
      </div>
    </>
  )
}
