import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaSearch } from 'react-icons/fa'
import styles from '@/components/seller/seller.module.scss'

export default function SearchbarB({ onSearch = () => {}}) {
  //控制搜尋的東西
  const [searchQuery, setSearchQuery] = useState('')

  // //處理搜尋按鈕的點擊事件
  const handleSearch = () => {
    // e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <>
      <InputGroup className={`mb-3 ${styles.searchbarB}`}>
        <Button
          variant="outline-secondary"
          id="go-search"
          className={styles.btnSearch}
          onClick={handleSearch} //增加點擊事件處理函式
        >
          <FaSearch />
        </Button>
        <Form.Control
          type='text'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          aria-label="search-input"
          aria-describedby="go-search"
          className={styles.searchInput}
          placeholder="搜尋此賣場商品..."
        />
      </InputGroup>
    </>
  )
}
