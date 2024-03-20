import React from 'react';
import Slider from 'react-slick';
import styles from '@/styles/member/index.module.scss';

// 自定义左右箭头组件
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.customArrow} ${styles.nextArrow}`}
        style={{ ...style, display: 'block' }} // 确保箭头可见
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.customArrow} ${styles.prevArrow}`}
        style={{ ...style, display: 'block' }} // 确保箭头可见
        onClick={onClick}
      />
    );
  }
  
  export default function TypeSlider() {
    const settings = {
      dots: false, // 是否显示底部导航点
      infinite: true, // 是否循环滚动
      centerMode: true, // 启用中央模式
      centerPadding: '60px', // 两边的padding，根据需要进行调整
      slidesToShow: 3, // 同时显示的滑块数量
      speed: 500, // 切换速度
      slidesToScroll: 1, // 每次滚动的滑块数量
      nextArrow: <SampleNextArrow />, // 使用自定义的下一张箭头组件
      prevArrow: <SamplePrevArrow />, // 使用自定义的上一张箭头组件
    };
  
    return (
      <div className={styles.carouselWrapper}>
        <Slider {...settings}>
          {/* 这里插入图片或者卡片组件 */}
        </Slider>
      </div>
    );
  }

