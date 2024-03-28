import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import profileImg from '@/public/images/profile-photo/peach.png'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import pStyle from '@/styles/member/points.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import fsStyle from '@/styles/member/fav-s.module.scss'
import styles from '@/styles/member/mseller.module.scss'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'
import Paginage from '@/components/common/pagination'
import { FaMinus, FaAngleDown, FaFilter, FaStar } from 'react-icons/fa'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav';
//Auth
import { useAuth } from '@/hooks/use-Auth';
// import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'

export default function FavShop() {
  const router = useRouter();
  const { isLoggedIn, memberId } = useAuth();
  const [favShops, setFavShops] = useState([]);
  // 排序
  const [orderBy, setOrderBy] = useState('created_at');
  // 頁數
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchFavShops = async () => {
        try {
          const response = await fetch(`http://localhost:3005/api/member/fav-shop?memberId=${memberId}&orderBy=${orderBy}&page=${page}&limit=${limit}`, {
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Failed to fetch fav shops');
          }
          const data = await response.json();

          setFavShops(data.items);
          setTotalPages(data.totalPages);
          // 成功後導更新後的頁面
          router.push(`/member/fav-shop?page=${page}`);

        } catch (error) {
          console.error('回傳收藏賣場清單錯誤', error);
        }
      };
      fetchFavShops();
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

  // 取消收藏
  const handleUnfavorite = async (seller_id) => {
    try {
      const response = await fetch(`http://localhost:3005/api/member/unfav-shop?memberId=${memberId}&sellerId=${seller_id}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to unfavorite shop', error);
      }

      const updatedFavShops = favShops.filter(shop => shop.seller_id !== seller_id);
      setFavShops(updatedFavShops);

    } catch (error) {
      console.error('取消收藏錯誤', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div className="container d-flex flex-column  align-items-center pt-5">
          <div
            className={
              mStyle.product_card +
              ' container d-flex flex-column align-items-center pb-5 bg-white mb-5'
            }
          >
            <div className={fpStyle.page_check + ' pt-5'}>
              <Link href="/member/fav-product" className={fsStyle.pagep_btn}>
                <span></span>商品
              </Link>
              <h3 className={pStyle.gray_text}>|</h3>
              <Link href="/member/fav-shop" className={fsStyle.pages_btn}>
                賣場
              </Link>
            </div>
            <div className="container d-flex justify-content-end my-4 pe-5">
              <Dropdown className="me-3">
                <Dropdown.Toggle
                  variant="secondary"
                  id="ranking"
                  type="button"
                  className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                >
                  <h6 className={`mb-0 d-md-block ${styles.textColor}`}>
                    依時間排序
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSortChange('created_at')}>從新到舊</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange('created_at_asc')}>從舊到新</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* 迴圈 */}
            {
              favShops.map((shop, index) => (
                <div
                  key={index}
                  className={
                    styles.seller_frame +
                    ' d-flex justify-content-between align-items-center mb-2'
                  }
                >
                  <div
                    className={
                      styles.seller_xs +
                      ' d-flex mb-4 mt-3 justify-content-between'
                    }
                  >
                    {/* seller detail */}
                    <div className={styles.profile + ' me-5'}>
                      <Link href={`/shop/${shop.shop_site}`} style={{ textDecoration: 'none' }} >
                        <Image width={100} height={100} src={`http://localhost:3005/profile-pic/${shop.pic}` || profileImg} alt={shop.pic} className={styles.fit} />
                      </Link>
                    </div>
                    <div className="d-flex flex-column align-items-between justify-content-center">
                      <div className={styles.seller_xs + " d-flex align-items-center"}>
                        <div
                          className={
                            styles.wid_xs +
                            ' d-flex flex-column justify-content-between align-items-center flex-wrap'
                          }
                        >
                          <h4 className={styles.h4text_xs + ' fw-bold'}>
                            {shop.shop_name}
                          </h4>
                          <h6 className={styles.site_xs}>@{shop.shop_site}</h6>
                        </div>

                        <div
                          className={
                            styles.column + ' d-flex align-items-center ps-5'
                          }
                        >
                          {/* star rating */}

                          {shop.averageRating > 0 ? (
                            <>
                              <h5 className={styles.shop_avg + ' ms-1 me-4'}>{shop.averageRating}</h5>
                              <div className={styles.shop_comment + ' text-warning pe-5'}>
                                {/* 生成對應數量的星星元素 */}
                                {Array.from({ length: Math.round(shop.averageRating) }).map((_, i) => (
                                  <FaStar key={i} className="me-1" />
                                ))}
                              </div>
                            </>
                          ) : (
                            <h5 className={styles.shop_comment + ' ms-2 me-5 pe-5 d-flex justify-content-center'}>*暫無評價</h5>
                          )}
                          <h5 className={styles.h6text_xs}>({shop.totalOrders})</h5>
                        </div>
                      </div>

                      <div
                        className={
                          styles.sellers +
                          ' d-flex justify-content-between align-items-center'
                        }
                      >
                        {/* little dashboard */}
                        <div
                          className={
                            styles.padding_xs +
                            ' d-flex flex-column align-items-center pe-5 ms-4'
                          }
                        >
                          <h5 className={styles.h6text_xs + ' text-secondary'}>
                            商品數量
                          </h5>
                          <h5 className={styles.h6text_xs + ' text-secondary'}>
                            {shop.totalProducts}
                          </h5>
                        </div>
                        <div
                          className={
                            styles.padding_xs +
                            ' d-flex flex-column align-items-center pe-5'
                          }
                        >
                          <h5 className={styles.h6text_xs + ' text-secondary'}>
                            已賣出件數
                          </h5>
                          <h5 className={styles.h6text_xs + ' text-secondary'}>
                            {shop.totalOrders}
                          </h5>
                        </div>
                        <div
                          className={
                            styles.padding_xs +
                            ' d-flex flex-column align-items-center pe-5'
                          }
                        >
                          <h5 className={styles.h6text_xs + ' text-secondary'}>
                            關注人數
                          </h5>
                          <h5 className={styles.h6text_xs + ' text-secondary'}>
                            {shop.totalFavs}
                          </h5>
                        </div>
                        <Button
                          type="button"
                          className={
                            styles.cancle_xs +
                            ' btn btn-danger d-flex align-items-center'
                          }
                          onClick={() => handleUnfavorite(shop.seller_id)}
                        >
                          <FaMinus className="me-3" />
                          取消收藏
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }


            <Paginage currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />


          </div>
        </div>
      </div>
      <div className={mStyle.PhoneTabNav}>
      <PhoneTabNav />
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}

/* export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
} */
