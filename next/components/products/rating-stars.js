import React, { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa6'

export default function RatingStars({ fieldChange = () => { } }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  return (
    <>
      <div className="d-flex">
        {Array(5)
          .fill(1)
          .map((v, i) => {
            const score = i + 1
            return (
              <div
                key={i}
                name="rating"
                style={{ marginRight: 4, color: '#FFE03C' }}
                type="button"
                onMouseLeave={() => {
                  setHoverRating(0)
                }}
                onMouseEnter={() => {
                  setHoverRating(score)
                }}
                onClick={() => {
                  setRating(score)
                  // 把姪傳給付元件的function
                  fieldChange({ target: { name: 'rating', value: score } })
                }}
              >
                {score <= rating || score <= hoverRating ? (
                  <FaStar />
                ) : (
                  <FaRegStar />
                )}
              </div>
            )
          })}
      </div>
    </>
  )
}
