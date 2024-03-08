import React from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import Image from 'next/image'
import styles from '@/styles/coupon/coupon.module.scss'

//components
import GoTopButton from '@/components/go-to-top/go-top-button'
import CouponUni from '@/components/coupon/coupon-uni'

//pictures
import banner from '@/public/images/coupon/tryout.png'

import titleA from '@/public/images/coupon/title1.png'
import titleB from '@/public/images/coupon/title2.png'
import titleC from '@/public/images/coupon/title3.png'

import titleAm from '@/public/images/coupon/titleAm.png'
import titleBm from '@/public/images/coupon/titleBm.png'
import titleCm from '@/public/images/coupon/titleCm.png'

import player from '@/public/images/coupon/sectionTwo.png'


export default function CouponPage() {
  return (
    <>
      <Navbar />
      <section className={`${styles.wrapper}  container-field`}>
        <div className={`${styles.banner} position-relative`}>
          <Image src={banner} alt="ysl coupon" className={styles.main_img} />
          <div className={styles.title_action}>
            <div className={styles.title_frame}>
              <div>
                <Image src={titleA} alt="免" className={styles.img} />
              </div>

              <div>
                <Image src={titleB} alt="費" className={styles.img} />
              </div>

              <div>
                <Image src={titleC} alt="領" className={styles.img} />
              </div>
            </div>
            <div className={styles.title_frame_mobile}>
              <div>
                <Image src={titleAm} alt="免" className={styles.img} />
              </div>

              <div>
                <Image src={titleBm} alt="費" className={styles.img} />
              </div>

              <div>
                <Image src={titleCm} alt="領" className={styles.img} />
              </div>
            </div>
          </div>

          {/* 加入會員按鈕區塊 */}
          <div className={styles.addMember_btn}>
            <div className={styles.btn_frame}>
              <button className={`btn btn-light ${styles.title_CTA}`}>
                加入會員
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.get_coupon_bg_frame}>
        <div className={`${styles.get_coupon_bg} container`}>
          <Image
            src={player}
            width={1124}
            height={462}
            layout="responsive"
            alt="加入會員"
          />
          <button className={`btn btn-info ${styles.btn}`}>趕緊加入會員</button>
        </div>

        <div>
          <CouponUni/>
          {/* <CouponCard/> */}
        </div>
      </section>

      <section className="text-white mt-3">
        <div className={`${styles.missionBG} `}>
          <div className="d-flex flex-column justify-content-center align-items-center pt-3">
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

      <GoTopButton />
      {/* <GoGo/> */}
      <Footer />
    </>
  )
}
