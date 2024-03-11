import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import pStyle from '@/styles/member/points.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import sStyles from '@/styles/member/mseller.module.scss'
import Link from 'next/link'

import { FaRegHeart, FaCartPlus } from 'react-icons/fa'
import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuth } from '@/hooks/use-Auth';
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'

export default function FavProduct() {
  const router = useRouter();
  const { isLoggedIn, memberId } = useAuth();
  const [favProducts, setFavProducts] = useState([]);
  // 排序
  const [orderBy, setOrderBy] = useState('created_at');
  // 頁數
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);


  useEffect(() => {
    if (isLoggedIn) {
      const fetchFavProducts = async () => {
        try {
          const response = await fetch(`http://localhost:3005/api/member/fav-product?memberId=${memberId}&orderBy=${orderBy}&page=${page}&limit=${limit}`, {
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Failed to fetch fav products');
          }
          const data = await response.json();

          setFavProducts(data.items); // 改這行
          setTotalPages(data.totalPages);
          // 成功後導更新後的頁面
          router.push(`/member/fav-product?page=${page}`);

        } catch (error) {
          console.error('回傳收藏商品清單錯誤', error);
        }
      };
      fetchFavProducts();
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
        <div className="container d-flex flex-column  align-items-center pt-5">
          <div
            className={
              mStyle.product_card +
              ' container d-flex flex-column pb-5 align-items-center pt-5 mb-5'
            }
          >
            <div className={fpStyle.page_check}>
              <Link href="/member/fav-product" className={fpStyle.pagep_btn}>
                商品
              </Link>
              <h3 className={pStyle.gray_text}>|</h3>
              <Link href="/member/fav-shop" className={fpStyle.pages_btn}>
                <span></span>賣場
              </Link>
            </div>
            <div className=" container d-flex justify-content-end pt-3 pe-5">
              <Dropdown className="me-3 pb-2">
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
                  <Dropdown.Item onClick={() => handleSortChange('created_at')}>從新到舊</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange('created_at_asc')}>從舊到新</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* 迴圈 */}
            
            <div className="d-flex flex-wrap">
            {favProducts.map(product => (
              <div className={fpStyle.card + ' m-4 rounded-3'}>
                <div className="d-flex justify-content-center">
                  <Image
                    src=""
                    alt="product"
                    width={150}
                    height={244}
                    // priority={true}
                    className="p-2  pb-3"
                    layout="fixed"
                  // fetchPriority="width"
                  />
                </div>

                <div className="card-body p-3 pt-0">
                  <div className="d-flex justify-content-between fs-5">
                    <div className="pb-0 p-2 pt-1 border border-danger border-bottom-0 rounded-end-3 rounded-bottom-0">
                      <p className="text-danger">
                        <b>RPG</b>
                      </p>{' '}
                    </div>
                    <div>
                      <FaRegHeart className="me-4 text-danger" />
                      <FaCartPlus className="text-black" />
                    </div>
                  </div>

                  <h5 className="card-text mt-2 mb-1 text-black fw-bold">
                    舞力全開！
                  </h5>
                  <h6 className="text-black">玩具熊的小窩</h6>
                  <h6 className="text-black">發行日期 2023.11.17</h6>
                  <div class="price d-flex justify-content-between align-items-center">
                    <h5 className="fs-5">
                      <b className="text-danger">NT$1490</b>
                    </h5>
                    <h6 className="text-secondary-50 text-decoration-line-through">
                      NT$2490
                    </h6>
                    {/* <PRating></PRating> */}
                  </div>
                </div>
              </div>
              ))}
            </div>
            {/* 迴圈 */}



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
