import React, { useState } from 'react'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import pStyle from '@/styles/member/points.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import fsStyle from '@/styles/member/fav-s.module.scss'
import sStyles from '@/styles/member/mseller.module.scss'
import cStyles from '@/styles/member/coupon.module.scss'

import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import PRating from '@/components/products/p-rating'
// import Type from '@/components/products/type'
import { FaRegHeart, FaCartPlus } from 'react-icons/fa'
import whitelog from '@/public/images/logo/logo_White-desktopLogo.svg'
// import styles from '@/styles/products/product-list.module.scss'


import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'

export default function FavProduct() {



  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="container d-flex flex-column  align-items-center pt-5">

          <div className={mStyle.card + ' container d-flex flex-column pb-5 mb-5 align-items-center pt-5'}>
            <div className={fpStyle.page_check + " pt-5"}>
              <Link href="/member/coupon-product" className={fsStyle.pages_btn}>
                商品優惠
              </Link>
              <h3 className={pStyle.gray_text}>|</h3>
              <Link href="/member/coupon-delivery" className={fsStyle.pagep_btn}>
              <span></span>運費優惠
              </Link>
            </div>
            <div className=" container d-flex justify-content-end pt-3 pe-5">

              <Dropdown className="ps-3 pb-2">
                <Dropdown.Toggle
                  variant="secondary"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center text-balck ${sStyles.rankingBtn}`}
                >
                  <h6 className={`mb-0 d-md-block ${sStyles.textColor}`}>
                    依時間排序
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>從新到舊</Dropdown.Item>
                  <Dropdown.Item>從舊到新</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* 迴圈 */}

            <div className={"d-flex flex-wrap"}>

              <div className={cStyles.p_coupon + " d-flex flex-column align-items-center justify-content-evenly"}>
                <div className={cStyles.logo_frame + " align-self-start ms-2"}>
                  <Image className={cStyles.fit} src={whitelog}></Image>
                </div>
                <h5 className="text-white fw-bold">RPG遊戲折價券</h5>
                <h2 className="text-white fw-bold">$ 100</h2>
                <h6 className='text-white align-self-start ps-2'>效期至:
                  2024/04/15 23:59:59</h6>
                <div class={cStyles.coupon_tearaway}></div>
              </div>

              <div className={cStyles.p_coupon + " d-flex flex-column align-items-center justify-content-evenly"}>
                <div className={cStyles.logo_frame + " align-self-start ms-2"}>
                  <Image className={cStyles.fit} src={whitelog}></Image>
                </div>
                <h5 className="text-white fw-bold">RPG遊戲折價券</h5>
                <h2 className="text-white fw-bold">$ 100</h2>
                <h6 className='text-white align-self-start ps-2'>效期至:
                  2024/04/15 23:59:59</h6>
                <div class={cStyles.coupon_tearaway}></div>
              </div>

              



            </div>
            {/* 迴圈 */}
            <div className={"d-flex flex-wrap"}>

<div className={cStyles.p_coupon + " d-flex flex-column align-items-center justify-content-evenly"}>
  <div className={cStyles.logo_frame + " align-self-start ms-2"}>
    <Image className={cStyles.fit} src={whitelog}></Image>
  </div>
  <h5 className="text-white fw-bold">RPG遊戲折價券</h5>
  <h2 className="text-white fw-bold">$ 100</h2>
  <h6 className='text-white align-self-start ps-2'>效期至:
    2024/04/15 23:59:59</h6>
  <div class={cStyles.coupon_tearaway}></div>
</div>

<div className={cStyles.p_coupon + " d-flex flex-column align-items-center justify-content-evenly"}>
  <div className={cStyles.logo_frame + " align-self-start ms-2"}>
    <Image className={cStyles.fit} src={whitelog}></Image>
  </div>
  <h5 className="text-white fw-bold">RPG遊戲折價券</h5>
  <h2 className="text-white fw-bold">$ 100</h2>
  <h6 className='text-white align-self-start ps-2'>效期至:
    2024/04/15 23:59:59</h6>
  <div class={cStyles.coupon_tearaway}></div>
</div>





</div>
<div className={"d-flex flex-wrap"}>

              <div className={cStyles.p_coupon + " d-flex flex-column align-items-center justify-content-evenly"}>
                <div className={cStyles.logo_frame + " align-self-start ms-2"}>
                  <Image className={cStyles.fit} src={whitelog}></Image>
                </div>
                <h5 className="text-white fw-bold">RPG遊戲折價券</h5>
                <h2 className="text-white fw-bold">$ 100</h2>
                <h6 className='text-white align-self-start ps-2'>效期至:
                  2024/04/15 23:59:59</h6>
                <div class={cStyles.coupon_tearaway}></div>
              </div>

              <div className={cStyles.p_coupon + " d-flex flex-column align-items-center justify-content-evenly"}>
                <div className={cStyles.logo_frame + " align-self-start ms-2"}>
                  <Image className={cStyles.fit} src={whitelog}></Image>
                </div>
                <h5 className="text-white fw-bold">RPG遊戲折價券</h5>
                <h2 className="text-white fw-bold">$ 100</h2>
                <h6 className='text-white align-self-start ps-2'>效期至:
                  2024/04/15 23:59:59</h6>
                <div class={cStyles.coupon_tearaway}></div>
              </div>

              



            </div>
            

            <Paginage className={mStyle.paginag} />
          </div>

        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>

    </>
  )
}
