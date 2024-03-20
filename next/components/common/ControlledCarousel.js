import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import styles from '@/styles/index.module.scss'
import mstyles from '@/styles/member/index.module.scss'

function ControlledCarousel() {
  const [index, setIndex] = useState(0)
  // const [products, setProducts] = useState([]);
  const [images, setImages] = useState([
    'http://localhost:3005/main/001.jpg',
    'http://localhost:3005/main/002.jpg',
    'http://localhost:3005/main/003.jpg',
    'http://localhost:3005/main/004.jpg',
    'http://localhost:3005/main/005.jpg',
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
      activeIndex={index}
      onSelect={handleSelect}
      className={styles.sec1}
    >
      {images.map((imageUrl, i) => (
        <Carousel.Item key={i} className={mstyles.carousel}>
          <img
            src={imageUrl}
            alt="mainimages"
            className={mstyles.fit}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ControlledCarousel
