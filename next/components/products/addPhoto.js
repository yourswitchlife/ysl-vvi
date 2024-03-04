import React,{useState} from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import styles from '@/styles/products/product-detail.module.scss'

export default function AddPhoto({
  // setReviewPhoto = '',
  fieldChange = () => {},
}) {

  const [reviewPhoto, setReviewPhoto] = useState({ reviewPhoto: '' })

 
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
          // setReviewPhoto={reviewPhoto}
          name="reviewPhoto"
          // value={reviewPhoto.reviewPhoto}
          onChange={fieldChange}
          accept="image/"
        />
      </div>
    </>
  )
}
