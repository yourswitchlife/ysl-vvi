import React, { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import Image from 'next/image'
import pImgCover from '@/public/images/product/HOPSTEPDANCE.jpg'
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
          <div className={`col-1 prev text-white d-flex justify-content-center align-items-center ${styles.ImgBtnhover}`}>
            <FaAngleLeft />
          </div>
          <div className="col-10">
            <div className={styles.h450px}>
              <Image
                src={imgAry[0]}
                alt="product"
                // width={450}
                // height={250}
                priority={true}
                className={styles.objFit}
                // layout="intrinsic"
              />
            </div>
         
          </div>
          <div className={`col-1 next text-white d-flex justify-content-center align-items-center ${styles.ImgBtnhover}`}>
            <FaAngleRight />
          </div>
        </div>
        <div className="row align-items-center py-2">
          <div className="col-3 p-1">
            <div className={styles.h100px}>
              <Image
                src={imgAry[0]}
                alt="product"
                // width={100}
                height={100}
                priority={true}
                className={styles.objFitC}

              />
            </div>
          </div>
          <div className="col-3 p-1">
            <div className={styles.h100px}>
              <Image
                src={imgAry[1]}
                alt="product"
                // width={100}
                // height={100}
                priority={true}
                className={styles.objFitC}
              />
            </div>
          </div>
          <div className="col-3 p-1">
            <div className={styles.h100px}>
              <Image
                src={imgAry[1]}
                alt="product"
                // width={100}
                // height={100}
                priority={true}
                className={styles.objFitC}
              />
            </div>
          </div>
          <div className="col-3 p-1">
            <div className={styles.h100px}>
              <Image
                src={imgAry[1]}
                alt="product"
                // width={100}
                // height={400}
                priority={true}
                className={styles.objFitC}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
