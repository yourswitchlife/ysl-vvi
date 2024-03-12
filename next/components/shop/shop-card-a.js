import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
//components
import Star from '@/components/shop/star'
//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
//styles
import styles from './shop-card-a.module.scss'

export default function ShopCardA({
  shopInfo = { id: 20, rating: 4, shop_id: 3, shop_name: '碧姬公主的玩具城堡', pic: 'peach.png', shop_site: '' },
  avgRating = 5,
}) {
  const picUrl = shopInfo.pic ? (shopInfo.pic.startsWith("https://") 
        ? shopInfo.pic 
        : `http://localhost:3005/profile-pic/${shopInfo.pic}`) 
      : profilePhoto

  return (
    <>
    <Link href={`http://localhost:3000/shop/${shopInfo.shop_site}`} className='text-decoration-none'>
    <div className={`${styles.cardSize} d-flex justify-content-start align-items-center p-2 mb-3`}>
    <div className={styles.shopProfile}>
    <Image height={75} width={75} src={picUrl} alt='shop-profile' className={styles.fit}/>
    </div>
    <div className='ms-3 d-flex flex-column align-items-start'>
    <h6 className='text-light'>{shopInfo.shop_name}</h6>
    <Star avgRating={4} />
    </div>
    </div>
    </Link>
    </>
  )
}
