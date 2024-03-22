import React from 'react'
import Image from 'next/image'
import RatingStars from './rating-stars'
import styles from '../../styles/products/product-detail.module.scss'

export default function Reviewed({
  name,
  pic,
  content,
  created_at,
  rating,
  comment_img,
  reply,
}) {
  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <Image
          src={`http://localhost:3005/profile-pic/${pic}`}
          className="rounded-circle img-fluid"
          alt={pic}
          width={50}
          height={50}
        />
        <div className="ms-2">
          <h6 className="text-white mb-1">{name}</h6>
          <p className="text-white">{created_at.split('T')[0]}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className='d-flex'>
          <div>
            <RatingStars rating={rating} />
         
            <h6 className="text-white py-2 me-lg-5 me-0">{content}</h6>
          </div>
          {comment_img != '' ? (
            <div className={`${styles.reviewImg} d-flex`}>
              <div className={styles.h100100px}>
                <Image
                  src={`http://localhost:3005/reviewImg/${comment_img}`}
                  alt="product"
                  width={80}
                  height={80}
                  priority={true}
                  className={styles.objFit}
                />
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        {reply != '' ? (
          <div className="text-white pe-lg-3 pe-0 p">
            店家回覆：<p className="text-white">{reply}</p>
          </div>
        ) : (
          ''
        )}
      </div>
      <hr className="text-white border-3 my-3" />
    </>
  )
}
