import React, { useState, useEffect } from 'react'
import styles from '../../styles/products/products.module.scss'
import Image from 'next/image'

export default function Animation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 设置延时来改变show状态
    const timer = setTimeout(() => {
      setShow(true);
    }, 2500);
    // 清理函数，以防组件卸载时定时器还在运行
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {/* <div className={`d-flex z-3 position-absolute ${styles.wrap}`}> */}
      {/* <div className={styles.aniBlue}></div> */}
      <div className={`d-none d-lg-block ${styles.aniRed}`}>
      {show && (
        <div className='mt-5 ms-5'>
          <h4 className="text-white">Enjoy Your Switch Life!</h4>
          <h1 className="text-white">
            盡情挑選
            <br />
            喜歡的
            <br />
            遊戲
          </h1>
        </div>
      )}
      </div>
      {/* </div> */}
      <Image
        src="/images/product/nav.jpg"
        alt="product"
        width={1440}
        height={560}
        priority={true}
        className={`${styles.pIndexImg}`}
      />
    </>
  )
}
