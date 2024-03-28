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

// import PRating from '@/components/products/p-rating'
import { FaRegHeart, FaCartPlus } from 'react-icons/fa'
import whitelog from '@/public/images/logo/logo_White-desktopLogo.svg'
// import styles from '@/styles/products/product-list.module.scss'

import Mission from '@/components/mission/mission-favshop'


import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'

export default function MissionFinished(){
const [status, setStatus] = useState('1')

const handleStatus = (newStatus) =>{
    setStatus(newStatus);
  }


    return (
        <>
            <Navbar />
            <div className={mStyle.bodyClass + ' d-flex'}>
                <SideBar />
                <div className="container d-flex flex-column  align-items-center pt-5">

                    <div className={mStyle.card + ' container d-flex flex-column pb-5 mb-5 align-items-center pt-5'}>
                        <div className={fpStyle.page_check + " pt-5"}>
                            <Link href="/member/mission-ing" className={fsStyle.pagep_btn}
                            onClick = {()=>{handleStatus('0')}}>
                                <span></span>進行中
                            </Link>
                            <h3 className={pStyle.gray_text}>|</h3>
                            <Link href="/member/mission-finished" className={fsStyle.pages_btn}
                            onClick = {()=>{handleStatus('1')}}>
                                完成的
                            </Link>
                        </div>
                        <div className=" container d-flex justify-content-end pt-3 pe-5">

                            {/* <Dropdown className="ps-3 pb-2">
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
                            </Dropdown> */}
                        </div>
                        

                        <Mission status={status}/>


                        {/* <Paginage className={mStyle.paginag} /> */}
                    </div>

                </div>
            </div>
            <div className="d-none d-sm-block">
                <Footer />
            </div>

        </>
    )
}
