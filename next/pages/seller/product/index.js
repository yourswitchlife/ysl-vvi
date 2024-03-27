import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-Auth'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
//components
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import { FaStar, FaPlus, FaRegHeart } from 'react-icons/fa'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import BreadCrumb from '@/components/common/breadcrumb'
import Pagination from '@/components/common/pagination'

//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import cover from '@/public/images/shopCover/default-cover.jpg'
import profileImg from '@/public/images/profile-photo/peach.png'
import defaultHead from '@/public/images/profile-photo/default-profile-img.svg'
import gameCover from '@/public/images/seller/product-cover/crymachina.jpg'

import InputGroup from 'react-bootstrap/InputGroup'
import { BsFiles, BsSignStopLightsFill, BsHeart, BsFlag } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
//npm install
import Swal from 'sweetalert2'

export default function Product() {
  const { isLoggedIn, memberId, memberData } = useAuth()
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [shopCover, setShopCover] = useState(cover)
  const router = useRouter()
  const [product, setProduct] = useState([])
  const [productNum, setProductNum] = useState(0)
  //執行tabs篩選
  const [selectedTab, setSelectedTab] = useState('all')
  //頁數
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  //搜尋
  const [searchQuery, setSearchQuery] = useState('')
  // 新增狀態用來追蹤選中的產品
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)
    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
    }
  }, [])

  const fetchProduct = async () => {
    try{
      const res = await fetch(`http://localhost:3005/api/seller/product?tab=${selectedTab}&search=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`, {
        credentials: 'include'
      })
      if(!res.ok){
        throw new Error('網路請求失敗，找不到賣家產品資料')
      }
      let data = await res.json()
      // console.log(data)
      data.items = formatLanguageToHtml(data.items)
      setProduct(data.items)
      setTotalPages(data.totalPages)
      setProductNum(data.totalItems)
    }catch(error){
      console.error(error)
    }
  }

  const formatLanguageToHtml = (products) => {
    return products.map(p => {
      const languageMap = {
        CH: '中文版',
        EN: '英文版',
        JP: '日文版',
      }
       // 将语言字符串分割成数组，例如 "CH,EN,JP" 变成 ['CH', 'EN', 'JP']
      const languages = p.language.split(',')
      // 使用 map() 方法将每个语言代码转换为对应的 HTML 字符串，并使用 join() 方法合并成一个字符串
      const formattedLanguages = languages.map(lang => languageMap[lang] || '').join('')
      return {
        ...p,
        language: formattedLanguages
      }
    })
  }

  useEffect(() => {
    if(isLoggedIn) {
      fetchProduct(selectedTab)
      // console.log(memberData.shop_cover)
      const picUrl = memberData.pic ? (memberData.pic.startsWith("https://") 
        ? memberData.pic 
        : `http://localhost:3005/profile-pic/${memberData.pic}`) 
      : profilePhoto
      setBigPic(picUrl)
      const coverUrl = memberData.shop_cover ? (memberData.shop_cover.startsWith("https://") ? memberData.shop_cover : `http://localhost:3005/shopCover/${memberData.shop_cover}`) : cover
      setShopCover(coverUrl)
      // console.log(memberData)
      // getSellerData()
    }
  }, [isLoggedIn, memberId, memberData, selectedTab, page, limit])

  const handleTabChange = (selectedTab) => {
    //更新狀態
    setSelectedTab(selectedTab)
    //更新url的查詢參數（但不加載頁面）
    router.push(`./product?tab=${selectedTab}`, undefined, { shallow: true })
  }

  //下架商品
  const handleUnshop = async (pid) => {
    Swal.fire({
      title: "要下架商品嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: '確認下架',
      cancelButtonText: '取消'
    })
    .then(async(result) => {
      if(result.isConfirmed){
        try{
          const response = await fetch(`http://localhost:3005/api/seller/product/${pid}`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ pid })
        });
        if (response.ok) {
          // 成功刪除後，Swal一下
          Swal.fire("下架商品成功！", {
            icon: 'success',
          })
          //更新商品列表
          fetchProduct(); 
        } else {
          throw new Error('下架商品失敗');
        }
      }catch (error) {
        console.error('下架商品錯誤：', error)
        Swal.fire("下架商品失敗！", {
          icon: 'error',
        })
      }
    }else{
      Swal.fire("您的商品還活著！")
    }
  })
  }

  //重新上架商品
  const handleOnshop = async (pid) => {
    const response = await fetch(`http://localhost:3005/api/seller/product/onshop/${pid}`, {
      method: 'PATCH', 
      headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ pid })
        });
        if (response.ok) {
          // 成功刪除後，Swal一下
          Swal.fire("上架商品成功！", {
            icon: 'success',
          })
          //更新商品列表
          fetchProduct(); 
        } else {
          throw new Error('上架商品失敗')
            // Swal.fire("下架商品失敗！", {
            //   icon: 'error',
            // })
        }
  }

  // 處理選擇框
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelection = new Set(prevSelectedProducts)
      if (newSelection.has(productId)) {
        newSelection.delete(productId)
      } else {
        newSelection.add(productId)
      }
      return newSelection;
    })
  }

  // 批量删除產品
  const handleDeleteSelected = async () => {
    // 伪代码: 您需要根据自己的API实现具体的删除逻辑
    // 例如:
    // selectedProducts.forEach(async (productId) => {
    //   await fetch(`API_ENDPOINT/${productId}`, { method: 'DELETE' });
    // });

    // 删除后从UI中移除这些产品
    setProduct((prevProducts) => prevProducts.filter(p => !selectedProducts.has(p.id)));
    setSelectedProducts(new Set()); // 清空选择
  }


  //加上搜尋按鈕的點擊事件處理函數
  const handleSearch = () => {
    setPage(1) //重置到第一頁
    fetchProduct()
  }

  useEffect(() => {
    //從url查詢中獲取tab值
    const { tab } = router.query
    //如果有tab值，更新狀態
    if(tab){
      setSelectedTab(tab)
    }
  }, [router.query.tab])

  const handlePageChange = (newpage) => {
    setPage(newpage)
  }
 

  // function handleSubmit(e) {
  //   e.prevent.default()
  // }

  return (
    <>
      <header>
        <SellerNavbar />
      </header>
      <div className={styles.mainContainer}>
        {memberData && (
            <>
            <Sidebar 
              profilePhoto={bigPic} 
              memberShopSite={memberData.shop_site || memberData.account} 
              memberShopName={memberData.shop_name || memberData.account}/>
            </>
          )}
        <main className='flex-grow-1'>
          <div className="d-flex flex-column d-lg-none container ps-4 pe-4">
            <div className="d-flex justify-content-around align-items-center mt-4 mb-2">
              <div className={`${styles.profile}`}>
              {memberData && <Image src={bigPic} width={75} height={75} alt="profile-photo" className={styles.fit} />}
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center">
              {memberData && (
                <>
                <h6 className="mb-1 fw-bold">{memberData.shop_name || memberData.account}</h6>
                <p className="mb-1">@{memberData.shop_site || memberData.account}</p>
                </>
              )}
              </div>
              <div>
              {memberData && (
                <>
                {memberData.shop_name ? (<button className='btn btn-danger' onClick={() => {
                router.push(`http://localhost:3000/shop/${memberData.shop_site}`)
              }}>查看賣場</button>) : (<button className='btn btn-danger' onClick={() => {
                router.push(`http://localhost:3000/seller/shop`)
              }}>建置賣場</button>)}
                </>
              )}
              </div>
            </div>
            <hr />
          </div>
          <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
            <BreadCrumb />
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <div className="d-flex justify-content-start align-items-center mb-3">
                <h5 className="text-dark fw-bold">我的商品</h5>
                <h6 className="text-secondary ms-2">查看您的賣場商品</h6>
              </div>
              <Form className="row">
                <div className="col-6">
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">商品名稱</h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }} />
                    </div>
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">類別名稱</h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入類別名稱" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="productAmount">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">商品數量</h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="最小值" />
                      <p className="text-dark mx-2">-</p>
                      <Form.Control type="text" placeholder="最大值" />
                    </div>
                  </Form.Group> */}
                </div>
                <div className="d-flex justify-content-start align-items-center mt-2">
                  <button type="button" className="btn btn-danger me-2" onClick={handleSearch}>
                    搜尋
                  </button>
                  <button type="button" className={`btn btn-danger ${styles.btnDangerOutlined}`} onClick={() => {
                    setSearchQuery("")
                    setPage(1) //重置到第一頁
                    fetchProduct()
                  }}>
                    取消
                  </button>
                </div>
              </Form>
            </div>
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <Tabs
                defaultActiveKey="all"
                id="product"
                className="mb-3"
                onSelect={handleTabChange}
              >
                <Tab
                  eventKey="all" title={<span className={selectedTab === 'all' ? "text-danger" : "text-dark"}>全部</span>}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-bold">{productNum}件商品</h5>
                    <Link href="./product/new" className='text-decoration-none'>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex align-items-center text-decoration-none"
                    >
                      <FaPlus className="me-1" />
                      <h6 className='text-decoration-none'>新增商品</h6>
                    </button>
                    </Link>
                  </div>
                </Tab>
                <Tab
                  eventKey="onShop"
                  title={<span className={selectedTab === 'onShop' ? "text-danger" : "text-dark"}>架上商品</span>}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-bold">{productNum}件商品</h5>
                    <Link href="./product/new" className='text-decoration-none'>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex align-items-center text-decoration-none"
                    >
                      <FaPlus className="me-1" />
                      <h6 className='text-decoration-none'>新增商品</h6>
                    </button>
                    </Link>
                  </div>
                </Tab>
                <Tab
                  eventKey="soldout"
                  title={<span className={selectedTab === 'soldout' ? "text-danger" : "text-dark"}>已售完</span>}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-bold">{productNum}件商品</h5>
                    <Link href="./product/new" className='text-decoration-none'>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex align-items-center text-decoration-none"
                    >
                      <FaPlus className="me-1" />
                      <h6 className='text-decoration-none'>新增商品</h6>
                    </button>
                    </Link>
                  </div>
                </Tab>
                <Tab
                  eventKey="unShop"
                  title={<span className={selectedTab === 'unShop' ? "text-danger" : "text-dark"}>未上架</span>}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-bold">{productNum}件商品</h5>
                    <Link href="./product/new" className='text-decoration-none'>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex align-items-center text-decoration-none"
                    >
                      <FaPlus className="me-1" />
                      <h6 className='text-decoration-none'>新增商品</h6>
                    </button>
                    </Link>
                  </div>
                </Tab>
              </Tabs>
              <div className="container">
                    {/*--------------Rating Subtitle------------------ */}
                    <div
                      className={`row mt-3 py-2 text-center ${styles.ratingST}`}
                    >
                      <h6 className="mb-0 col-1 fw-normal text-start"><Form.Check aria-label="option 1" /></h6>
                      <h6 className="mb-0 col-3 fw-normal">商品名稱</h6>
                      <h6 className="mb-0 col-1 fw-normal">類別</h6>
                      <h6 className="mb-0 col-1 fw-normal">語言</h6>
                      <h6 className="mb-0 col-2 fw-normal">
                        售價 <span className={styles.fsSmall}>(原價)</span>
                      </h6>
                      <h6 className="mb-0 col-1 fw-normal">數量</h6>
                      <h6 className="mb-0 col-1 fw-normal px-0">已售出</h6>
                      <h6 className="mb-0 col-2 fw-normal">操作</h6>
                    </div>
                  </div>
                  {/*--------------Rating Content------------------ */}
                  {product && (<>
                    {product.map((v, i) => {
                      return (
                        <div className="px-3 py-5 border-bottom" key={v.id}>
                    <div className="text-dark">
                      <div className="row align-items-center text-center">
                        <h6 className="mb-0 col-1 fw-normal text-start"><Form.Check aria-label="option 1" /></h6>
                        <div className="col-3 d-flex flex-column justify-content-start align-items-start mt-2">
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <Image
                              src={v.img_cover ? (v.img_cover.startsWith("https://") ? v.img_cover : `http://localhost:3005/productImg/cover/${v.img_cover}`) : gameCover}
                              alt="game-cover"
                              width={70}
                              height={115}
                            />
                            <div className="d-flex justify-content-start align-items-start flex-column">
                              <h6 className="mb-0 text-dark ms-3 text-start">
                                {v.name}
                              </h6>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaRegHeart className="ms-3 mt-2 text-secondary" />
                                <p className="text-secondary ms-1 mt-2">{v.favorite_count}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1">
                          <h6 className="text-secondary text-start">{v.type_name}</h6>
                        </div>
                        <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                          <h6 className="text-secondary">{v.language}</h6>
                        </div>
                        <div className="col-2">
                          <h6 className="fw-bold">NT$ {v.price}</h6>
                          <p className="text-secondary">(NT$ {v.display_price})</p>
                        </div>
                        <div className="col-1">
                          <h6 className="text-secondary">{v.product_quanty}</h6>
                        </div>
                        <div className="col-1">
                          <h6 className="text-secondary">{v.total_quantity}</h6>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          {/* 可以跳出一個MODAL來處理 */}
                          <button
                            type="button"
                            className={`btn btn-danger btn-sm mb-1 ${styles.btnDangerOutlined}`}
                            onClick={() => {
                              router.push(`http://localhost:3000/products/${v.id}`)
                            }}
                          >
                            {v.valid === 0 ? '編輯' : '查看'}
                          </button>
                          {v.valid === 0 ? (<button
                            type="button"
                            className={`btn btn-danger btn-sm ${styles.btnGrayOutlined}`}
                            onClick={() => {
                            handleOnshop(v.id)
                          }}
                          >
                            上架
                          </button>) : (<button
                            type="button"
                            className={`btn btn-danger btn-sm ${styles.btnGrayOutlined}`}
                            onClick={() => {
                            handleUnshop(v.id)
                          }}
                          >
                            下架
                          </button>
                      )}
                        </div>
                      </div>
                    </div>
                  </div>
                      )
                    })}
                  </>)}
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
              {/* <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="text-dark mb-0 me-3">41筆評價</h5>
                <div className="d-flex ">
                  <Dropdown className="me-2">
                    <Dropdown.Toggle
                      variant="success"
                      id="ranking"
                      type="button"
                      className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                    >
                      <h6
                        className={`mb-0 d-none d-md-block ${styles.textColor}`}
                      >
                        訂單成立時間
                      </h6>
                      <p className="mb-0 d-block d-md-none">訂單成立時間</p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        時間由近到遠
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        時間由遠到近
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="ranking"
                      type="button"
                      className={`btn d-flex justify-content-center align-items-center ${styles.rankingBtn}`}
                    >
                      <h6
                        className={`mb-0 d-none d-md-block ${styles.textColor}`}
                      >
                        評價分數
                      </h6>
                      <p className="mb-0 d-block d-md-none">評價分數</p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        分數由高到低
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        分數由低到高
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div> */}
            </div>
          </div>
          <div className="d-block d-md-none container ps-4 pe-4">
            <Tabs
              defaultActiveKey="all"
              id="orderStatusTabs"
              className="mb-3"
              onSelect={handleTabChange}
            >
              <Tab
                eventKey="all"
                title={<span className={selectedTab === 'all' ? "text-danger" : "text-light"}>全部</span>}
              >
                <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" 
                      value={searchQuery}
                      onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }} />
                    </div>
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>遊戲類別</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入類別名稱" />
                    </div>
                  </Form.Group> */}
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                      onClick={handleSearch}
                    >
                      搜尋
                    </button>
                    <button type="button" className={`btn btn-danger btn-sm ${styles.btnDangerOutlined}`}
                    onClick={() => {
                    setSearchQuery("")
                    setPage(1) //重置到第一頁
                    fetchProduct()
                  }}>
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold">{productNum}件商品</h6>
                  <Link href="./product/new" className='text-decoration-none'>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                  >
                    <FaPlus className="me-1" />
                    <p className='text-decoration-none'>新增商品</p>
                  </button>
                  </Link>
                </div>
                
              </Tab>
              <Tab eventKey="onShop" title={<span className={selectedTab === 'onShop' ? "text-danger" : "text-light"}>架上商品</span>}>
              <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" 
                      value={searchQuery}
                      onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }} />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                      onClick={handleSearch}
                    >
                      搜尋
                    </button>
                    <button type="button" className={`btn btn-danger btn-sm ${styles.btnDangerOutlined}`}
                    onClick={() => {
                    setSearchQuery("")
                    setPage(1) //重置到第一頁
                    fetchProduct()
                  }}>
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold">{productNum}件商品</h6>
                  <Link href="./product/new" className='text-decoration-none'>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                  >
                    <FaPlus className="me-1" />
                    <p className='text-decoration-none'>新增商品</p>
                  </button>
                  </Link>
                </div>
              </Tab>
              <Tab
                eventKey="soldout"
                title={<span className={selectedTab === 'soldout' ? "text-danger" : "text-light"}>已售完</span>}
              >
                <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" 
                      value={searchQuery}
                      onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }} />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                      onClick={handleSearch}
                    >
                      搜尋
                    </button>
                    <button type="button" className={`btn btn-danger btn-sm ${styles.btnDangerOutlined}`}
                    onClick={() => {
                    setSearchQuery("")
                    setPage(1) //重置到第一頁
                    fetchProduct()
                  }}>
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold">{productNum}件商品</h6>
                  <Link href="./product/new" className='text-decoration-none'>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                  >
                    <FaPlus className="me-1" />
                    <p className='text-decoration-none'>新增商品</p>
                  </button>
                  </Link>
                </div>
              </Tab>
              <Tab
                eventKey="unShop"
                title={<span className={selectedTab === 'unShop' ? "text-danger" : "text-light"}>未上架</span>}
              >
              <Form>
                  <Form.Group className="mb-3" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="my-2 me-3 flex-shrink-0">
                        <h6>商品名稱</h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" 
                      value={searchQuery}
                      onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }} />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                      onClick={handleSearch}
                    >
                      搜尋
                    </button>
                    <button type="button" className={`btn btn-danger btn-sm ${styles.btnDangerOutlined}`}
                    onClick={() => {
                    setSearchQuery("")
                    setPage(1) //重置到第一頁
                    fetchProduct()
                  }}>
                      取消
                    </button>
                  </div>
                  <hr />
                </Form>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold">{productNum}件商品</h6>
                  <Link href="./product/new" className='text-decoration-none'>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                  >
                    <FaPlus className="me-1" />
                    <p className='text-decoration-none'>新增商品</p>
                  </button>
                  </Link>
                </div>
              </Tab>
            </Tabs>
            {/*--------------Rating Content------------------ */}
            {product && (<>
              {product.map((v, i) => {
                return (
                  <div className={`px-3 py-3 my-3 ${styles.productCard}`} key={v.id}>
                  <div className="text-dark">
                    <div className="row align-items-center text-center">
                      <h6 className="mb-0 col-2 fw-normal text-start"><Form.Check aria-label="option 1" /></h6>
                      <div className="col-6 d-flex flex-column justify-content-start align-items-start mt-2">
                        <div className="d-flex justify-content-start align-items-center mb-2">
                        <Image
                              src={v.img_cover ? (v.img_cover.startsWith("https://") ? v.img_cover : `http://localhost:3005/productImg/cover/${v.img_cover}`) : gameCover}
                              alt="game-cover"
                              width={42}
                              height={70}
                            />
                          <div className="d-flex justify-content-start align-items-start flex-column">
                            <p className="mb-0 text-dark text-start ms-2">
                            {v.name}
                            </p>
                            <div>
                              <p className="text-secondary ms-2">NT$  {v.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                        {/* 可以跳出一個MODAL來處理 */}
                        <button
                          type="button"
                          className={`btn btn-danger btn-sm mb-1 ${styles.btnDangerOutlined}`}
                            onClick={() => {
                              router.push(`../products/${v.id}`)
                            }}
                        >
                          {v.valid === 0 ? '編輯' : '查看'}
                        </button>
                        {v.valid === 0 ? (<button
                            type="button"
                            className={`btn btn-danger btn-sm ${styles.btnGrayOutlined }`}
                            onClick={() => {
                            handleOnshop(v.id)
                          }}
                          >
                            上架
                          </button>) : (<button
                            type="button"
                            className={`btn btn-danger btn-sm ${styles.btnGrayOutlined }`}
                            onClick={() => {
                            handleUnshop(v.id)
                          }}
                          >
                            下架
                          </button>
                      )}
                      </div>
                      <hr className='mb-2 mt-1'/>
                      <div className="col-6 text-start d-flex justify-content-start align-items-center">
                      <BsFlag className='me-1 fs-small'/>
                        <p className="text-secondary">{v.type_name}</p>
                      </div>
                      <div className="col-6 d-flex justify-content-start align-items-center">
                      <BsFiles className='me-1'/>
                        <p className="text-secondary">商品數量 {v.product_quanty}</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <IoBagCheckOutline className='me-1'/>
                        <p className="text-secondary">已售出 {v.total_quantity}</p>
                      </div>
                      <div className="mt-2 col-6 d-flex justify-content-start align-items-center">
                        <BsHeart className="me-1" />
                        <p className="text-secondary">收藏 {v.favorite_count}</p>
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
            </>)}
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
          </div>
          <div className={`d-block d-md-none ${styles.spaceForPhoneTab}`}></div>
        </main>
      </div>
      <PhoneTabNav />
      <div className="d-none d-md-block">
        <SellerFooter />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
