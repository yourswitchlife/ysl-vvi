import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import BreadCrumb from '@/components/common/breadcrumb'
import Cover from '@/components/seller/cover'
import Image from 'next/image'
import profileImg from '@/public/images/profile-photo/peach.png'
import Sortbar from '@/components/shop/sortbar'
import Coupon from '@/components/shop/coupon'
import SearchbarB from '@/components/shop/searchbar-b'
import Pagination from '@/components/common/pagination'
import ProductCard from '@/components/products/product-card'
import Footer from '@/components/layout/footer/footer-front'
import SortDropdown from '@/components/common/sortDropdown'
import Form from 'react-bootstrap/Form'
import typeName from '@/data/type.json'
import ratings from '@/data/rating.json'
import TypeFilter from '@/components/shop/type-filter'
import products from '@/data/product.json'
import member from '@/data/member.json'
//Offcanvas
// import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

//toggle list from react bootstrap
import Collapse from 'react-bootstrap/Collapse'

// 引入seller.module.scss
import styles from '@/components/seller/seller.module.scss'
import { FaPlus, FaAngleDown, FaFilter, FaStar } from 'react-icons/fa'
import Link from 'next/link'

export default function Shop() {
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleB)

    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleB)
    }
  }, [])

  //offcanvas的展示狀態
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //toggle的展示狀態
  const [openSort, setOpenSort] = useState(false)
  const [openRate, setOpenRate] = useState(false)

  //賣場商品狀態
  const initState = products.map((p) => {
    return { ...p, fav: false }
  }
  )
  const [shopProducts, setShopProducts] = useState(initState)
  // console.log(shopProducts)
  const shopitems = shopProducts.filter(s => s.member_id === "3")
  // console.log(shopitems)
  const totalProducts = shopitems.length
  // console.log(totalProducts)
  //處理我的最愛
  const handleToggleFav = (id) => {
    const newProducts = shopProducts.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
    })
    setShopProducts(newProducts)
  }
  //商品總數量

  //Hit 展示隨機五項商品
  const [hit, setHit] = useState([])
  const getRandomHit = (items, num) => {
    // 先shuffle副本
    const shuffled = [...items].sort(() => 0.5 - Math.random())
    // 返回前num筆資料
    return shuffled.slice(0, num)
  }
  const randomItems = getRandomHit(shopitems, 5)
  // setHit(randomItems)
  // console.log(randomItems)
  useEffect(() => {
    setHit(randomItems)
  }, [])
  //處理我的最愛
  const handleHitToggleFav = (id) => {
    const newProducts = hit.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
    })
    setHit(newProducts)
  }

  

  //篩選3號賣家資料
  const [shopInfo, setShopInfo] = useState(member)
  // console.log(shopInfo)
  const newShopInfo = shopInfo.filter((v) => {
    return v.id === "3" 
  })
  // {"id":"3","name":"林雅琳","account":"lin.yl","password":"202CB962AC59075B964B07152D234B70","phone":"934567891","email":"lin.yl@email.com","address":"高雄市前鎮區興仁路 15 號","birthday":"1994-09-08","birthday_month":"9","created_at":"2022-01-08","gender":"Female","pic":"","level_point":"0","google_uid":"","shop_name":"碧姬公主的玩具城堡","shop_site":"princess-toy-castle","shop_cover":"princess-peach.avif","shop_info":"這裡是碧姬公主的遊戲城堡，我們提供了品質最優良的二手遊戲，讓您可以獲得物超所值的商品們，享受遊戲帝國的美好！","shop_valid":"1"},
  // console.log(newShopInfo)
 
  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* <CartNavbar /> */}
      {/* cover */}
      <Cover />
      {/* shop info */}
      <div className="container">
        <div className="d-none d-lg-block">
        <div className='mt-2'><BreadCrumb /></div>
          <div className="d-flex justify-content-around mb-5 mt-5">
          
            {/* seller detail */}
            <div className={styles.profile}>
              <Image src={profileImg} alt="" className={styles.fit} />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-between">
              <h3>碧姬公主的玩具城堡</h3>
              <h5>@princepeach8888</h5>
              <div className="d-flex">
                {/* star rating */}
                <h6 className="pe-2">5.0</h6>
                <h6 className="text-warning">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </h6>
                <h6 className="ps-2">(150)</h6>
              </div>
              <div className="d-flex">
                {/* little dashboard */}
                <div className="d-flex flex-column align-items-center pe-4">
                  <h6>商品數量</h6>
                  <h6 className='text-danger fw-bold'>{totalProducts}</h6>
                </div>
                <div className="d-flex flex-column align-items-center pe-4">
                  <h6>已賣出件數</h6>
                  <h6 className='text-danger fw-bold'>18</h6>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h6>關注人數</h6>
                  <h6 className='text-danger fw-bold'>186</h6>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
              >
                <FaPlus className="me-1" />
                關注賣家
              </button>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              {/* shop detail */}
              <h5 className={styles.detailTitle}>賣場介紹</h5>
              <h6 className={`fw-normal ${styles.textarea}`}>
                這裡是碧姬公主的遊戲城堡，我們提供了品質最優良的二手遊戲，讓您可以獲得物超所值的商品們，享受遊戲帝國的美好！在這裡，您將發現從經典到最新的遊戲，全部都以令人驚喜的價格提供。我們精心挑選和維護每一片遊戲，確保您帶回家的不僅是遊戲，還有最佳的遊玩體驗。
              </h6>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column d-lg-none ps-4 pe-4">
          <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
            <div className={`me-4 ${styles.profile}`}>
              <Image src={profileImg} alt="" className={styles.fit} />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              <h5 className="mb-1">碧姬公主的玩具城堡</h5>
              <p className="mb-1">@princepeach8888</p>
              <div className="d-flex">
                {/* star rating */}
                <p className="pe-2 mb-0">5.0</p>
                <p className="text-warning mb-0">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </p>
                <p className="ps-2 mb-0">(150)</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-center mt-1 mb-1">
            {/* little dashboard */}
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>商品數量</h6>
              <h6 className="text-danger mb-0">28</h6>
            </div>
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>已賣出件數</h6>
              <h6 className="text-danger mb-0">18</h6>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h6>關注人數</h6>
              <h6 className="text-danger mb-0">186</h6>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center mb-4">
            {/* shop detail */}
            <h5 className="mb-3">賣場介紹</h5>
            <p className="mb-0 ps-2 pe-2">
              這裡是碧姬公主的遊戲城堡，我們提供了品質最優良的二手遊戲，讓您可以獲得物超所值的商品們，享受遊戲帝國的美好！在這裡，您將發現從經典到最新的遊戲，全部都以令人驚喜的價格提供。我們精心挑選和維護每一片遊戲，確保您帶回家的不僅是遊戲，還有最佳的遊玩體驗。
            </p>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center"
            >
              <FaPlus className="me-1" />
              關注賣家
            </button>
          </div>
        </div>
        <Sortbar />
        <div className="d-none d-md-block">
          <Coupon />
        </div>
        <div className={styles.hit}>
        <h4 className="mb-5 d-none d-md-block">焦點遊戲熱賣中</h4>
        <h5 className="mb-4 d-block d-md-none ps-4">焦點遊戲熱賣中</h5>
        <div className={`justify-content-md-around align-items-md-center ${styles.scroller}`}>
        {hit.map((v) => {
          return (
            <div className={styles.insideScr} key={v.id}>
            <Link href={`/products/${v.id}`} className='text-decoration-none'>
          <ProductCard
          id={v.id} 
          name={v.name}
          releaseTime={v.release_time}
          displayPrice={v.display_price}
          price={v.price}
          cover={v.img_cover}
          type={v.type_id}
          ratingId={v.rating_id}
          memberId={v.member_id}
          fav={v.fav}
          handleToggleFav={handleHitToggleFav}
          /></Link>
          </div>
          )
        })}</div>
        </div>
        
        {/* <Hit id={hit.id} 
          name={hit.name}
          releaseTime={hit.release_time}
          displayPrice={hit.display_price}
          price={hit.price}
          cover={hit.img_cover}
          type={hit.type_id}
          ratingId={hit.rating_id}
          memberId={hit.member_id}
          fav={hit.fav} handleToggleFav={handleToggleFav}/> */}
        <div className="d-flex d-md-none flex-column ps-4 pe-4">
          <h5 className="fw-bold mb-2">賣場商品</h5>
          <h6 className="mb-3">共{totalProducts}項</h6>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-none d-md-block">
            <SearchbarB />
          </div>
          <div className="d-none d-md-flex justify-content-end">
            {/* offcanvas btn */}
            <TypeFilter />
            <SortDropdown />
          </div>
          <div className="d-flex d-md-none ps-4 pe-4">
            <TypeFilter />
            <SortDropdown />
          </div>
        </div>
        <div className="row justify-content-start text-start mt-5">
        {shopitems.map((p)=> {
          return (
            <div key={p.id} className='col-6 col-md-2 mb-3'>
              <ProductCard className="p-5" 
              id={p.id}
              name={p.name} 
              price={p.price} 
              displayPrice={p.display_price} releaseTime={p.release_time} 
              cover={p.img_cover} 
              type={p.type_id} 
              ratingId={p.rating_id}
              fav={p.fav}
              handleToggleFav={handleToggleFav}
              memberId={p.member_id}
              />
            </div>
          )
        })}
        </div>
      
        <div>
          <Pagination />
        </div>
      </div>
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
