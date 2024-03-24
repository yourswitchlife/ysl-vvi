//hooks
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-Auth'
import io from 'socket.io-client'
//components
import Navbar from '@/components/layout/navbar/navbar'
import BreadCrumb from '@/components/common/breadcrumb'
import Sortbar from '@/components/shop/sortbar'
import SearchbarB from '@/components/shop/searchbar-b'
import Pagination from '@/components/common/pagination'
import ProductCard from '@/components/products/product-card'
import Footer from '@/components/layout/footer/footer-front'
import SortDropdown from '@/components/common/sortDropdown'
import TypeFilter from '@/components/shop/type-filter'
import Star from '@/components/shop/star'
import GoTopButton from '@/components/go-to-top/go-top-button'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import CouponUni from '@/components/coupon/coupon-shop'
import CouponProduct from '@/components/coupon/coupon-member/couponP-member'
import Chat from '@/components/chat/chat'
//images
import cover from '@/public/images/shopCover/default-cover.jpg'
import Image from 'next/image'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
//styles
import styles from '@/components/seller/seller.module.scss'
import 'animate.css/animate.min.css'
//data
import typeName from '@/data/type.json'
import ratings from '@/data/rating.json'
//icon
import { FaPlus, FaAngleDown, FaFilter, FaStar, FaMinus } from 'react-icons/fa'
import { IoChatbubblesOutline } from "react-icons/io5"
//React-bootstrap
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Collapse from 'react-bootstrap/Collapse'
import Dropdown from 'react-bootstrap/Dropdown';
//sweetalert
import Swal from 'sweetalert2'
import { Tooltip } from 'react-tooltip'

