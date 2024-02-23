import React from 'react'
import Image from 'next/image'
import PRating from '@/components/products/p-rating'
import Type from '@/components/products/type'
import { FaRegHeart, FaCartPlus } from 'react-icons/fa'
import styles from '../../styles/products/product-list.module.scss'
import pImgs from '@/public/images/product/HOPSTEPDANCE.jpg'

export default function ProductList() {
  return (
    <>
      <div className={styles.card}>
        <div className="d-flex justify-content-center">
          <Image
            src={pImgs}
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
            <Type></Type>
            <div>
              <FaRegHeart className="me-2 text-light" />
              <FaCartPlus className="text-light" />
            </div>
          </div>

          <h6 className="card-text mt-2 mb-1 text-white">舞力全開！</h6>
          <p className="text-white">玩具熊的小窩</p>
          <p className="text-white">發行日期 2023.11.17</p>
          <div class="price d-flex justify-content-between mt-1">
            <h6>
              <b className="text-danger">NT$1490</b>{' '}
            </h6>
            <p className="text-white-50 text-decoration-line-through">
              NT$2490
            </p>
            <PRating></PRating>
          </div>
        </div>
      </div>
    </>
  )
}
