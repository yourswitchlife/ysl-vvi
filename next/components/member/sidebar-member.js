import React from 'react';

import Image from 'next/image';
import Link from 'next/link'
import Style from '@/styles/member/sidebar.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'

import { FaHome, FaUser, FaBell, FaGamepad, FaListAlt, FaHeart } from 'react-icons/fa';
import { SiLevelsdotfyi } from 'react-icons/si';
import { RiCoupon3Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useAuth } from '@/hooks/use-Auth';
import BigPic from '@/components/member/pic-point'
import brutal from '@/public/images/member/brutal.png';
import cracked from '@/public/images/member/cracked.png';
import elf from '@/public/images/member/elf.png';
import warlord from '@/public/images/member/warlord.png';

export default function SideBar() {
  const { memberData } = useAuth();
  const router = useRouter();

  const handleClick = (e) => {
    if (!memberData.address) {
      e.preventDefault();

      Swal.fire({
        title: '您尚未更新個人資料！',
        text: '請先填寫您的個人資料才能進入賣家中心。',
        icon: 'warning',
        confirmButtonText: '好的',
        confirmButtonColor: "#43B0FF"
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/member/account');
        }
      });
    }
    if (memberData.address) {
      router.push('/seller');
    }
  };

  const renderLink = (href, className, icon, text) => {
    const isCurrentPage = router.pathname === href;
    if (isCurrentPage) {
      // 當前頁面
      return (
        <span className={`${className} ${Style.activeLink} text-danger`} style={{ cursor: 'default' }}>
          {React.cloneElement(icon, { className: "me-3 text-danger" })}{text}
        </span>
      );
    } else {
      // 不是當前頁面
      return (
        <div className={Style.member_link}>
          <Link href={href} className={Style.member_link}>
            {React.cloneElement(icon, { className: `me-3` })}
            {text}
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <div className={Style.bar}>
        <div className="d-flex justify-content-center mb-4">
          <BigPic />
        </div>

        <div className={Style.line}></div>

        {renderLink('/member/account', `${Style.member_link}`, <FaUser />, '我的帳戶')}

        {renderLink('/member/notify-coupon', `${Style.member_link}`, <FaBell />, '通知中心')}

        {renderLink('/member/points', `${Style.member_link}`, <SiLevelsdotfyi />, '會員積分')}

        {renderLink('/member/mission-ing', `${Style.member_link}`, <FaGamepad />, '我的任務')}

        {renderLink('/member/order', `${Style.member_link}`, <FaListAlt />, '我的訂單')}

        {renderLink('/member/fav-product', `${Style.member_link}`, <FaHeart />, '我的收藏')}

        {renderLink('/member/coupon-product', `${Style.member_link}`, <RiCoupon3Fill />, '我的優惠')}

        <div className='mt-3'></div>

        <div className={Style.line}></div>
        <div className={Style.member_link}>
          <button className={Style.shop_link} onClick={handleClick}>
            <FaHome className="me-3" />賣家中心
          </button>
        </div>
      </div>
    </>
  )
}