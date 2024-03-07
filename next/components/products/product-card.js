import React, { useState } from 'react'
import Image from 'next/image'
import { FaCartPlus } from 'react-icons/fa'
import styles from '../../styles/products/product-card.module.scss'
import heartFill from 'assets/heart-fill.svg'
import heratIcon from 'assets/heart-white.svg'
import { FaShop } from 'react-icons/fa6'

// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function ProductCard({
  id,
  name,
  releaseTime,
  display_price,
  price,
  product_quanty,
  img_cover,
  type,
  ratingId,
  member_id,
  fav,
  handleToggleFav,
  language,
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

  const memberIdChange = (v) => {
    let memberId = ''
    switch (Number(v)) {
      case 1:
        memberId = '玩具熊的小窩'
        break
      case 2:
        memberId = '煞氣欸路易吉'
        break
      case 3:
        memberId = '碧姬公主的玩具城堡'
        break
      case 4:
        memberId = '栗寶寶好物站'
        break
      case 5:
        memberId = '庫巴很酷吧'
        break
      case 6:
        memberId = '紅色死神的遊戲收藏'
        break
    }
    return memberId
  }

  const { addItem, notifySuccess } = useCart()


  // const HeartIcon = fav === '0' ? FaRegHeart : FaHeart
  return (
    <>
      <div className={styles.card}>
        <div className="d-flex justify-content-center pt-2">
          <Image
            src={`/images/product/cover/${img_cover}`}
            alt={img_cover}
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
              <Image
                src={fav ? heartFill : heratIcon}
                className="me-2"
                alt=""
                onClick={() => {
                  handleToggleFav(id)
                }}
              />
              {/* 加入購物車 */}
              <FaCartPlus
                className={`text-light h5 ${styles.Chover}`}
                onClick={() => {
                  addItem({
                    name,
                    releaseTime,
                    display_price,
                    price,
                    img_cover,
                    type,
                    id,
                    member_id,
                    fav,
                    product_quanty,
                    language,
                    quantity: 1,
                  })
                  notifySuccess() 
                }}
              />
            </div>
          </div>

          <h6
            className={`card-text mt-2 mb-1 text-white ${styles.textEllipsis}`}
          >
            {name}
          </h6>
          <p className="text-light"><FaShop className="me-1 mb-1" />{memberIdChange(member_id)}</p>
          <p className="text-white">發行日期 {releaseTime}</p>
          <div className="price d-flex justify-content-between mt-1 align-items-center">
            <h6>
              <b className="text-danger">NT ${price}</b>{' '}
            </h6>
            <p className="text-white-50 text-decoration-line-through">
              NT ${display_price}
            </p>
            <div className={styles[`${rs.className}`]}>{rs.ratingId}⁺</div>
          </div>
        </div>
      </div>
    </>
  )
}
