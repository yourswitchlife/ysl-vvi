import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";

import styles from '@/styles/member/index.module.scss';

export default function TypeSlider() {
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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <div className={styles.App}>
      <Slider {...settings}>
        {type.map((ty, idx) => (
          <div className={`${styles.slide} ${idx === imageIndex ? styles.activeSlide : ''}`} key={idx}>
            <img src={`http://localhost:3005/type/${ty.image}`} alt={ty.image} className={styles.fit}/>
          </div>
        ))}
      </Slider>
    </div>
  );
}

