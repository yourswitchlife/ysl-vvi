import { useState } from 'react'
// 導入.module.css檔案
import styles from '@/components/shop/star.module.scss'

export default function Star() {
  const [score, setScore] = useState(0)

  return (
    <>
      <div>
        {Array(5)
          .fill(1)
          .map((v, i) => {
            const num = i + 1

            return (
              <button
                key={i}
                className={styles.starBtn}
                onClick={() => {
                  setScore(num)
                }}
              >
                <span className={`{num <= score ? ${styles.on} : ${styles.off}}`}>
                  &#9733;
                </span>
              </button>
            )
          })}
      </div>
    </>
  )
}
