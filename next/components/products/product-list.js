import React, { useState } from 'react'
import Image from 'next/image'
import { FaRegHeart, FaHeart, FaCartPlus } from 'react-icons/fa'
import styles from '../../styles/products/product-list.module.scss'
import bookkIconFill from 'assets/bookmark-fill.svg'
import bookkIcon from 'assets/bookmark.svg'

export default function ProductList({
  id,
  name,
  releaseTime,
  displayPrice,
  price,
  cover,
  type,
  ratingId,
  fav,
  handleToggleFav,
}) {
  const ratingStyle = (v) => {
    let ratingId = '',
      className = ''
    switch (Number(v)) {
      case 1:
        ratingId = '0'
        className = 'pRating0'
        break
      case 2:
        ratingId = '6'
        className = 'pRating6'
        break
      case 3:
        ratingId = '12'
        className = 'pRating12'
        break
      case 4:
        ratingId = '18'
        className = 'pRating18'
        break
    }
    return { ratingId, className }
  }
  const rs = ratingStyle(ratingId)

  const typeChange = (v) => {
    let type = ''
    switch (Number(v)) {
      case 1:
        type = 'RPG'
        break
      case 2:
        type = 'AVG'
        break
      case 3:
        type = 'ETC'
        break
      case 4:
        type = 'ACT'
        break
      case 5:
        type = 'SLG'
        break
      case 6:
        type = 'RAC'
        break
      case 7:
        type = 'SPG'
        break
      case 8:
        type = 'STG'
        break
      case 9:
        type = 'FTG'
        break
    }
    return type
  }

  // const HeartIcon = fav === '0' ? FaRegHeart : FaHeart
  return (
    <>
      <div className={styles.card}>
        <div className="d-flex justify-content-center pt-2">
          <Image
            src={`/images/product/cover/${cover}`}
            alt={cover}
            width={150}
            height={244}
            // priority={true}
            className="px-2 pb-3 pt-1"
            layout="fixed"
          />
        </div>

        <div className="card-body p-3 pt-0">
          <div className="d-flex justify-content-between">
            <div className="pb-0 p-2 pt-1 border border-danger border-bottom-0 rounded-end-3 rounded-bottom-0">
              <p className="text-danger">
                <b>{typeChange(type)}</b>
              </p>{' '}
            </div>
            <div>
              <Image src={fav ? bookkIconFill : bookkIcon} alt="" onClick={()=>{handleToggleFav(id)}}/>
            
              <FaCartPlus
                className={`text-light ${styles.Chover}`}
                onClick={() => {}}
              />
            </div>
          </div>

          <h6
            className={`card-text mt-2 mb-1 text-white ${styles.textEllipsis}`}
          >
            {name}
          </h6>
          <p className="text-white">member_id</p>
          <p className="text-white">發行日期 {releaseTime}</p>
          <div className="price d-flex justify-content-between mt-1 align-items-center">
            <h6>
              <b className="text-danger">NT ${price}</b>{' '}
            </h6>
            <p className="text-white-50 text-decoration-line-through">
              NT ${displayPrice}
            </p>
            <div className={styles[`${rs.className}`]}>{rs.ratingId}⁺</div>
          </div>
        </div>
      </div>
    </>
  )
}
