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
    router.push('/seller/shop');
    }
  };



  return (
    <>
      <div className={Style.bar}>
        <div className="d-flex justify-content-center mb-4">
          <BigPic />
        </div>

        <div className={Style.line}></div>
        <div className={Style.member_link}><Link href='/member/account' className={Style.member_link}><FaUser className="me-3" />我的帳戶</Link></div>
        <div className={Style.member_link}><Link href='/member/notify-coupon' className={Style.member_link}><FaBell className="me-3" />通知中心</Link></div>
        <div className={Style.member_link}><Link href='/member/points' className={Style.member_link}><SiLevelsdotfyi className="me-3" />會員積分</Link></div>
        <div className={Style.member_link}><Link href='' className={Style.member_link}><FaGamepad className="me-3" />我的任務</Link></div>
        <div className={Style.member_link}><Link href='/member/order' className={Style.member_link}><FaListAlt className="me-3" />我的訂單</Link></div>
        <div className={Style.member_link}><Link href='/member/fav-product' className={Style.member_link}><FaHeart className="me-3" />我的收藏</Link></div>
        <div className={Style.member_link}><Link href='/member/coupon-product' className={Style.member_link}><RiCoupon3Fill className="me-3" />我的優惠</Link></div>
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
