import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaCalendarAlt } from 'react-icons/fa'
import styles from '@/components/seller/seller.module.scss'

export default function DateSelect() {
  return (
    <>
      <InputGroup className={`mb-0 ${styles.dateSelect}`}>
        {/* <Button
          variant="outline-secondary"
          id="dateSelect"
          className={styles.btnDate}
        >
          <FaCalendarAlt />
        </Button> */}
        <Form.Control
          type="date"
          aria-label="dateSelect"
          aria-describedby="dateSelect"
          className={styles.dateInput}
        />
      </InputGroup>
    </>
  )
}
