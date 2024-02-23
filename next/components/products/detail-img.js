import React from 'react'
import Image from 'next/image'
import pImgDetail from '@/public/images/product/MonsterFarm-1.jpg'

export default function DetailImg() {
  return (
    <>
      <Image
        src={pImgDetail}
        alt="product-detail"
        width={670}
        height={400}
        priority={true}
        className="my-3 w-100 h-auto"
      />
    </>
  )
}
