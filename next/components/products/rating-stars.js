import React, { useState, useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function RatingStars({ fieldChange = () => {}, name, rating: externalRating }) {
  const [internalRating, setInternalRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // 從父元件接收到值時更新
  useEffect(() => {
    if (externalRating !== undefined) {
      setInternalRating(externalRating);
    }
  }, [externalRating]);

  return (
    <>
      <div className="d-flex">
        {Array(5)
          .fill(1)
          .map((_, i) => {
            const score = i + 1;
            return (
              <div
                key={i}
                name={name}
                style={{ marginRight: 4, color: '#FFE03C' }}
                onMouseLeave={() => setHoverRating(0)}
                onMouseEnter={() => setHoverRating(score)}
                onClick={() => {
                  setInternalRating(score);
                  fieldChange({ target: { name, value: score } });
                }}
              >
                {score <= (hoverRating || internalRating) ? <FaStar /> : <FaRegStar />}
              </div>
            );
          })}
      </div>
    </>
  );
}
