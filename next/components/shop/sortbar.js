import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import styles from '@/components/seller/seller.module.scss'


export default function Sortbar() {
  const router = useRouter()
  const {shop_site} = router.query

  const isActive = (pathname) => {
    //你可以根據需要來調整條件，這裡以router.asPath為例
    return router.asPath === pathname
  }

  const handleClick = (e, href) => {
    e.preventDefault()
    router.push(href, undefined, {scroll: false}) //跳轉同時禁止滾動頁面頂部
  }

  useEffect(()=>{
    if(router.isReady){
      const {shop_site} = router.query
    }
  },[router.isReady])
  

  return (
    <>
      <div className={`${styles.sortbarStyle}`}>
        <a href={`/shop/${shop_site}`} onClick={(e) => handleClick(e, `/shop/${shop_site}`)} className={`${styles.sortbar} ${isActive(`/shop/${shop_site}`) ? styles.active : ''}`}>
          <h5 className={`d-none d-md-block ${styles.list}`}>賣場首頁</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>賣場首頁</h6>
        </a>
        <a href={`/shop/${shop_site}/all`} onClick={(e) => handleClick(e, `/shop/${shop_site}/all`)} className={`${styles.sortbar} ${isActive(`/shop/${shop_site}/all`) ? styles.active : ''}`}>
          <h5 className={`d-none d-md-block ${styles.list}`}>所有商品</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>所有商品</h6>
        </a>
        <a href={`/shop/${shop_site}/new`} onClick={(e) => handleClick(e, `/shop/${shop_site}/new`)} className={`${styles.sortbar} ${isActive(`/shop/${shop_site}/new`) ? styles.active : ''}`}>
          <h5 className={`d-none d-md-block ${styles.list}`}>最新上架</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>最新上架</h6>
        </a>
        <a href={`/shop/${shop_site}/sale`} onClick={(e) => handleClick(e, `/shop/${shop_site}/sale`)} className={`${styles.sortbar} ${isActive(`/shop/${shop_site}/sale`) ? styles.active : ''}`}>
          <h5 className={`d-none d-md-block ${styles.list}`}>期間優惠</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>期間優惠</h6>
        </a>
        <a href={`/shop/${shop_site}/hit`} onClick={(e) => handleClick(e, `/shop/${shop_site}/hit`)} className={`${styles.sortbar} ${isActive(`/shop/${shop_site}/hit`) ? styles.active : ''}`}>
          <h5 className={`d-none d-md-block ${styles.list}`}>熱銷排行</h5>
          <h6 className={`d-block d-md-none ${styles.list}`}>熱銷排行</h6>
        </a>
      </div>
    </>
  )
}
