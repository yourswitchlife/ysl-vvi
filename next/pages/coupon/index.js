import React from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import Image from 'next/image'
import styles from '@/styles/coupon/coupon.module.scss'

//components
import CouponCard from '@/components/coupon-card/coupon-card'
import GoTopButton from '@/components/go-to-top/go-top-button'
import CouponTest from '@/components/coupon-card/coupon-test'
// import GoGo from '@/components/go-to-top/go-button'

//pictures
import banner from '@/public/images/coupon/tryout.png'
// import bannerTitle from '@/public/images/coupon/banner-title.png'
import bannerCTA from '@/public/images/coupon/bannerCTA.png'
import bannerSub1 from '@/public/images/coupon/banner-sub11.png'
import bannerSub2 from '@/public/images/coupon/banner-sub22.png'
import bannerSub3 from '@/public/images/coupon/banner-sub33.png'
import console from '@/public/images/coupon/sectionTwo.png'
// import consoleTitle from '@/public/images/coupon/section2-headline.png'
// import consoleSub from '@/public/images/coupon/section2-headline&Des.png'
import sellerCTA from '@/public/images/coupon/CTA-seller.png'
import missionBG from '@/public/images/coupon/galaxy-night-panorama.png'
import finalPic from '@/public/images/coupon/CTA-text&pics.png'


export default function CouponPage() {
  return (
    <>
      <Navbar />
      <section
        className={`${styles.wrapper} d-flex justify-content-center align-items-center container-field flex-column pt-5`}
      >
        <div className={`${styles.banner} position-relative container-fluid`}>
          <Image src={banner} alt="ysl coupon" />

          <div
            className={`d-flex justify-content-center align-items-center ${styles.titles}`}
          >
            <h1 className={`text-white  ${styles.title_action}`}>免</h1>

            <h1 className={`text-white  ${styles.title_action}`}>費</h1>

            <h1 className={`text-white  ${styles.title_action}`}>領</h1>
          </div>

          <div className=" ">
            <button className={`btn btn-light  ${styles.title_CTAbtn}`}>
              <h3 className={styles.title_CTA}>加入會員</h3>
            </button>
          </div>
        </div>


      </section>

      <section className={styles.couponMember}>
        <div className={`${styles.console} container-fluid position-relative`}>
          <Image src={console} alt="Be YSL member!" />

          {/* <div className='d-flex justify-content-center mb-5 '> */}
          <button
            className={`btn btn-lg btn-primary position-absolute ${styles.btnCTA}`}
          >
            趕緊加入會員
          </button>

          
          {/* </div> */}
        </div>

        <div>
          <CouponTest />
        </div>

        {/* </div> */}

      </section>

      {/* <div className='d-flex justify-content-center container-fluid  w-25 mt-3 mb-3'>
          <Image src={sellerCTA}/>
          <h3 className=''>賣家募集中！</h3>
      </div> */}

      <section className="text-white">
        <div className={`${styles.missionBG} `}>
          {/* <Image src={missionBG} alt='mission'/> */}

          {/* <div className='d-flex justify-content-end align-items-center me-3 mt-3'> */}
          <div className="d-flex flex-column justify-content-center align-items-center pt-5">
            <h4 className={`${styles.missionHeader} ms-5 pt-5`}>
              加入會員，解會員任務，送優惠券
            </h4>

            <h6 className={`${styles.missionDes} pt-4 mt-3 ms-5`}>
              只要收藏商品、收藏賣家、把商品加入購物車，以及結帳就能獲得數張優惠券唷，還不來YSL新手村解任務！
            </h6>

            <div className="pt-4 mt-3 ms-5">
              <button className={`${styles.missionBTN} btn btn-lg btn-danger`}>
                立即解任務
              </button>
            </div>
          </div>
          {/* <div className={styles.finalPic}>
            <Image src={finalPic} />
          </div> */}
          {/* </div> */}
        </div>
      </section>

      <GoTopButton/>
      {/* <GoGo/> */}
      <Footer />
    </>
  )
}
