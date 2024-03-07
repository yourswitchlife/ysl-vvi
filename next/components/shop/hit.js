import React from 'react'
import styles from '@/components/seller/seller.module.scss'
import ProductCard from '@/components/products/product-card'
export default function Hit({ hit = [], handleToggleFav = () => {}}) {
  // console.log(hit)
  
  return (
    <>
      <div className={styles.hit}>
        <h4 className="mb-5 d-none d-md-block">焦點遊戲熱賣中</h4>
        <h5 className="mb-4 d-block d-md-none">焦點遊戲熱賣中</h5>
        {/* 這邊可以放product-card */}
        <div className={`justify-content-md-around align-items-md-center ${styles.scroller}`}>
        {hit.map((v, i) => {
          <div className={styles.insideScr} key={v.id}>
          <ProductCard
          id={v.id} 
          name={v.name}
          releaseTime={v.release_time}
          displayPrice={v.display_price}
          price={v.price}
          cover={v.img_cover}
          type={v.type_id}
          ratingId={v.rating_id}
          memberId={v.member_id}
          fav={v.fav}
          handleToggleFav={handleToggleFav}
          />
          </div>
        })}
        {/* <div className={styles.insideScr}><ProductCard/></div>
        <div className={styles.insideScr}><ProductCard/></div>
        <div className={styles.insideScr}><ProductCard/></div>
        <div className={styles.insideScr}><ProductCard/></div>
        <div className={styles.insideScr}><ProductCard/></div> */}
        </div>
      </div>
    </>
  )
}
