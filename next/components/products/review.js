import React from 'react'
import RatingStars from './rating-stars'
import styles from '../../styles/products/product-detail.module.scss'
import AddPhoto from '@/components/products/addPhoto'

export default function Review() {
  return (
    <>
      <form className={styles.formStyle}>
        <div class="m-2 flex-grow-1">
          <RatingStars />
      
          <input
            type="text"
            className="form-control mt-3"
            placeholder="請留下您的評價... 限50字"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          ></input>
        </div>
        <div className="m-2">
          <AddPhoto />
        </div>
        {/* <button></button> */}
        <button
          className={`btn ${styles.btnSubmit}`}
          type="submit"
          id="btnSubmit"
        >
          發布
        </button>
      </form>
    </>
  )
}
