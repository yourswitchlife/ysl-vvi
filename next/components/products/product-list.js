import React, { useState } from 'react'
import Image from 'next/image'
import PRating from '@/components/products/p-rating'
import { FaRegHeart, FaHeart, FaCartPlus } from 'react-icons/fa'
import styles from '../../styles/products/product-list.module.scss'

export default function ProductList({
  name,
  releaseTime,
  displayPrice,
  price,
  cover,
  type,
}) {
  const GameTypeSwitcher = () => {
    const [gameType, setGameType] = useState('')
    const GameTypeChange = (v) => {
      let type = ''
      switch (v) {
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
    }
    setGameType(type)
  }

  return (
    <>
      <div className={styles.card}>
        <div className="d-flex justify-content-center pt-2">
          <Image
            src={`/images/product/cover/${cover}`}
            alt="product"
            width={150}
            height={244}
            // priority={true}
            className="px-2 pb-3 pt-1"
            layout="fixed"
            // fetchPriority="width"
          />
        </div>

        <div className="card-body p-3 pt-0">
          <div className="d-flex justify-content-between">
            <div className="pb-0 p-2 pt-1 border border-danger border-bottom-0 rounded-end-3 rounded-bottom-0">
              <p className="text-danger">
                <b>{type}</b>
              </p>{' '}
            </div>
            <div>
              <FaRegHeart className={`me-2 text-light ${styles.Hhover}`} />
              <FaHeart className={styles.HFillhover} />
            </div>
            <div>
              <FaCartPlus className="text-light" />
            </div>
          </div>

          <h6
            className={`card-text mt-2 mb-1 text-white ${styles.textEllipsis}`}
          >
            {name}
          </h6>
          <p className="text-white">member_id</p>
          <p className="text-white">發行日期 {releaseTime}</p>
          <div class="price d-flex justify-content-between mt-1">
            <h6>
              <b className="text-danger">NT ${price}</b>{' '}
            </h6>
            <p className="text-white-50 text-decoration-line-through">
              NT ${displayPrice}
            </p>
            <PRating></PRating>
          </div>
        </div>
      </div>
    </>
  )
}
