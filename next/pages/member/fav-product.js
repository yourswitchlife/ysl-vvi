import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import profileImg from '@/public/images/profile-photo/default-profile-img.svg'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import pStyle from '@/styles/member/points.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'
import fpStyle from '@/styles/member/fav-p.module.scss'
import sStyles from '@/styles/member/mseller.module.scss'
import Link from 'next/link'
import { FaRegHeart, FaCartPlus, FaStore } from 'react-icons/fa'
import Paginage from '@/components/common/pagination'
import Dropdown from 'react-bootstrap/Dropdown'
//hooks
import { useAuth } from '@/hooks/use-Auth';
import { useCart } from '@/hooks/use-cart'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'

export default function FavProduct() {
  const router = useRouter();
  const { isLoggedIn, memberId } = useAuth();
  const { addItem } = useCart()

  const [favProducts, setFavProducts] = useState([]);
  // 排序
  const [orderBy, setOrderBy] = useState('created_at');
  // 頁數
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  // 編輯
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);


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

          setFavProducts(data.items);
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

  // 編輯模式
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    // 如果退出編輯模式，清空選中的產品
    if (isEditing) {
      setSelectedProducts([]);
    }
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleUnfavoriteSelected = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/member/unfav-product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          memberId: memberId,
          productIds: selectedProducts, // arr
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('unfavf success');
        setFavProducts(favProducts.filter(product => !selectedProducts.includes(product.favProductId)));
        toggleEdit();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('failed to unfavf', error);
    }
  };

  const handleAddToCart = (product) => {
    console.log(product);
    const priceString = product.price.replace(',', ''); 
    const displayPriceString = product.display_price.replace(',', ''); 
    const newItem = {
      id: product.productId,
      name: product.productName,
      language: product.language,
      product_quanty: product.product_quanty,
      price: Number(priceString),
      display_price: Number(displayPriceString),
      quantity: 1, // 預設1
      img_cover: product.img_cover,
      member_id: product.memberId,
      user_select: false
    }
    console.log(newItem)
    addItem(newItem)
  }

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
            <div className={sStyles.tenpadding + " container d-flex justify-content-end mt-4 pe-5"}>
              {isEditing ? (
                <>
                  <button onClick={handleUnfavoriteSelected} className={sStyles.statusBtn + " btn btn-danger d-flex justify-content-center align-items-center px-3 me-3"}>取消收藏</button>
                  <button onClick={toggleEdit} className={`${sStyles.rankingBtn} ${sStyles.button_xs} btn btn-info d-flex justify-content-center align-items-center px-3 me-3`}>返回</button>

                </>
              ) : (
                <button onClick={toggleEdit} className={sStyles.statusBtn + " btn btn-danger d-flex justify-content-center align-items-center px-3 mx-3"}>編輯</button>
              )}
              <Dropdown className={sStyles.noneme + " me-3 pb-2"}>
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


            <div className="d-flex flex-wrap justify-content-center">
              {favProducts.map((product, index) => (
                <div className={fpStyle.card + ' m-4 rounded-3'} key={index}>
                  <div className="d-flex justify-content-center">
                    <Image
                      src={`http://localhost:3005/productImg/cover/${product.img_cover}` || profileImg}
                      alt={product.img_cover}
                      width={150}
                      height={244}
                      // priority={true}
                      className={fpStyle.cover_img + " p-2  pb-3"}
                      layout="fixed"
                    // fetchPriority="width"
                    />
                  </div>

                  <div className="card-body p-3 pt-0">
                    <div className="d-flex justify-content-between fs-5">
                      <div className="pb-0 px-2  pt-1 border border-danger border-bottom-0 rounded-end-3 rounded-bottom-0">
                        <p className="text-danger">
                          <b>
                            {product.type_id === 1 ? 'RPG' :
                              product.type_id === 2 ? 'AVG' :
                                product.type_id === 3 ? 'ETC' :
                                  product.type_id === 4 ? 'ACT' :
                                    product.type_id === 5 ? 'SLG' :
                                      product.type_id === 6 ? 'RAC' :
                                        product.type_id === 7 ? 'SPG' :
                                          product.type_id === 8 ? 'STG' :
                                            product.type_id === 9 ? 'FTG' :
                                              null}
                          </b>
                        </p>{' '}
                      </div>
                      <div>
                        {isEditing && (
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.favProductId)}
                            onChange={() => handleProductSelect(product.favProductId)}
                            className="me-4"
                            style={{ transform: "scale(1.7)", marginRight: "10px" }}
                          />
                        )}
                        <FaCartPlus className="text-danger" onClick={() => handleAddToCart(product)} style={{ cursor: 'pointer' }} />
                      </div>
                    </div>

                    <h5 className={fpStyle.cover_name + " card-text mt-2 mb-1 text-black fw-bold"}>
                      {product.productName}
                    </h5>
                    <Link href={`/shop/${product.shop_site}`} className="text-info fw-bold" style={{ textDecoration: 'none' }}><FaStore className='mb-1 me-2' />{product.shop_name}</Link>
                    <div className={fpStyle.xs_dflex}>
                      <h6 className={"text-secondary"}>發行日期 </h6>
                      <h6 className={fpStyle.npadding + ' ps-2 text-secondary'}>{product.release_date}</h6>
                    </div>
                    <div class="price d-flex justify-content-between align-items-center">
                      <h5 className="fs-5">
                        <b className="text-danger">${product.price}</b>
                      </h5>
                      <h6 className="text-secondary-50 text-decoration-line-through">
                        ${product.display_price}
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

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}