import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import mStyle from '@/styles/member/g-valuable.module.scss'
import styles from '@/styles/member/mseller.module.scss'
import oStyles from '@/styles/member/order.module.scss'

import aragami from '@/public/images/member/aragami2.jpg'
import { FaShop } from 'react-icons/fa6'
import profileImg from '@/public/images/profile-photo/default-profile-img.svg'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'
//Auth
import { useAuth } from '@/hooks/use-Auth';
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'

export default function order() {
  const router = useRouter();
  const { isLoggedIn, memberId } = useAuth();
  const [order, setOrder] = useState([]);
  // 排序
  const [orderBy, setOrderBy] = useState('order_date');
  // 頁數
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`http://localhost:3005/api/member/order?memberId=${memberId}&orderBy=${orderBy}&page=${page}&limit=${limit}`, {
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Failed to fetch order');
          }
          const data = await response.json();

          setOrder(data.items);
          setTotalPages(data.totalPages);
          // 成功後導更新後的頁面
          router.push(`/member/order?page=${page}`);

        } catch (error) {
          console.error('回傳收藏商品清單錯誤', error);
        }
      };
      fetchOrder();
    }
  }, [isLoggedIn, memberId, orderBy, page, limit]);

  // 排序
  const handleSortChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    setPage(1);
  };

  // 頁數
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="m-auto mt-5">
          {/* 白卡 */}
          <div
            className={mStyle.card + ' container mt-5 mb-5 d-flex flex-column'}
          >
            <div
              className={
                oStyles.bg_card + ' container d-flex justify-content-end py-3'
              }
            >
              <Dropdown className="p-3">
                <Dropdown.Toggle
                  variant="danger"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center ${styles.statusBtn}`}
                >
                  <h6 className={`mb-0 fw-bold d-md-block ${styles.textColor}`}>
                    依訂單狀態
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>待出貨</Dropdown.Item>
                  <Dropdown.Item>運送中</Dropdown.Item>
                  <Dropdown.Item>已完成</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="m-3">
                <Dropdown.Toggle
                  variant="secondary"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                >
                  <h6 className={`mb-0 fw-bold d-md-block ${styles.textColor}`}>
                    依時間排序
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSortChange('order_date')}>從新到舊</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange('order_date_asc')}>從舊到新</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* CARD TITLE */}
            {/* div這樣是一個賣場的所有商品 */}
            {order.map((od, index) => (
              <div key={index}>
                <Card className={oStyles.order_xs + ' px-5 d-flex flex-row'}>
                  <Card.Body
                    className={
                      oStyles.nopd_xs +
                      ' d-flex flex-row m-2 justify-content-between align-items-center'
                    }
                  >
                    <div
                      className={
                        oStyles.nopdmn_xs +
                        ' me-3 text-info d-flex align-items-center'
                      }
                    >
                      <FaShop className="me-2 fw-bold" />
                      <h5 className={oStyles.shop_name + " text-info fw-bold d-flex flex-wrap"}>{od.seller_shop_name}</h5>
                    </div>
                    <div className='d-flex align-items-center'>
                      {od.shipping_status === 1 ? (
                        <h5 className={oStyles.shop_name + ' px-5 text-danger fw-bold border border-2'}>待出貨</h5>
                      ) : od.shipping_status === 2 ? (
                        <h5 className={oStyles.shop_name + ' px-5 text-warning fw-bold border border-2'}>已出貨</h5>
                      ) : od.shipping_status === 3 ? (
                        <h5 className={oStyles.shop_name + ' p-2 mx-5 text-success fw-bold border border-2'}>已完成</h5>
                      ) : (
                        <h5 className={oStyles.shop_name + ' px-5 text-danger fw-bold border border-2'}>其他狀態</h5>
                      )}
                      <div className={oStyles.flex_c+' d-flex'}>
                        <h6 className='text-secondary'>下單時間：</h6>
                        <h6>{od.order_date}</h6>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                {/* CARD BODY */}
                {JSON.parse(od.productItems).map((product, i) => (
                  <Card
                    className={oStyles.order_xs + ' px-5 container d-flex flex-row'}
                  >

                    <div key={i} className={oStyles.img_frame + ' m-3'}>
                      <Image className={oStyles.img_fit + " d-flex flex-column"} src={`http://localhost:3005/productImg/cover/${product.img_cover}` || profileImg} width={150} height={244} alt={product.img_cover} />
                    </div>
                    <Card.Body
                      className={
                        oStyles.nopdmn_xs +
                        ' d-flex flex-row m-3 justify-content-between '
                      }
                    >

                      <div className="d-flex flex-column justify-content-center">
                        <h5 className={oStyles.h4text_xs + ' mx-3'}>{product.name}
                        </h5>
                        <h5 className={oStyles.h6text_xs + ' mx-3 my-3'}>* {od.quantity}</h5>
                      </div>

                      <h5
                        className={
                          oStyles.h5text_xs +
                          ' mx-2 me-5 mt-4 d-flex justify-content-center'
                        }
                      >
                        $ {product.price}
                      </h5>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ))}
            {/* div這樣是一個賣場的所有商品 */}

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
