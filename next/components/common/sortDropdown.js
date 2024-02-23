import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '@/components/seller/seller.module.scss'

export default function SortDropdown() {
  return (
    <>
      <Dropdown>
      <Dropdown.Toggle 
        variant="success" 
        id="dropdown-basic"
        type="button"
        className={`btn d-flex justify-content-center align-items-center ${styles.offcanvasBtn}`}
       >
        <h6 className="mb-0 d-none d-md-block">排序</h6>
        <p className="mb-0 d-block d-md-none">排序</p>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">價格由低到高</Dropdown.Item>
        <Dropdown.Item href="#/action-2">價格由高到低</Dropdown.Item>
        <Dropdown.Item href="#/action-3">發行時間由近到遠</Dropdown.Item>
        <Dropdown.Item href="#/action-4">發行時間由遠到近</Dropdown.Item>
        <Dropdown.Item href="#/action-5">收藏數量由低到高</Dropdown.Item>
        <Dropdown.Item href="#/action-6">收藏數量由高到低</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}
