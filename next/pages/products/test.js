import React, { useRef, useState } from 'react'
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react'
import ProductImgSlider from '@/components/products/product-img-slider';
import 'swiper/css';

// Import Swiper styles
// import './App.scss';
// import 'swiper/css'
// import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// import styles from '../../components/products/p-imageSlider.scss'
// import './styles.css';

// import required modules
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default function pImages() {
  // const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <>
      <div
        style={{
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{width:'500px'}}>
        {/* <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            // className={`${styles.product-images-slider}`}
          >
            <SwiperSlide style={{height:'500px',overflow:"hidden",position:"relative"}}>
              <img style={{height:'100%',position:"absolute",top:"0",left:"0"}} src="/images/product/HOPSTEPDANCE.jpg" alt="products" />
            </SwiperSlide>
            <SwiperSlide style={{height:'500px',overflow:"hidden",position:"relative"}}>
              <img style={{width:"100%",position:"absolute",top:"0",left:"0"}} src="/images/product/BigBrainAcademy-2.jpg" alt="products" />
            </SwiperSlide>
            <SwiperSlide style={{height:'500px',overflow:"hidden",position:"relative"}}>
              <img style={{width:"100%",position:"absolute",top:"0",left:"0"}} src="/images/product/BigBrainAcademy-1.jpg" alt="products" />
            </SwiperSlide>
            <SwiperSlide style={{height:'500px',overflow:"hidden",position:"relative"}}>
              <img style={{width:"100%",position:"absolute",top:"0",left:"0"}} src="/images/product/BigBrainAcademy-0.jpg" alt="products" />
            </SwiperSlide>
            
          </Swiper> */}
          <ProductImgSlider/>
        </div>
      </div>
    </>
  )
}
