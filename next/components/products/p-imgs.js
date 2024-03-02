import React, { useState,useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import Image from 'next/image'
import styles from '@/styles/products/product-detail.module.scss'
import imgc from '@/public/images/product/cover/BigBrainAcademy.jpg'
import img0 from '@/public/images/product/details/BigBrainAcademy-0.jpg'
import img1 from '@/public/images/product/details/BigBrainAcademy-1.jpg'
import img2 from '@/public/images/product/details/BigBrainAcademy-2.jpg'

export default function PImgs() {
  const imgAry = [{id:0,v:imgc},{id:1,v:img0},{id:2,v:img1},{id:3,v:img2}]
  const [sliderData,setSliderData] = useState(imgAry[0])
  const clickImg = (i) => {
    // console.log(imgAry[0])
    const slider = imgAry[i]
    setSliderData(slider)
    // console.log(sliderData)
  }

  const nextImg = () => {
    // console.log(sliderData)
    const currentIndex = sliderData.id
    // console.log(sliderData.id + 1)
    const nextIndex = (currentIndex + 1) % imgAry.length
    setSliderData(imgAry[nextIndex])
  }
  const prevImg=()=>{
    const currentIndex = sliderData.id
    const prevImg = currentIndex - 1 >= 0 ? currentIndex - 1 : imgAry.length - 1
    setSliderData(imgAry[prevImg])
  }
  // useEffect(() => {

  // }, [])
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center mb-2">
          <div
            className={`col-1 prev text-white d-flex justify-content-center align-items-center ${styles.ImgBtnhover}`}
            onClick={prevImg}
          >
            <FaAngleLeft
              
            />
          </div>
            <div className={`col-10 ${styles.h450px}`}>
              <Image
                src={sliderData.v}
                alt="product"
                // width={450}
                // height={250}
                priority={true}
                className={styles.objFit}
                // layout="intrinsic"
              />
            </div>
          <div
            className={`col-1 next text-white d-flex justify-content-center align-items-center ${styles.ImgBtnhover}`}
            onClick={nextImg} 
          >
            <FaAngleRight onClick={nextImg} />
          </div>
        </div>
        <div className="row align-items-center py-2">
        {imgAry.map((v, i) => {
          return(<div key={i} className="col-3 p-1">
                
            <div className={sliderData.id == i ? styles.imgActive : styles.h100px}>
              <Image
                src={v.v}
                alt="product"
                // width={100}
                height={100}
                priority={true}
                // className={styles.objFitC}
                style={{objectFit: "cover",height: "100%",width: "100%"}}
                onClick={()=>{clickImg(i)}}
              />
            </div>
          </div>)
        })}
        </div>
      </div>
    </>
  )
}
