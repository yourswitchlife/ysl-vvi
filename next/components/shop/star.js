import { useState, useEffect } from 'react'
// 導入`.module.css`檔案
import styles from './star.module.scss'
import { FaStar } from 'react-icons/fa'
export default function Star({avgRating = 0}) {
  // 滑鼠點按時的評分，一開始是0代表沒有評分
  const [rating, setRating] = useState(0)

  useEffect(()=>{
    setRating(avgRating)
  }, [avgRating])

  return (
    <>
      <div className='d-flex align-items-center justify-content-center'>
        {/* 產生5個成員都是1的陣列，表達式語法 */}
        {Array(5)
          .fill(1)
          .map((v, i) => {
            // 每個星星的分數，剛好是索引值+1
            const score = i + 1

            return (
              <div
                key={i}
                className='mb-1'
              >
                <FaStar // 判斷分數(score)如果小於等於目前的評分(rating)狀態，
                  // 或小於等於目前的懸停評分(hoverRating)狀態，則套用亮起樣式
                  className={
                    score <= rating
                      ? styles['on']
                      : styles['off']
                  }
                />
              </div>
            )
          })}
      </div>
    </>
  )
}
