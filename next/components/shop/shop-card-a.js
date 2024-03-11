import React from 'react'
import Image from 'next/image'
//components
import Star from '@/components/shop/star'
//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
//styles
import styles from './shop-card-a.module.scss'

export default function ShopCardA({
  shop_name ="",
  avgRating = "",
}) {
  return (
    <>
    <div className={`${styles.cardSize} d-flex justify-content-start align-items-center p-2 mb-3`}>
    <div className={styles.shopProfile}>
    <Image height={75} width={75} src={profilePhoto} alt='shop-profile' className={styles.fit}/>
    </div>
    <div className='ms-3'>
    <h6 className='text-light'>{shop_name}123</h6>
    <Star avgRating={avgRating} />
    </div>
    
    </div>
    </>
  )
}
