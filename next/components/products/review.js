import React from 'react'
import RatingStars from './rating-stars'

export default function Review() {
  return (
    <>
      <RatingStars />
      <div class="input-group mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="請留下您的評價... 限50字"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        ></input>
        <button
          className="btn rounded-end-2 btn-info"
          type="button "
          id="button-addon2"
        >
          發布
        </button>
      </div>
    </>
  )
}
