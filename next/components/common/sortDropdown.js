import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '@/components/seller/seller.module.scss'

export default function SortDropdown({handleSort = () => {}}) {
  const router = useRouter()

  useEffect(()=>{
    if(router.isReady){
      const {shop_site} = router.query
    }
  },[router.isReady])

  const handleSortChange = async (sortKey) => {
    const {shop_site} = router.query
    try{
      const res = await fetch(`http://localhost:3005/api/shop/${shop_site}/products?sort=${sortKey}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!res.ok){
        throw new Error('網路回應不ok')
      }
      const data = await res.json()
      // console.log(data.shopProducts)
      handleSort(data.shopProducts)
    }catch(error){
      console.error('Error:', error)
    }
  }

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
        <Dropdown.Item onClick={() => handleSortChange('price_asc')}>價格由低到高</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('price_desc')}>價格由高到低</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('release_time_desc')}>發行時間由近到遠</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('release_time_asc')}>發行時間由遠到近</Dropdown.Item>
        {/* <Dropdown.Item href="#/action-5">收藏數量由低到高</Dropdown.Item>
        <Dropdown.Item href="#/action-6">收藏數量由高到低</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}
