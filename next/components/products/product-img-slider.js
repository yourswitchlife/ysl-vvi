import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css'

import { Navigation, Thumbs } from 'swiper/modules'

export default function ProductImgSlider({ img_cover, img_details }) {
  const [active, setActive] = useState()

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: active }}
        className="product-images-slider">
        <SwiperSlide>
          <img
            style={{ height: '100%', padding: '10px' }}
            src={`http://localhost:3005/productImg/cover/${img_cover}`}
            alt="products"
          />
        </SwiperSlide>
        {img_details != ''
          ? img_details.split(',').map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <img
                    style={{ width: '100%', padding: '10px' }}
                    src={`http://localhost:3005/productImg/details/${v}`}
                    alt="products"
                  />
                </SwiperSlide>
              )
            })
          : ''}

      </Swiper>
      {/* 小圖 */}
      <Swiper
        onSwiper={setActive}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        // grabCursor={true}
        className="product-images-slider-thumb"
      >
        <SwiperSlide>
          <div className="product-images-slider-thumbs-wrapper" style={{height:'100%',width:'100%'}}>
            <img
              style={{ height: '100%',width:'100%',objectFit:'cover', padding: '3px' }}
              src={`http://localhost:3005/productImg/cover/${img_cover}`}
              alt="products"
            />
          </div>
        </SwiperSlide>
        {img_details != ''
          ? img_details.split(',').map((v, i) => {
              return (
                <SwiperSlide key={i}>
                <div className="product-images-slider-thumbs-wrapper" style={{height:'100%',width:'100%'}}>
                  <img
                    style={{ height: '100%',width:'100%',objectFit:'cover', padding: '3px' }}
                    src={`http://localhost:3005/productImg/details/${v}`}
                    alt="products"
                  />
                   </div>
                </SwiperSlide>
              )
            })
          : ''}
      </Swiper>
    </>
  )
}
