import React, { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import Image from 'next/image'
import pImgCover from '@/public/images/product/HOPSTEPDANCE.jpg'
import DetailImg from './detail-img'
import styles from '@/styles/products/product-detail.module.scss'
import img1 from '@/public/images/product/HOPSTEPDANCE.jpg'
import img2 from '@/public/images/product/MonsterFarm-1.jpg'
import img3 from '@/public/images/product/MonsterFarm-1.jpg'
import img4 from '@/public/images/product/MonsterFarm-1.jpg'

export default function PImgs() {
  let imgAry = [img1, img2, img3, img3]
  // useEffect(() => {

  // }, [])
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center mb-2">
          <div className="col prev text-white">
            <FaAngleLeft />
          </div>
          <div className="col-9 d-flex justify-content-center align-items-center bg-danger-subtle">
            <div className={styles.h420px}>
              <Image
                src={imgAry[0]}
                alt="product"
                width={150}
                height={244}
                priority={true}
                className={styles.objFit}
              />
            </div>
          </div>
          <div className="col next text-white">
            <FaAngleRight />
          </div>
        </div>
        <div className={`row ${styles.pImgs} align-items-center`}>
          <div className="col d-flex justify-content-center align-items-center bg-primary-subtle">
            <div className={styles.h100px}>
              <Image
                src={imgAry[0]}
                alt="product"
                // width={100}
                height={100}
                priority={true}
              />
            </div>
          </div>
          <div className="col bg-primary-subtle p-0 d-flex align-items-center">
            <div className={styles.h100px}>
              <Image
                src={imgAry[1]}
                alt="product"
                width={100}
                // height={100}
                priority={true}
              />
            </div>
          </div>
          <div className="col bg-primary-subtle p-0">
            <div className={styles.h100px}>
              <Image
                src={imgAry[1]}
                alt="product"
                width={100}
                // height={100}
                priority={true}
              />
            </div>
          </div>
          <div className="col bg-primary-subtle p-0">
            <div className={styles.h100px}>
              <Image
                src={imgAry[1]}
                alt="product"
                width={100}
                // height={100}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
