// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react'
import styles from '@/styles/member/index.module.scss';
import Link from 'next/link'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// Import Swiper styles

export default function TypeSwiper() {
  const [type, setType] = useState([])

  useEffect(() => {
    fetchType();
  }, []);

  const fetchType = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/main/type');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setType(data.items);
      console.log(type)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  /* 
    const NextArrow = ({ onClick }) => {
      return (
        <div className={`${styles.arrow} ${styles.next}`} onClick={onClick}>
          <IoMdArrowDroprightCircle />
        </div>
      );
    };
  
    const PrevArrow = ({ onClick }) => {
      return (
        <div className={`${styles.arrow} ${styles.prev}`} onClick={onClick}>
          <IoMdArrowDropleftCircle />
        </div>
      );
    }; */

  const handleInit = (swiper) => {
    // Swiper 初始化
    setActiveSlideStyle(swiper);
  };

  const handleSlideChange = (swiper) => {
    setActiveSlideStyle(swiper);
  };

  const setActiveSlideStyle = (swiper) => {
    swiper.slides.forEach((slide) => {
      slide.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
      slide.style.opacity = 0.3;
      slide.style.transform = 'scale(0.8)';
    });

    // active
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      activeSlide.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
      activeSlide.style.opacity = 1;
      activeSlide.style.transform = 'scale(1)';
    }
  };


  return (
    <Swiper
      className={styles.slider}
      onSwiper={handleInit}
      onSlideChange={handleSlideChange}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3} 
      loop={true}
      breakpoints={{
        1440: {
          slidesPerView: 5,
        },
      }}
    >
      {type.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className={styles.slidebox}>
            <Link href={`/products?type=${item.id}`}>
              <img src={`http://localhost:3005/type/${item.image}`} alt={item.name} className={styles.fit} />
            </Link>
          </div>
          <h6 className='text-white d-lg-none d-flex ps-2'>{item.name}</h6>
          <h4 className='text-white d-none d-lg-flex justify-content-center'>{item.name}</h4>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}