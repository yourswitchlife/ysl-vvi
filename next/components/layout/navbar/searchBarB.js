import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from '@/components/layout/navbar/navbar.module.scss'

export default function SearchBarB() {
  const [searchText, setSearchText] = useState('')
  return (
    <>
      <div className={styles.displayB}>
        <button type="button" className={`${styles.buttonB}`}>
          <FaSearch className={styles.icon} />
        </button>
        <input
          text="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          placeholder="搜尋所有商品..."
          className={styles.searchB}
        />
      </div>
    </>
  )
}
