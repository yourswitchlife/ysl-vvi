import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaSearch } from 'react-icons/fa'
import styles from '@/components/seller/seller.module.scss'

export default function SearchbarB() {
  //控制搜尋的東西
  const [searchText, setSearchText] = useState('')
  return (
    <>
      <InputGroup className={`mb-3 ${styles.searchbarB}`}>
        <Button
          variant="outline-secondary"
          id="go-search"
          className={styles.btnSearch}
        >
          <FaSearch />
        </Button>
        <Form.Control
          type='text'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
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
