import React from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import styles from '@/styles/products/product-detail.module.scss'

export default function AddPhoto() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <label className={styles.myLabel} htmlFor="review">
          <div className={styles.img}></div>
          <MdAddPhotoAlternate className={`${styles.icon} text-white-50 h2`} />
          <p className="text-white-50">新增圖片</p>
        </label>
        <input type="file" className="d-none" id="review" accept="image/" />
      </div>
    </>
  )
}
