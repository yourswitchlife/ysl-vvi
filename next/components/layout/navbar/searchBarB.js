import React from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from '@/components/layout/navbar/navbar.module.scss'

export default function SearchBarB() {
  return (
    <>
      <div className={styles.displayB}>
        <button type="button" className={`${styles.buttonB}`}>
          <FaSearch className={styles.icon} />
        </button>
        <input
          text="search"
          placeholder="搜尋所有商品..."
          className={styles.searchB}
        />
      </div>
    </>
  )
}
