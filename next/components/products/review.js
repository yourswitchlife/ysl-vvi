import React, { useState } from 'react'
import RatingStars from './rating-stars'
import styles from '../../styles/products/product-detail.module.scss'
import AddPhoto from '@/components/products/addPhoto'

export default function Review() {
  const [review, setReview] = useState({
    rating: '',
    review: '',
    reviewPhoto: '' 
  })
  // const [reviewPhoto, setReviewPhoto] = useState({ reviewPhoto: '' })
  const fieldChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
  }
  return (
    <>
      <form className={styles.formStyle} onSubmit={handleSubmit}>
        <div className="m-2 flex-grow-1">
          <RatingStars />

          <input
            type="text"
            name="review"
            className="form-control mt-3"
            placeholder="請留下您的評價... 限50字"
            // aria-label="Recipient's username"
            // aria-describedby="button-addon2"
            maxLength={50}
            value={review.review}
            onChange={fieldChange}
          ></input>
        </div>
        <div className="m-2">
          <AddPhoto
            // value={reviewPhoto.reviewPhoto}
            // setReviewPhoto={setReviewPhoto}
            fieldChange={fieldChange}
          />
        </div>
        {/* <button></button> */}
        <button
          className={`btn ${styles.btnSubmit}`}
          type="submit"
          id="reviewSubmit"
        >
          發布
        </button>
      </form>
    </>
  )
}
