import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaSearch } from 'react-icons/fa'
import styles from '@/components/seller/seller.module.scss'

export default function SearchbarB() {
  return (
    <>
      <InputGroup className={`mb-3 ${styles.searchbarB}`}>
        <Button
          variant="outline-secondary"
          id="button-addon1"
          className={styles.btnSearch}
        >
          <FaSearch />
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          className={styles.searchInput}
          placeholder="搜尋此賣場商品..."
        />
      </InputGroup>
    </>
  )
}
