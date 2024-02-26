import React from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import Image from 'next/image'
import styles from '@/styles/coupon/coupon.module.scss'

//coupon card
import CouponCard from '@/components/coupon-card/coupon-card'

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
import missionBG from '@/public/images/coupon/galaxy-night-panorama.png'

export default function CouponPage() {
  return (
    <>
      <Navbar />
      <section
        className={`${styles.wrapper} d-flex justify-content-center align-items-center container-field flex-column`}
      >
        <div className={`${styles.banner} position-relative container-field`}>
          <Image src={banner} alt="ysl coupon" />

          <div className={styles.bannerSubs}>
            <div className={styles.bannerSub1}>
              <Image src={bannerSub1}  />
            </div>

            <div className={styles.bannerSub2}>
              <Image src={bannerSub2}  />
            </div>
            
            <div className={styles.bannerSub3}>
             <Image src={bannerSub3} />
             </div>
          </div>

          {/* <div
            className={`${styles.bannerTitle} position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center container-field`}
          >
            <Image src={bannerTitle} />
          </div> */}
          
          

          {/*         
          <div className={`${styles.bannerSub} position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center`}>
            <Image src={bannerSub1}/>
          </div>

          <div className={`${styles.bannerSub} position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center`}>
            <Image src={bannerSub2}/>
          </div>

          <div className={`${styles.bannerSub} position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center`}>
            <Image src={bannerSub3}/>
          </div>
     */}

          {/* <div className={`${styles.bannerCTA} position-absolute top-100 start-50 d-flex justify-content-center align-items-center `}>
            <Image src={bannerCTA}/>
          </div> */}

          {/* <div className={`${styles.bannerCTA} position-absolute top-30 start-50 translate-middle d-flex justify-content-center align-items-center`}>
            <Image src={bannerCTA}/>
          </div> */}
        </div>

        {/* <div className="d-flex justify-content-center align-items-center ">
             <h1 className={`text-white  ${styles.title}`}>優惠神券</h1> 
          </div> */}

        {/* <div className="d-flex justify-content-center align-items-center ">
            <h1 className={`text-white  ${styles.title_action}`}>免</h1>

            <h1 className={`text-white  ${styles.title_action}`}>費</h1>

            <h1 className={`text-white  ${styles.title_action}`}>領</h1>
          </div>  */}

        {/* <div className="d-flex justify-content-end align-items-end ">
          <button className={`btn btn-light  ${styles.title_CTAbtn}`}>
              <h3 className={styles.title_CTA}>加入會員</h3>
          </button>
        </div>  */}

        {/* <h1 className={`text-white d-flex flex-column flex-shrink-0 p-3 ${styles.title}`}>優惠神券</h1> */}
      </section>

      <section className={styles.couponMember}>
        <div className="">
          <div className="">
            <div className={`${styles.console} container-fluid`}>
              <Image src={console} />

                {/* <div className={`${styles.consoleTitle}`}>
                  <Image src={consoleTitle} /> 
                </div>
                <div className={`${styles.consoleSub} `}>
              <Image src={consoleSub} />
                </div> */}
               
            </div>

            <div className='d-flex justify-content-center'>
              <button className={`btn btn-primary ${styles.btnCTA}`}>
                趕緊加入會員
              </button>
            </div>

            <div>
              {/* <CouponCard/> */}
            </div>

          </div>
        </div>

        {/* </div> */}

        {/* <div className={styles.title1}>dddd</div> */}
      </section>

 
      
     

      <section className='text-white'>
        <div className={styles.missionBG + 'container-fluid'}>
          {/* <Image src={missionBG}/> */}
        </div>
      </section>
      <Footer />
    </>
  )
}
