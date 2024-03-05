import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BreadCrumb from '@/components/common/breadcrumb'
import Image from 'next/image'
import { FaRegHeart, FaCartPlus, FaShoppingCart } from 'react-icons/fa'
import ProductCard from '@/components/products/product-card'
import Link from 'next/link'
import PLanguageBig from '@/components/products/p-language-big'
import PRatingBig from '@/components/products/p-rating-big'
import styles from '../../styles/products/product-detail.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import Review from '@/components/products/review'
import Reviewed from '@/components/products/reviewed'
import RatingStars from '@/components/products/rating-stars'
import PImgs from '@/components/products/p-imgs'
import pImgDetail from '@/public/images/product/MonsterFarm-1.jpg'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import PHistory from '@/components/products/p-history'
// import { Link,useParams } from 'react-router-dom'

// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function ProductDetail() {
  const router = useRouter()

  // id: '',
  // type_id: '',
  // name: '',
  // product_quanty: 0,
  // fav: '',
  // display_price: 0,
  // price: 0,
  // img_cover: '',
  // img_1: '',
  // img_2: '',
  // img_3: '',
  // release_time: '',
  // language: [],
  // rating_id: '3',
  // co_op_valid: '0',
  // description: '',
  // member_id: '',
  // valid: '',
  // launch_valid: '',
  // created_at: '',

  const [product, setProduct] = useState({
    id: '',
    type_id: '',
    name: '',
    product_quanty: '0',
    fav: '',
    display_price: '',
    price: '',
    img_cover: '',
    img_1: '',
    img_2: '',
    img_3: '',
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

  // 商品數量+1
  const handleIncrement = () => {
    // 查看當前購物車的該商品數量
    const currentQuantyInCart = cartItems.find((item) => item.id === product.id)?.quantity || 0
    const newQuanty = product.quantity + 1
    if (currentQuantyInCart + newQuanty > product.product_quanty) {
      notifyMax()
    } else {
      setProduct(prevProduct => ({
        ...prevProduct, quantity: newQuanty
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


  // const [product, setProduct] = useState([])
  const getProduct = async (pid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/products/${pid}`)
      const data = await res.json()
      // console.log(data[0])

      if (data[0].name) {
        setProduct({ ...data[0], quantity: 1, userSelect: false })
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { pid } = router.query
      getProduct(pid)
    }
  }, [router.isReady])
  // let imgAry = [img2, img3, img3]

  console.log(product)

  return (
    <>
      <Navbar />
      <PhoneTabNav />

      <div className={`d-lg-block d-none ${styles.pHistory}`}>
        <PHistory />
      </div>

      <div className="container mt-5 pt-4 px-lg-5 px-4">
        <BreadCrumb />
        <section className="p-detail-sec1 row mt-4">
          <div className="col-lg col pe-5-lg pe-2-lg">
            <PImgs />
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
                  typeof="button" onClick={() => { reduce(product) }}>
                  <b>-</b>
                </button>
                <div className="d-flex align-items-center">
                  <div className={styles.quantity}>{product.quantity}</div>
                </div>
                <button
                  className={`btn btn-secondary ${styles.counterBtn}`}
                  typeof="button" onClick={handleIncrement}>
                  <b>+</b>
                </button>
              </div>
              {/* <div>
                <select
                  className="form-select form-select-sm"
                  aria-label="Large select example"
                >
                  <option selected>amount</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div> */}
            </div>

            <hr className="text-white border-3" />
            <div className="d-flex justify-content-between align-items-end">
              <h5 className="text-white-50">
                促銷價{' '}
                <span className="text-decoration-line-through">
                  NT$ {product.display_price}
                </span>
              </h5>
              <h5 className="text-white">
                折扣價NT
                <span className="h3 text-danger">
                  <b> $ {product.price}</b>
                </span>
              </h5>
            </div>
            <hr className="text-white border-3" />
            <h5 className="text-white pb-lg-4 mb-lg-5 pb-0 mb-0 mt-4">
              {product.description}
            </h5>
            <div className="d-lg-flex d-none justify-content-evenly">
              <button type="button" className="btn btn-info" onClick={() => {
                addItem(product);
                notifySuccess()
              }}>
                <FaCartPlus className="text-light pb-1" /> 加入購物車
              </button>
              <button type="button" className="btn btn-info">
                <FaRegHeart className="text-light pb-1" /> 加入追蹤
              </button>
              <button type="button" className="btn btn-danger" onClick={handleCheckout}>
                <FaShoppingCart className="text-light pb-1" /> 立即結帳
              </button>
            </div>

            <div
              className={`row d-lg-none m-0 ${styles.btns} ${ben ? 'active' : ''
                }`}
              onClick={() => {
                setBen(true)
              }}
            >
              <div typeof="button" className="col btn btn-info rounded-0 py-1">
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
                className="col-6 btn btn-danger rounded-0 py-1 d-flex align-items-center justify-content-center"
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
              <li>遊戲類型：動作遊戲</li>
              <li>發售日期：2023-11-09上市</li>
              <li>作品分級：輔 12 級</li>
              <li>遊戲人數：1~2人</li>
            </ul>
            <h5>商品資訊</h5>
            <h6 className="mt-4 mb-4 text-white">
              「角落小夥伴」是以「喜歡縮在牆角來享受安全感」
              這樣有些害羞內向且獨具個性的角色設定及故事，而廣受來自各種族群的支持及喜愛。
              本作品《角落小夥伴
              大家的節奏派對》便是以這樣的人氣角色「角落小夥伴」的世界觀為舞台，藉此讓玩家們享受風格迥異的音樂跟充滿趣味的影像等要素的節奏遊戲。
              由於本遊戲的操作採用了僅需配合音樂的節奏，按下按鍵或揮舞控制器這種簡單易懂的玩法，因此即便是小朋友或是不常玩遊戲的人，都能夠毫無壓力的享受遊戲的樂趣。
              還替各節奏遊戲準備了「從練習起開始遊戲」的模式，即使是第一次遊玩，只要好好練習，便能夠藉由記住規則與操作方法來盡情享受遊戲。
            </h6>
            <div className="d-flex justify-content-end">
              <div>
                <PLanguageBig></PLanguageBig>
              </div>
              <div className="ms-3 me-3">
                <PLanguageBig></PLanguageBig>
              </div>
              <div>
                <PRatingBig></PRatingBig>
              </div>
            </div>
            <Image
              src={pImgDetail}
              alt="product-detail"
              width={670}
              height={400}
              priority={true}
              className="my-3 w-100 h-auto"
            />
            <Image
              src={pImgDetail}
              alt="product-detail"
              width={670}
              height={400}
              priority={true}
              className="my-3 w-100 h-auto"
            />
            <Image
              src={pImgDetail}
              alt="product-detail"
              width={670}
              height={400}
              priority={true}
              className="my-3 w-100 h-auto"
            />
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
