import React, { useState,useEffect } from 'react'
import RatingStars from './rating-stars'
import styles from '../../styles/products/product-detail.module.scss'
import AddPhoto from '@/components/products/addPhoto'
import { useAuth } from '@/hooks/use-Auth'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Review({shopId}) {
  const { isLoggedIn, memberId } = useAuth()
  const [review, setReview] = useState({
    rating: 0,
    review: '',
    reviewPhoto: null,
  })
  const [filePicked, setFilePicked] = useState(false)
  const [imgServerUrl, setImgServerUrl] = useState('')

  const changHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFilePicked(true)
      setImgServerUrl('')
      setReview(prevReview => ({ ...prevReview, reviewPhoto: file }))
    } else {
      setFilePicked(false)
      setImgServerUrl('')
      setReview(prevReview => ({ ...prevReview, reviewPhoto: null }))
    }
  }

  const fieldChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!memberId){
      MySwal.fire({
        icon: 'warning',
        text: '請先登入',
        confirmButtonColor: '#E41E49',
      })
    }else{

      if (!review.review) {
        MySwal.fire({
          icon: 'warning',
          text: '請輸入您的評論',
          confirmButtonColor: '#E41E49',
        })
        return
      } else {
        const formData = new FormData(e.target)
        formData.append('rating', review.rating)
        if (review.reviewPhoto) {
          formData.append('reviewPhoto', review.reviewPhoto)
        }
  
        console.log(review.reviewPhoto)
        console.log(formData.get('rating'))
        console.log([...formData])

        fetch(
          `http://localhost:3005/api/products/addReview?memberId=${memberId}&shopId=${shopId}`,
          {
            credentials: 'include',
            method: 'POST',
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => {
            Swal.fire({
              title: '評論發佈成功！',
              icon: 'success',
            })
              setTimeout(() => {
                setReview({
                  rating: 0,
                  review: '',
                  reviewPhoto: '',
                })
              }, 1000)
          })
          .catch((error) => {
            console.error('error', error)
          })
      }
    }
  }

  // console.log(review)

  return (
    <>
      <form
        className={styles.formStyle}
        onSubmit={handleSubmit}
      >
        <div className="ms-3 flex-grow-1">
          <RatingStars
            fieldChange={fieldChange}
            value={review.rating}
            name="rating"
          />

          <input
            type="text"
            name="review"
            className="form-control mt-3"
            placeholder="請留下您的評價... 限30字"
            maxLength={50}
            value={review.review}
            onChange={fieldChange}
          />
        </div>
        <div className="m-2">
          <AddPhoto
            fileChangHandler={changHandler}
            name="reviewPhoto"
          />
        </div>

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
