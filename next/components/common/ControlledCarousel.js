import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import styles from '@/styles/index.module.scss'
import mstyles from '@/styles/member/index.module.scss'
import Image from 'next/image';

function ControlledCarousel() {
  const [index, setIndex] = useState(0)
  // const [products, setProducts] = useState([]);
  const [images, setImages] = useState([
    'http://localhost:3005/main/009.webp',
    'http://localhost:3005/main/002.jpg',
    'http://localhost:3005/main/003.jpg',
    'http://localhost:3005/main/012.webp',
    'http://localhost:3005/main/010.png',
  ]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  /* useEffect(() => {
    fetchProducts();
  }, []); */

  /* const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/main');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.items);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }; */

  return (
    <Carousel
   style={{ background: 'linear-gradient(to bottom, rgba(225, 225, 225, 0) 0%, rgba(0, 0, 0, 1) 100%)' }}
      activeIndex={index}
      onSelect={handleSelect}
      className={styles.sec1}
    >
      {images.map((imageUrl, i) => (
        <Carousel.Item key={i} className={mstyles.carousel}>
          <Image
            src={imageUrl}
            alt="mainimages"
            // className={mstyles.fit}
            width={1920}
            height={1100}
            style={{opacity: 0.65}}
            className={`${styles.pIndexImg}`}
          />
        </Carousel.Item>
        
      ))}
    </Carousel>
  )
}

export default ControlledCarousel
