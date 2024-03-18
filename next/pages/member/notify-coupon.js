import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import mStyle from '@/styles/member/g-valuable.module.scss'
import oStyles from '@/styles/member/order.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import fsStyle from '@/styles/member/fav-s.module.scss'
import { IoNotificationsCircle } from "react-icons/io5";
import { RiCoupon3Fill } from "react-icons/ri";


import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'
//Auth
import { useAuth } from '@/hooks/use-Auth';
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
//websocket
import { io } from 'socket.io-client';
import { includes } from 'lodash';

export default function notifyCoupon() {
  const router = useRouter();
  const { isLoggedIn, memberId } = useAuth();
  const [notifyC, setNotifyC] = useState([]);
  // 頁數
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchNotify = async () => {
        try {
          const response = await fetch(`http://localhost:3005/api/member/notify-coupon?memberId=${memberId}&page=${page}&limit=${limit}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json()
          setNotifyC(data.items)
          setTotalPages(data.totalPages);
          // console.log(data.items)
          router.push(`/member/notify-coupon?page=${page}`);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
      fetchNotify()
    }

  }, [isLoggedIn, memberId, page, limit,]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //改已讀
  const markAsRead = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/member/notify-couponRead?memberId=${memberId}`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newData = await response.json();
      setNotifyC(newData.items);
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "已全部已讀！",
        showConfirmButton: false,
        timer: 1300
      });
      // window.location.href = '/member/notify-coupon';
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="m-auto mt-5">
          {/* 白卡 */}
          <div className={mStyle.card + ' container mt-5 mb-5 d-flex flex-column'}>
            <div className={fpStyle.page_check + " pt-4 pb-4 d-flex justify-content-end"} style={{ height: 100 }}>
              <Link href="" className={oStyles.coupon_pages}>
                優惠通知  <IoNotificationsCircle className={mStyle.iconb + ' text-danger mb-1'} />
              </Link>
              <div className='d-flex justify-self-end align-items-center pe-5'>
                {notifyC.some(item => item.valid === 0) && (
                  <Button className={oStyles.cancel_btn} onClick={markAsRead}>全部已讀</Button>
                )}
              </div>
            </div>

            {/* CARD TITLE */}
            <div>
              <Card className={oStyles.nopd_xs + " px-5 d-flex flex-row border-0 bg-secondary fw-bold"}>
                <Card.Body className="d-flex flex-row m-2 justify-content-between align-items-center">
                  <h5 className={oStyles.nopd_xs + " fw-bold text-white ps-5"}>
                    賣場通知
                  </h5>
                  <h5 className="fw-bold text-white">
                    內容
                  </h5>
                  <h5 className="fw-bold text-white pe-3">
                    時間
                  </h5>
                </Card.Body>
              </Card>
              {/* CARD BODY迴圈 */}
              {notifyC.map((noti, index) => (
                <Card key={index} className={oStyles.card_xs + " px-5 container d-flex flex-row"}>
                  <div className='d-flex justify-content-center align-items-center'>
                    <RiCoupon3Fill className={`fs-5 text-info ${noti.coupon_title === '免運費' ? 'text-danger' : ''}`} />
                  </div>

                  <Card.Body className={oStyles.wid_xs + " d-flex flex-row m-3 justify-content-between align-items-center"}>
                    <h5 className={`${oStyles.coupon_text} mx-3 fw-bold`} style={{ width: 250, color: noti.valid === 0 ? '#0068f0' : '' }}>
                      {noti.coupon_title} 優惠券已送達！
                    </h5>

                    <h5 className={oStyles.h6text_xs + " mx-3 my-3"}>
                      {noti.discount_value === 0 && "已收到全站運費折抵券！"}
                      {noti.discount_value >= 100 && `已收到$${noti.discount_value}商品折抵券！`}
                      {noti.discount_value < 100 && noti.discount_value > 0 && `已收到${noti.discount_value}%商品折價券！`}
                    </h5>

                    <h5 className={oStyles.h6text_xs + " me-2 text-secondary"}>
                      {noti.created_at}
                    </h5>
                  </Card.Body>
                </Card>
              ))}


            </div>
            <Paginage currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}
