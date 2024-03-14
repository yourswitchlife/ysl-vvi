import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BreadCrumb from '@/components/common/breadcrumb'
import Image from 'next/image'
import { FaRegHeart, FaCartPlus, FaShoppingCart } from 'react-icons/fa'
import ProductCard from '@/components/products/product-card'
import Link from 'next/link'
import styles from '../../styles/products/product-detail.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import Review from '@/components/products/review'
import Reviewed from '@/components/products/reviewed'
import RatingStars from '@/components/products/rating-stars'
import ProductImgSlider from '@/components/products/product-img-slider'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import PHistory from '@/components/products/p-history'
// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-Auth'
import GoTopButton from '@/components/go-to-top/go-top-button'

export default function ProductDetail() {
  const { isLoggedIn, memberId } = useAuth()
  const router = useRouter()

  const [product, setProduct] = useState({
    id: '',
    type_id: '',
    name: '',
    product_quanty: '0',
    fav: '',
    display_price: '',
    price: '',
    img_cover: '',
    img_details: [],
    release_time: '',
    language: [],
    rating_id: '3',
    co_op_valid: '0',
    description: '',
    member_id: '',
    valid: '',
    launch_valid: '',
    created_at: '',
  })
  const [ben, setBen] = useState(false)
  // const [detailImgs,setDetailImgs] = useState(product.img_details)
  // 商品數量+1
  const handleIncrement = () => {
    // 查看當前購物車的該商品數量
    const currentQuantyInCart =
      cartItems.find((item) => item.id === product.id)?.quantity || 0
    const newQuanty = product.quantity + 1
    if (currentQuantyInCart + newQuanty > product.product_quanty) {
      notifyMax()
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        quantity: newQuanty,
      }))
    }
  }

  // 商品數量-1
  const reduce = () => {
    setProduct((prevProduct) => {
      if (prevProduct.quantity > 1) {
        return { ...prevProduct, quantity: prevProduct.quantity - 1 }
      } else {
        return prevProduct
      }
    })
  }

  // 立即結帳
  const handleCheckout = () => {
    const routerPush = addItem(product)
    // 如果有成功加入購物車，在跳轉到購物車頁面
    if (routerPush) {
      router.push('/cart')
    }
  }

  const { addItem, cartItems, notifyMax, notifySuccess } = useCart()

  const [historyRecords, setHistoryRecords] = useState([])
  // const [product, setProduct] = useState([])

  const getProduct = async (pid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/products/${pid}`)
      const data = await res.json()
      // console.log(data[0])
      // console.log(data[0].img_details)
      // console.log(data[0].img_details.split(","))

      if (data[0].name) {
        setProduct({ ...data[0], quantity: 1, userSelect: false })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const typeChange = (v) => {
    let type = ''
    switch (Number(v)) {
      case 1:
        type = 'RPG - 角色扮演'
        break
      case 2:
        type = 'AVG - 冒險遊戲'
        break
      case 3:
        type = 'ETC - 其他類型'
        break
      case 4:
        type = 'ACT - 動作遊戲'
        break
      case 5:
        type = 'SLG - 策略遊戲'
        break
      case 6:
        type = 'RAC - 競速遊戲'
        break
      case 7:
        type = 'SPG - 體育遊戲'
        break
      case 8:
        type = 'STG - 射擊遊戲'
        break
      case 9:
        type = 'FTG - 格鬥遊戲'
        break
    }
    return type
  }
  const ratingStyle = (v) => {
    let ratingId = '',
      bgc = ''
    switch (Number(v)) {
      case 1:
        ratingId = '0'
        bgc = '#65d432'
        break
      case 2:
        ratingId = '6'
        bgc = '#07a2f0'
        break
      case 3:
        ratingId = '12'
        bgc = '#ffca00'
        break
      case 4:
        ratingId = '18'
        bgc = '#ff0000'
        break
    }
    return { ratingId, bgc }
  }
  const rs = ratingStyle(product.rating_id)

  useEffect(() => {
    if (router.isReady) {
      const { pid } = router.query
      getProduct(pid)
    }
  }, [router.isReady, router.query])

  // 取得瀏覽紀錄
  useEffect(() => {
    const historyRecordArr = localStorage.getItem('readProduct')
    let recordArr = historyRecordArr ? JSON.parse(historyRecordArr) : []
    if (!Array.isArray(recordArr)) {
      recordArr = []
    }
    setHistoryRecords(recordArr)
  }, [])

  useEffect(() => {
    console.log(historyRecords)
  }, [historyRecords])
  console.log(historyRecords)
  // let imgAry = [product.img_details.split(",")[0], product.img_details.split(",")[1], product.img_details.split(",")[2]]

  // console.log(product.img_details)
  if (product.img_details != '') {
    console.log(product.img_details.split(','))
  }
  return (
    <>
    <GoTopButton/>
      <Navbar />
      <PhoneTabNav />

      <div className={`d-lg-block d-none ${styles.pHistory}`}>
        <PHistory historyRecords={historyRecords} />
      </div>

      <div className="container mt-5 pt-4 px-lg-5 px-4">
        <BreadCrumb />
        <section className="p-detail-sec1 row mt-4">
          <div className="col-lg col pe-5-lg pe-2-lg">
            <div className={styles.imgSlider}>
              <ProductImgSlider
                img_cover={product.img_cover}
                img_details={product.img_details}
              />
            </div>
            {/* <PImgs cover={product.img_cover} /> */}
          </div>
          <div className="col-lg-6 col-12 mt-lg-0 mt-3">
            <h4 className="text-white mb-0">{product.name}</h4>
            <p className={`${styles.pDiscount} bg-info p-1 mb-4 text-white`}>
              滿＄999免運
            </p>
            <div className="d-flex mt-4 align-items-center">
              <h5 className="me-3 text-white mb-2 pt-2">數量 </h5>
              <div className={`${styles.counter} d-flex bg-light`}>
                <button
                  className={`btn btn-secondary ${styles.counterBtn}`}
                  typeof="button"
                  onClick={() => {
                    reduce(product)
                  }}
                >
                  <b>-</b>
                </button>
                <div className="d-flex align-items-center">
                  <div className={styles.quantity}>{product.quantity}</div>
                </div>
                <button
                  className={`btn btn-secondary ${styles.counterBtn}`}
                  typeof="button"
                  onClick={handleIncrement}
                >
                  <b>+</b>
                </button>
              </div>
            </div>

            <hr className="text-white border-3" />
            <div className="d-flex justify-content-between align-items-end">
            {product.display_price == null ? (''):(<h5 className="text-white-50">
                促銷價{' '}
                <span className="text-decoration-line-through">
                  NT$ {product.display_price}
                </span>
              </h5>)}
              
              <h5 className="text-white">
                折扣價NT
                <span className="h3 text-danger">
                  <b> $ {product.price}</b>
                </span>
              </h5>
            </div>
            <hr className="text-white border-3" />
            <div
              className={`${styles.textEllipsis} mb-lg-4 mb-lg-5 pb-0 mb-0 mt-4`}
            >
              <h5 className="text-white" style={{ textIndent: '2em' }}>
                {product.description}
              </h5>
            </div>
            <div className="d-lg-flex d-none justify-content-evenly">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  addItem(product)
                }}
              >
                <FaCartPlus className="text-light pb-1" /> 加入購物車
              </button>
              <button type="button" className="btn btn-info">
                <FaRegHeart className="text-light pb-1" /> 加入追蹤
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCheckout}
              >
                <FaShoppingCart className="text-light pb-1" /> 立即結帳
              </button>
            </div>

            <div
              className={`row d-lg-none m-0 ${styles.btns} ${
                ben ? 'active' : ''
              }`}
              onClick={() => {
                setBen(true)
              }}
            >
              <div typeof="button" className="col btn btn-info rounded-0 py-1" onClick={() => {
                  addItem(product)
                  notifySuccess()
                }}>
                <FaCartPlus className="text-light" /> <p>加入購物車</p>
              </div>
              <div
                typeof="button"
                className="col btn btn-info rounded-0 py-1 border-top-0 border-bottom-0 border-black"
              >
                <FaRegHeart className="text-light" /> <p>加入追蹤</p>
              </div>
              <div
                typeof="button"
                className="col-6 btn btn-danger rounded-0 py-1 d-flex align-items-center justify-content-center" onClick={handleCheckout}
              >
                <FaShoppingCart className="text-light me-1" /> <h6>立即結帳</h6>
              </div>
            </div>
          </div>
        </section>
        <section className="p-detail-sec2 row mt-5 mb-1 mt-3">
          <div className="col-lg-8 col-12 me-2-lg pe-4-lg">
            <h5 className="text-white">商品特色</h5>
            <ul className="h6 text-white">
              <li>主機平台：Switch</li>
              <li>遊戲類型：{typeChange(product.type_id)}</li>
              <li>發售日期：{product.release_time} 上市</li>
              <li>作品分級：{rs.ratingId} ⁺</li>
              <li>遊戲人數：1~2人</li>
            </ul>
            <div className="d-flex justify-content-end">
             {/* 語言/分級 */}
               {product.language != '' ? product.language.split(',').map((v,i) => {
                return(
                  <div key={i} className={`me-3 ${styles.pLanguageBig}`}>
                      <h5>
                        <b>{v}</b>{' '}
                      </h5>
                    </div>
                )
               }):''}

              <div
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '5px',
                  fontSize: '24px',
                  textAlign: 'center',
                  fontWeight: '700',
                  lineHeight: '35px',
                  color: 'black',
                  backgroundColor: rs.bgc,
                }}
              >
                {rs.ratingId}⁺
              </div>
            </div>
            <h5>商品資訊</h5>
            <h6 className="mt-4 mb-4 text-white">{product.description}</h6>

            {product.img_details != ''
              ? product.img_details.split(',').map((v, i) => {
                  return (
                    <Image
                      src={`http://localhost:3005/productImg/details/${v}`}
                      // src={`http://localhost:3005/productImg/details/${img_details}`}
                      alt="product-detail"
                      width={670}
                      height={400}
                      priority={true}
                      className="my-3 w-100 h-auto"
                    />
                  )
                })
              : ''}
          </div>
          <div className="col px-lg-3">
            <h5 className="mb-2 text-white">關於本店</h5>
            <div
              className={`${styles.myshop} d-flex justify-content-between align-items-center mb-4`}
            >
              <div className="d-flex align-items-center">
                <div>
                  <Image
                    src="https://i.ebayimg.com/images/g/ToYAAOSw-mJh6lHy/s-l1600.png"
                    alt="shop"
                    width={75}
                    height={75}
                    priority={true}
                    className="card-img-top object-fit-cover border rounded m-1"
                  />
                </div>
                <div className="ms-3">
                  <h6 className="text-white">我的ns小舖</h6>
                  <RatingStars />
                </div>
              </div>
              <div className="me-2">
                <button
                  type="button"
                  className="btn btn-danger btn-sm d-block mb-1"
                >
                  <FaRegHeart className="text-light pb-1" /> 關注店家
                </button>
                <button type="button" className="btn btn-danger btn-sm mt-1">
                  <FaRegHeart className="text-light pb-1" /> 進入本店
                </button>
              </div>
            </div>
            <hr className="text-white border-3" />
            <h5 className="text-white mb-3">本店精選</h5>
            <div className={styles.wrap}>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
            </div>
            <hr className="text-white border-3" />

            <h5 className="text-white mb-3">本分類熱銷</h5>
            <div className={styles.wrap}>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
              <ProductCard></ProductCard>
            </div>
            <Link
              href=""
              className={`d-block mt-2 text-end more h6 text-white ${styles.more}`}
            >
              看更多...
            </Link>
          </div>
        </section>
        <section className="p-detail-sec-3">
          <h5 className="text-white">對賣家的評價</h5>
          <hr className="text-white border-3" />
          <Reviewed />
          <Review />
        </section>
      </div>
      <Footer />
      <div className="d-lg-none mt-4 pt-3"></div>
    </>
  )
}
