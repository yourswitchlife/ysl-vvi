import Image from 'next/image';
import Link from 'next/link'
import Style from '@/styles/member/sidebar.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'

import {FaHome, FaUser, FaBell, FaGamepad, FaListAlt, FaHeart } from 'react-icons/fa';
import { SiLevelsdotfyi } from 'react-icons/si';
import { RiCoupon3Fill } from 'react-icons/ri';

import Pic from '@/components/member/pic'
import brutal from '@/public/images/member/brutal.png';
import cracked from '@/public/images/member/cracked.png';
import elf from '@/public/images/member/elf.png';
import warlord from '@/public/images/member/warlord.png';

export default function SideBar() {
  return (
    <>
        <div className={Style.bar}>
          <div className="d-flex justify-content-center mb-4">
            <Pic />
            <div className="d-flex flex-column px-3">
              <h6 className={mStyle.h6}>member.name</h6>
              <div className={Style.frame}>
                <div className={Style.level_frame}>
                  {/* 條件判斷式 */}
                  <Image className={Style.level} src={cracked} alt="level_img" />
                </div>
                <h6 className={Style.level_text}>新手</h6>
              </div>
            </div>
          </div>
          
          <div className={Style.line}></div>
          <div className={Style.member_link}><Link href='/member/account' className={Style.member_link}><FaUser className="me-3" />我的帳戶</Link></div>
          <div className={Style.member_link}><Link href='/member/notify-order' className={Style.member_link}><FaBell className="me-3" />通知中心</Link></div>
          <div className={Style.member_link}><Link href='/member/points' className={Style.member_link}><SiLevelsdotfyi className="me-3" />會員積分</Link></div>
          <div className={Style.member_link}><Link href='' className={Style.member_link}><FaGamepad className="me-3" />我的任務</Link></div>
          <div className={Style.member_link}><Link href='/member/order' className={Style.member_link}><FaListAlt className="me-3" />我的訂單</Link></div>
          <div className={Style.member_link}><Link href='/member/fav-product' className={Style.member_link}><FaHeart className="me-3" />我的收藏</Link></div>
          <div className={Style.member_link}><Link href='/member/coupon-product' className={Style.member_link}><RiCoupon3Fill className="me-3" />我的優惠</Link></div>
          <div className='mt-3'></div>

          <div className={Style.line}></div>
          <div className={Style.member_link}><Link href='' className={Style.member_link+" text-danger"}><FaHome className="me-3" />賣家中心</Link></div>
        </div>
    </>
  )
}
