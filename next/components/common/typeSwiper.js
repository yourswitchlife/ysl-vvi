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
  const [imageIndex, setImageIndex] = useState(0);

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
  };

  return (
    <div>
      <h1>New Movies</h1>
      <Swiper
        className="mySwiper"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="4"
        coverflowEffect={{
          rotate: 15,
          stretch: 10,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
      >{type.map((ty, idx) => (
        <SwiperSlide>
          <div className={styles.slidebox} key={idx}>
            <Link href="/member/account">
              <img src={`http://localhost:3005/type/${ty.image}`} alt={ty.image} className={styles.fit} />
            </Link>
          </div>
          <h4 className={styles.slitext}>{ty.name}</h4>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
};

