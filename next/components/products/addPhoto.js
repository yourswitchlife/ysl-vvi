import React, { useState, useEffect } from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import styles from '@/styles/products/product-detail.module.scss'

export default function AddPhoto({
  // setReviewPhoto = '',
  fieldChange = () => {},
  changHandler = () => {},
}) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <label className={styles.myLabel} htmlFor="reviewPhoto">
          <div className={styles.img}></div>
          <MdAddPhotoAlternate className={`${styles.icon} h2`} />
        </label>
        <input
          type="file"
          className="d-none"
          id="reviewPhoto"
          name="reviewPhoto"
          onChange={(e) => {
            fieldChange(e)
            changHandler(e)
          }}
          accept="image/*"
        />
      </div>
    </>
  )
}
