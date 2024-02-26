import React from 'react'
import Buyer from './buyer'
import Image from 'next/image'
import RatingStars from './rating-stars'

export default function Reviewed() {
  return (
    <>
      <Buyer></Buyer>
      <div className="d-flex justify-content-between">
        <div>
          <RatingStars />
          <div className="tages mb-2 mt-2">
            <span class="badge rounded-pill text-bg-primary p">運送快速</span>
            <span class="badge rounded-pill text-bg-primary ms-2 me-2 p">
              服務貼心
            </span>
            <span class="badge rounded-pill text-bg-primary p">符合期望</span>
          </div>
          <h6 className="text-white">實在太好玩啦！終於入手這片了</h6>
        </div>
        <div className="reviewImg">
          <Image
            src="https://pic4.zhimg.com/80/v2-17a11c7d69259e2ce2ce0567b4836e07_1440w.webp"
            className="img-fluid"
            alt="開箱照"
            width={120}
            height={50}
          />
          <Image
            src="https://pic4.zhimg.com/80/v2-17a11c7d69259e2ce2ce0567b4836e07_1440w.webp"
            className="img-fluid ms-3"
            alt="開箱照"
            width={120}
            height={50}
          />
        </div>
      </div>
      <hr className="text-white mb-3 mt-3" />
    </>
  )
}