export default function ShopPage() {
  const router = useRouter()
  const { isLoggedIn, memberId, memberData } = useAuth()
  //offcanvas的展示狀態
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //toggle的展示狀態
  const [openSort, setOpenSort] = useState(false)
  const [openRate, setOpenRate] = useState(false)
  //賣場資訊
  const [shop, setShop] = useState([])
  const {id, shop_name, shop_site, shop_cover, shop_info} = shop //解構賦值賣家資料
  // console.log(shop)
  //賣場商品
  const [products, setProducts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("") //用來看有沒有搜尋的值（來決定要不要渲染搜尋結果）
  const [hit, setHit] = useState([]) //Hit 展示隨機五項商品
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [shopCover, setShopCover] = useState(cover)
  const [shopOrderNum, setShopOrderNum] = useState(0)
  const [shopFavNum, setShopFavNum] = useState(0)
  const [shopRating, setShopRating] = useState("尚無評價")
  const [commentNum, setCommentNum] = useState(0)
  const [roundedRating, setRoundedRating] = useState(0)
  const [isFav, setIsFav] = useState(false)
  
  //排序
  const [sort, setSort] = useState('id')
  const [sortProducts, setSortProducts] = useState([])
  //頁數
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)

  
  //聊天室相關
  const [room, setRoom] = useState("")
  const [socket, setSocket] = useState(null)
  const [showChat, setShowChat] = useState(false)

  //處理背景樣式
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleB)

    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleB)
    }
  }, [])

  const getShop = async (shop_site) => {
    try{
      const res = await fetch (`http://localhost:3005/api/shop/${shop_site}/overview?page=${page}&limit=${limit}&sort=${sort}`, {credentials: 'include'})
      if(!res.ok){
        throw new Error('Failed to fetch: 找不到賣場及賣場商品資料')
      }
      const data = await res.json()

      // 確保返回的數據結構正確，並更新狀態
      if (data) {
        // 這裡假設後端返回的數據結構是 { shop: {...}, shopProducts: [...] }
        // console.log(data.shopComments[0].avg_rating)
       
        
        setShop(data.shopInfo)
        // console.log(data.shopInfo)
        // 可能需要另一個狀態來存儲商品資訊
        setProducts(data.products)
        setTotalPages(data.shopInfo.totalPages)
        setShopOrderNum(data.orders.length)
        setShopFavNum(data.favCount)

        if(data.shopComments[0].avg_rating === null){
          setShopRating("尚無評論")
          setRoundedRating(0)
        }else{
          const formattedRating = parseFloat(data.shopComments[0].avg_rating).toFixed(1)
          setShopRating(formattedRating)
          const roundedRating = Math.round(formattedRating)
          setRoundedRating(roundedRating)
        }
        setCommentNum(data.shopComments[0].total_comments)
        router.push(`./${shop_site}?page=${page}`)
        // setSearchResults(data.shopProducts)
        const picUrl = data.shopInfo.pic ? (data.shopInfo.pic.startsWith("https://") ? data.shopInfo.pic : `http://localhost:3005/profile-pic/${data.shopInfo.pic}`) : profilePhoto
        setBigPic(picUrl)
        const coverUrl = data.shopInfo.shop_cover ? (data.shopInfo.shop_cover.startsWith("https://") ? data.shopInfo.shop_cover : `http://localhost:3005/shopCover/${data.shopInfo.shop_cover}`) : cover
        setShopCover(coverUrl)
      }
    }catch (e){
      console.error(e)
      Swal.fire({
        title: `找不到賣場:${shop_site}`,
        text: "前往產品頁面",
        icon: 'error',
        comfirmButtonText: '確認',
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/products')
        }
      })
    }
  }
  const handleSortChange = (sortKey) => {
    setSort(sortKey)
    setPage(1)
  }
  const handlePageChange = (newpage) => {
    setPage(newpage)
  }
  
  // const shopTotalItems = products.length //賣家總商品數

  const getRandomHit = (items, num) => {
  // 先shuffle副本
  const shuffled = [...items].sort(() => 0.5 - Math.random())
  // 返回前num筆資料
  return shuffled.slice(0, num)
  }
  const randomItems = getRandomHit(products, 5)

  useEffect(() => {
    setHit(randomItems)
  }, [products])

  //搜尋商品
  // const [searchText, setSearchText] = useState('')
  const handleSearch = (searchQuery) => {
    if(!searchQuery.trim()){
      setSearchResults([]) 
      setSearchQuery("")
    }else{
      const filteredResults = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(filteredResults)
      setSearchQuery(searchQuery)
    }
  }
  //處理我的最愛
  const handleToggleFav = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
      })
      setProducts(newProducts)
    }
  const handleHitToggleFav = (id) => {
    const newProducts = hit.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
      })
      setHit(newProducts)
    }
  const handleSearchToggleFav = (id) => {
    const newProducts = searchResults.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
    })
    setSearchResults(newProducts)
  }
  const handleFavShop = async () => {
    const url = `http://localhost:3005/api/shop/${shop_site}/fav_shop`

    //準備請求的配置
    const requestOptions = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valid: isFav ? 0 : 1
      }) //根據目前收藏狀態來設定值
    }

    try{
      const res = await fetch(url, requestOptions)
      const data = await res.json()

      if(res.ok){
        setIsFav(!isFav) //反轉當前的收藏狀態
        const actionMessage = isFav ? '取消收藏成功' : '收藏成功'
        Swal.fire(actionMessage, '', 'success')
      }else{
        throw new Error(data.message || '操作失敗')
      }
    }catch(error){
      //用replace方法去除"Error:"前綴
      let errorMessage = error.toString().replace('Error: ', '')
      Swal.fire('操作失敗', errorMessage, 'error')
    }finally{
      //無論操作成功或失敗，都重新獲取收藏狀態
      getShop(shop_site)
    }
  }
  //點擊之後導向登入的函式
  const handleLogin = () => {
    Swal.fire({
      title: '請先登入再進行收藏',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '暫不登入',
      confirmButtonText: '好的'
    }).then((result) => {
      if(result.isConfirmed){
        //點"好的"之後的操作，導向登入頁面
        router.push('/member/login')
      }
    })
  }
  useEffect(()=>{
    if(router.isReady){
      const {shop_site} = router.query
      // console.log(shop_site)
      getShop(shop_site)
      // getShopFav(shop_site)
      // getShopRating(shop_site)
    }
  },[router.isReady, sort, page, limit])


  const cardIcon = (e) => {
    e.persist()
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
  }

  const [currentFilter, setCurrentFilter] = useState('valid')
  const handleFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  //聊天室相關
  useEffect(() => {
    const newSocket = io("http://localhost:3005");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);


  let sellerId = shop.seller_id
  // console.log(sellerId)
  const createRoom = (memberId, sellerId) => {
    if (!isLoggedIn) {
      router.push('/member/login');
      return;
    } else {
      const room = [String(memberId), String(sellerId)].sort().join('_')
      // console.log(room)
      if (socket) {
        socket.emit("create_room", room);
        setShowChat(true);
        setRoom(room);
      }
    }
  }

  return (
    <>
      <GoTopButton />
      {/* navbar */}
      <Navbar />
      {/* cover */}
      <div className={styles.cover}>
        <Image height={330} width={1440} src={shopCover} alt="shop-cover" className={styles.fit} />
      </div>
      {/* shop info */}
      <div className="container">
      {!showChat ? ("") :
                  (<Chat socket={socket} memberId={memberId} memberData={memberData} room={room} isLoggedIn={isLoggedIn}/>)
                }
        <div className="d-none d-lg-block">
        <div className='mt-2'><BreadCrumb /></div>
          <div className="d-flex justify-content-around mb-5 mt-5">
          
            {/* seller detail */}
            <div className={styles.profile}>
              <Image width={250} height={250} src={bigPic} alt="profile-photo" className={styles.fit} />
              {/* <Image
                      src={memberData.pic || profilePhoto}
                      alt="Member Avatar"
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center center',
                      }}
                    /> */}
            </div>
            <div className="d-flex flex-column align-items-start justify-content-between">
              <h3 className='fw-bold'>{shop_name}</h3>
              <div>
              <h5 className='fw-light'>@{shop_site}</h5>
              <div className="d-flex align-items-center">
                {/* star rating */}
                <h6 className="pe-2">{shopRating}</h6>
                <Star avgRating={roundedRating} />
                <h6 className="ps-2">({commentNum})</h6>
              </div>
              </div>
              <div className="d-flex my-2">
                {/* little dashboard */}
                <div className="d-flex flex-column align-items-center pe-4">
                  <h5>商品數量</h5>
                  <h5 className='text-danger fw-bold'>{shop.totalItems}</h5>
                </div>
                <div className="d-flex flex-column align-items-center pe-4">
                  <h5>售出件數</h5>
                  <h5 className='text-danger fw-bold'>{shopOrderNum}</h5>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h5>收藏人數</h5>
                  <h5 className='text-danger fw-bold'>{shopFavNum}</h5>
                </div>
              </div>
              <div className='d-flex justify-content-center '>
              {/* 這裡要加上登入判斷：沒登入跳出modal導向登入，有登入要判斷這個有沒有加入收藏 */}
              {isLoggedIn ? (//有登入
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
                onClick={handleFavShop}
              >
                  {isFav ? (<>
                    <FaMinus className="me-1" /><h6>取消收藏</h6>
                  </>) : (<>
                    <FaPlus className="me-1" /><h6>收藏賣家</h6>
                  </>)}
              </button>
              ) : (//沒登入
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
                onClick={handleLogin}
              >
                <FaPlus className="me-1" />
                收藏賣家
              </button>
              )}

              <button
                  type="button"
                  className="btn btn-danger d-flex align-items-center ms-3"
                  onClick={() => createRoom(memberId, sellerId)}
                  
                >
                  <IoChatbubblesOutline className="me-1" />
                  與賣家聊聊
                </button>
                </div>       
              
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center border-start ps-3">
              {/* shop detail */}
              <h5 className={styles.detailTitle}>賣場介紹</h5>
              <h6 className={`fw-normal ${styles.textarea}`}>
                {shop_info}
              </h6>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column d-lg-none ps-4 pe-4">
          <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
            <div className={`me-4 ${styles.profile}`}>
              <Image width={250} height={250} src={bigPic} alt="profile-photo" className={styles.fit} />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              <h5 className="mb-1">{shop_name}</h5>
              <p className="mb-1">@{shop_site}</p>
              <div className="d-flex align-items-center">
                {/* star rating */}
                <p className="pe-2 mb-0">{shopRating}</p>
                <Star avgRating={roundedRating} />
                <p className="ps-2 mb-0">({commentNum})</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-center mt-1 mb-1">
            {/* little dashboard */}
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>商品數量</h6>
              <h6 className="text-danger mb-0">{shop.totalItems}</h6>
            </div>
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>售出件數</h6>
              <h6 className="text-danger mb-0">{shopOrderNum}</h6>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h6>收藏人數</h6>
              <h6 className="text-danger mb-0">{shopFavNum}</h6>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center mb-4">
            {/* shop detail */}
            <h5 className="mb-3">賣場介紹</h5>
            <p className="mb-0 ps-2 pe-2">
            {shop_info}
            </p>
          </div>
          <div className="d-flex justify-content-center mb-4">
          {isLoggedIn ? (//有登入
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center"
              onClick={handleFavShop}
            >
              {isFav ? (<>
                    <FaMinus className="me-1" /><h6>取消收藏</h6>
                  </>) : (<>
                    <FaPlus className="me-1" /><h6>收藏賣家</h6>
                  </>)}
            </button>
            ) : (//沒登入
            <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
                onClick={handleLogin}
              >
                <FaPlus className="me-1" />
                收藏賣家
              </button>
              )}

              <button
                  type="button"
                  className="btn btn-danger d-flex align-items-center ms-3"
                  onClick={() => createRoom(memberId, sellerId)}
                  
                >
                  <IoChatbubblesOutline className="me-1" />
                  與賣家聊聊
                </button>

          </div>
        </div>
        {/* <Sortbar /> */}
        <hr className={styles.line}/>
        <div className="d-none d-md-block">
        <div onClick={() => {
          router.push('/coupon')
        }} className='text-decoration-none text-light'
        style={{ cursor: 'pointer' }}
        role="presentation">
        <a data-tooltip-id="my-tooltip"
        data-tooltip-content="點選查看更多優惠！"
        data-tooltip-place="top-start">
        <h4 className="mt-3 mb-2 d-none d-md-block">YSL官網優惠券</h4>
        </a>
        </div>
        <Tooltip id="my-tooltip" style={{ backgroundColor: "#ED5260", color: "#ffffff" }}/>
          {/* <CouponProduct currentFilter={currentFilter}/> */}
          <CouponUni />
        </div>
        <div className={styles.hit}>
        <h4 className="mb-5 d-none d-md-block">焦點遊戲熱賣中❤️‍🔥<span className={`${styles.badge}`}>POPULAR</span></h4>
        <h5 className="mb-4 d-block d-md-none ps-4">焦點遊戲熱賣中❤️‍🔥</h5>
        <div className={`justify-content-md-around align-items-md-center ${styles.scroller}`}>
        {hit.map((v) => {
          return (
            <div className={styles.insideScr} key={v.id}>
            <div
            onClick={() => {
              router.push(`/products/${v.id}`)
            }}>
            
          <ProductCard
          className="p-5"
          id={v.id} 
          name={v.name}
          releaseTime={v.release_time.split('T')[0]}
          display_price={v.display_price}
          price={v.price}
          img_cover={v.img_cover}
          type={v.type_id}
          ratingId={v.rating_id}
          member_id={v.member_id}
          fav={v.fav}
          handleToggleFav={handleHitToggleFav}
          img_details={v.img_details}
          cardIcon={cardIcon}
          /></div>
          </div>
          )
        })}</div>
        </div>
        <div className="d-flex d-md-none flex-column ps-4 pe-4">
          <h5 className="fw-bold mb-2">賣場商品</h5>
          <h6 className="mb-3">共{shop.totalItems}項</h6>
        </div>
        <h4 className="d-none d-md-block mb-4">所有商品</h4>
        <div className="d-flex justify-content-between">
          <div className="d-none d-md-block">
            <SearchbarB onSearch={handleSearch}/>
          </div>
          <div className="d-none d-md-flex justify-content-end">
            {/* offcanvas btn */}
            <TypeFilter />
            {/* <SortDropdown handleSort={handleSort}/> */}
            <Dropdown>
              <Dropdown.Toggle 
                variant="success" 
                id="dropdown-basic"
                type="button"
                className={`btn d-flex justify-content-center align-items-center ${styles.offcanvasBtn}`}
              >
                <h6 className="mb-0 d-none d-md-block">排序</h6>
                <p className="mb-0 d-block d-md-none">排序</p>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange('price_asc')}>價格由低到高</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('price_desc')}>價格由高到低</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('release_time_desc')}>發行時間由近到遠</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('release_time_asc')}>發行時間由遠到近</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-5">收藏數量由低到高</Dropdown.Item>
                <Dropdown.Item href="#/action-6">收藏數量由高到低</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex d-md-none ps-4 pe-4">
            <TypeFilter />
            {/* <SortDropdown handleSort={handleSort}/> */}
          </div>
        </div>
        { searchQuery && searchResults.length > 0 ? (
          <>
          <h5 className='my-1'>"{searchQuery}"的搜尋結果：共有{searchResults.length}項商品</h5>
          <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mt-0'>
        {searchResults.map((p) => {
          return (
            <div key={p.id} className='col-6 col-md-2 mb-3'>
            <div
                    onClick={() => {
                      router.push(`/products/${p.id}`)
                    }}
                  >
              <ProductCard className="p-5" 
              id={p.id}
              name={p.name} 
              price={p.price} 
              display_price={p.display_price} 
              releaseTime={p.release_time.split('T')[0]} 
              img_cover={p.img_cover} 
              type={p.type_id} 
              ratingId={p.rating_id}
              fav={p.fav}
              handleToggleFav={handleSearchToggleFav}
              member_id={p.member_id}
              img_details={p.img_details}
              cardIcon={cardIcon}
              /></div>
            </div>
          )
        })}</div>
        </>)
         : searchQuery && !searchResults.length ? (
          <h5 className='mb-3'>"{searchQuery}"的搜尋結果：沒有找到相關商品</h5>
        ) : (<>
          
          <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mt-0'>
        {products.map((p)=> {
          return (
            <div key={p.id} className='col mb-3'>
            <div
                    onClick={() => {
                      router.push(`/products/${p.id}`)
                    }}
                  >
              <ProductCard className="p-5" 
              id={p.id}
              name={p.name} 
              price={p.price} 
              display_price={p.display_price} 
              releaseTime={p.release_time.split('T')[0]} 
              img_cover={p.img_cover} 
              type={p.type_id} 
              ratingId={p.rating_id}
              fav={p.fav}
              handleToggleFav={handleToggleFav}
              member_id={p.member_id}
              img_details={p.img_details}
              cardIcon={cardIcon}
              /></div>
            </div>
          )
        })}</div>
        </>)
        }
        <div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
      </div>
      <PhoneTabNav />
      <Footer />
      {/* offcanvas */}
      <Offcanvas show={show} onHide={handleClose} className={styles.offcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>條件篩選</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* toggle sort */}
          <Form className="d-flex align-items-center flex-column">
            <button
              type="button"
              onClick={() => setOpenSort(!openSort)}
              aria-controls="sort-collapse-text"
              aria-expanded={openSort}
              className={`btn d-flex justify-content-center align-items-center ${styles.togglebtn}`}
            >
              <h5 className="mb-0 me-2">遊戲類別</h5>
              <FaPlus />
            </button>
            <Collapse in={openSort}>
              <div id="sort-collapse-text">
                <div className="d-flex flex-column align-items-center pt-2">
                  {typeName.map((t) => {
                    return (
                      <div key={t.id}>
                        <Form.Check // prettier-ignore
                          type="checkbox"
                          id={t.id}
                          label={t.name}
                          className="my-1"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </Collapse>
            {/* toggle rate */}
            <button
              type="button"
              onClick={() => setOpenRate(!openRate)}
              aria-controls="rate-collapse-text"
              aria-expanded={openRate}
              className={`btn d-flex justify-content-center align-items-center ${styles.togglebtn}`}
            >
              <h5 className="mb-0 me-2">遊戲分級</h5>
              <FaPlus />
            </button>
            <Collapse in={openRate}>
              <div id="rate-collapse-text">
                <div className="d-flex flex-column align-items-center pt-2">
                  {ratings.map((r) => {
                    return (
                      <div key={r.id}>
                        <Form.Check // prettier-ignore
                          type="checkbox"
                          id={r.id}
                          label={r.name}
                          className="my-1"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </Collapse>
            <div
              className={`d-flex justify-content-center ${styles.selectBtn}`}
            >
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
              >
                篩選商品
              </button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}