import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'

import Link from 'next/link'
import Image from 'next/image'
import ControlledCarousel from '@/components/common/ControlledCarousel'
import styles from '../styles/index.module.scss'
import style from '@/styles/article/pages.module.scss'
import mstyles from '../styles/member/index.module.scss'
import estyles from '../styles/index_event/index.module.scss'
import Navbar from '@/components/layout/navbar/navbar'
// import ProductList from '@/components/products/product-card'
import Footer from '@/components/layout/footer/footer-front'
// import IndexSlider from '@/components/common/index-slider'
import ShopCardA from '@/components/shop/shop-card-a'
import ShopCardB from '@/components/shop/shop-card-b'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
// import Navbar from '@/components/layout/navbar/navbar'
import GoTopButton from '@/components/go-to-top/go-top-button'
import ProductCard from '@/components/products/product-card'
import WeeklySelect from '@/assets/weekly-select.svg'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoCloseSharp } from 'react-icons/io5'
import { useAuth } from '@/hooks/use-Auth'
import TypeSwiper from '@/components/common/typeSwiper'
import { chunk } from 'lodash'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// import checkLogin from '@/context/member/checkLogin'

export default function Index() {
  const router = useRouter()
  const [shop, setShop] = useState([])
  const [selectedShops, setSelectedShops] = useState([null, null])
  const [rating, setRating] = useState([])
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [roundedRating, setRoundedRating] = useState(0)
  const [products, setProducts] = useState([])
  const [randomProducts, setRandomProducts] = useState([])
  const { isLoggedIn, memberId } = useAuth()
  // 設置本周精選卡片的翻面狀態
  const [flippedStates, setFlippedStates] = useState({})
  // 設置日曆
  const [myDate, setMyDate] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 卡片翻轉的狀態
  const flipCard = (id) => {
    setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }))
    console.log(id)
  }

  useEffect(() => {
    // console.log(flippedStates)
  }, [flippedStates])

  const getShop = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/shop/`)
      if (!res.ok) {
        throw new Error('網路請求失敗，找不到賣場資料評價')
      }
      const data = await res.json()
      const { shopRating, shop } = data
      // console.log(shop)
      // {
      //   "shopRating": [{....}],
      //   "shop": [{....}],
      // 確保返回的數據結構正確，並更新狀態
      if (data && shop.length > 0 && shopRating.length > 0) {
        setShop(shop)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getShop()
  }, [])

  // 取得商品資料
  const getProducts = () => {
    const url = 'http://localhost:3005/api/products/list'
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (Array.isArray(data.products)) {
          setProducts(data.products)
        }
      })
      .catch((error) => console.error('取得會員收藏清單失敗'))
  }
  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      // 過濾會員自己賣的商品
      const filterProducts = products.filter((p) => p.member_id !== memberId)
      // 過濾掉沒有	description內容的商品
      const hasDescriptionProducts = filterProducts.filter(
        (p) => p.description !== ''
      )
      // 打亂過濾後的產品列表
      const shuffleProducts = hasDescriptionProducts.sort(
        () => 0.5 - Math.random()
      )
      // 從打亂的列表隨機取4個
      const selectedProducts = shuffleProducts.slice(0, 3)
      setRandomProducts(selectedProducts)
    }
  }, [products, memberId])

  // 設定瀏覽紀錄
  const historyRecord = (p) => {
    if (!p) {
      return
    }
    const existingRecordsStr = localStorage.getItem('readProduct')
    let historyRecordArr
    if (existingRecordsStr) {
      historyRecordArr = JSON.parse(existingRecordsStr)
      if (!Array.isArray(historyRecordArr)) {
        historyRecordArr = []
      }
    } else {
      historyRecordArr = []
    }
    const hasRecord = historyRecordArr.some(
      (item) => JSON.stringify(item) === JSON.stringify(p)
    )

    if (!hasRecord) {
      historyRecordArr.unshift(p)
    }
    if (historyRecordArr.length > 7) {
      historyRecordArr.pop()
    }
    localStorage.setItem('readProduct', JSON.stringify(historyRecordArr))
  }
  useEffect(() => {
    historyRecord()
  }, [])

  const addFav = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/products/favProducts?memberId=${memberId}&pid=${id}`,
        {
          method: 'POST',
          credentials: 'include',
        }
        )
      if (!res.ok) {
        throw new Error('Failed to fetch fav products')
      }
      MySwal.fire({
        icon: 'success',
        title: '成功加入收藏!',
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err) {
      console.log('Error')
    }
  }
  
  const handleToggleFav = async (id) => {
    if (!memberId) {
      MySwal.fire({
        icon: 'warning',
        text: '請先登入',
        confirmButtonColor: '#E41E49',
      })
      return
    }
    // 是否蒐藏 預設為否
    let shouldAddFav = false
    const newProducts = products.map((p) => {
      if (p.id === id) {
        if (!p.fav) {
          shouldAddFav = true
        }
        return { ...p, fav: !p.fav }
      } else {
        return p
      }
    })
    setProducts(newProducts)
    if (shouldAddFav) {
      await addFav(id)
    }
  }

  const cardIcon = (e) => {
    e.persist()
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
  }

  //日曆
  const now = {
    y: new Date().getFullYear(),
    m: new Date().getMonth() + 1, //注意回傳為 0~11
    d: new Date().getDate(),
  }
  const weekDayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  const days = new Date(now.y, now.m, 0).getDate()
  const firstDay = new Date(now.y, now.m - 1, 1).getDay()
  const allData = chunk(
    [
      ...Array(firstDay).fill(''),
      ...Array(days)
        .fill('')
        .map((v, i) => i + 1),
    ],
    7
  )
  // console.log(allData)

  ///精選文章
  const [hot, setHot] = useState([])

  const getArticle = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/article')
      const data = await res.json()

      if (data) {
        // console.log(data.hot2)
        setHot(data.hot2)
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getArticle()
  }, [])

  return (
    <>
      <PhoneTabNav />
      <GoTopButton />
      <Navbar />
      <div
        className={`${styles.headTitleCard} z-1 position-absolute d-lg-inline-flex d-none flex-column justify-content-center ms-5`}
      >
        <div className="ps-3">
          <h4 className="text-white">Let’s enjoy</h4>
          <h1 className="text-white">
            <b>
              Your <br />
              Switch <br />
              Life !
            </b>
          </h1>
          <h4 className="text-white pt-3">二手Switch 遊戲販售平台</h4>
        </div>
        {!isLoggedIn && (
          <div className="btns mt-1 ps-3">
            <Link href="member/login" className="me-3">
              <button
                className={mstyles.sign_btn + ' btn btn-danger px-4 me-sm-3'}
              >
                會員登入
              </button>
            </Link>
            <Link href="member/register">
              <button className={mstyles.signin_btn + ' btn btn-info me-sm-3'}>
                立即加入
              </button>
            </Link>
          </div>
        )}
      </div>
      <ControlledCarousel />
      <section className={`${styles.sec2}`}>
        <div className={`${styles.weeklySelect} ${styles.top}`}>
          <Image src={WeeklySelect} className={styles.img} />
          <Image src={WeeklySelect} className={styles.img} />
        </div>
        <div className={styles.cardFrame}>
          <div className={`container d-flex ${styles.cardBody}`}>
            {randomProducts.map((p) => {
              const isFlipped = flippedStates[p.id] || false
              return (
                <div
                  className={styles.cardLink}
                  key={p.id}
                  onClick={() => {
                    flipCard(p.id)
                  }}
                >
                  <div className={`${styles.card}`}>
                    <div
                      className={`${styles.ura} ${
                        isFlipped ? styles.isFlipped : ''
                      }`}
                      style={{
                        backgroundImage: `url(http://localhost:3005/productImg/cover/${p.img_cover})`,
                      }}
                    >
                      <div className={styles.title}>{p.name}</div>
                      <div className={styles.description}>{p.description}</div>
                      <div
                        className={styles.more}
                        onClick={() => {
                          router.push(`/products/${p.id}`)
                        }}
                      >
                        MORE <FaArrowRightLong />
                      </div>
                    </div>
                    <div
                      className={`${styles.inner} ${
                        isFlipped ? styles.isFlipped : ''
                      }`}
                    >
                      <figure className={`${styles.img}`}>
                        <Image
                          src={`http://localhost:3005/productImg/cover/${p.img_cover}`}
                          width={250}
                          height={407}
                          alt={p.name}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`${styles.weeklySelect} ${styles.bottom}`}>
          <Image src={WeeklySelect} className={styles.img} />
          <Image src={WeeklySelect} className={styles.img} />
        </div>
      </section>
      <section className="sec3 container pt-5 pb-3">
        <h4 className="text-white mb-2 d-flex justify-content-center fw-bold">
          特賣焦點
        </h4>
        <div className="container px-0 py-2 mb-3">
          <div className="row row-cols-2 row-cols-lg-5 g-0 g-lg-3">
            {products.slice(30, 40).map((p) => {
              return (
                <div
                  key={p.id}
                  className="col"
                  onClick={() => {
                    historyRecord(p)
                  }}
                >
                  <div
                    onClick={() => {
                      router.push(`/products/${p.id}`)
                    }}
                    className={styles.link}
                  >
                    <ProductCard
                      className="p-5"
                      id={p.id}
                      name={p.name}
                      price={p.price}
                      display_price={p.display_price}
                      releaseTime={p.release_time.split('T')[0]}
                      img_cover={p.img_cover}
                      img_details={p.img_details}
                      type={p.type_id}
                      ratingId={p.rating_id}
                      fav={p.fav}
                      addFav={addFav}
                      handleToggleFav={handleToggleFav}
                      member_id={p.member_id}
                      cardIcon={cardIcon}
                      product_quanty={p.product_quanty}
                      language={p.language}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="container sec4 mb-4 pb-3 mt-3">
        <h4 className="text-white mb-3 d-flex justify-content-center fw-bold ">
          商品分類
        </h4>
      </section>
      <TypeSwiper />
      <div className="mb-md-5 mb-4"></div>
      <section className={`sec5 pt-md-5 pb-md-5 pb-3 pt-3 ${estyles.eventBox}`}>
        <div className="container px-md-0 px-4">
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-md-6">
              <h4 className="d-none d-md-block mt-5 mb-4 text-light fw-bold">
                ARTICLE / 精選文章
              </h4>
              <h4 className="d-block d-md-none text-light text-center mb-4 fw-bold">
                ARTICLE / 精選文章
              </h4>
              {hot.slice(0, 4).map((h) => {
                return (
                  <div className={`${style.hot_main} mb-3`}>
                    <div className={`${style.hot_main_img} col-4`}>
                      <Link href={`/article/${h.ai_id}`}>
                        <img
                          src={`/images/article/${h.article_img}`}
                          alt={h.article_img}
                        />
                      </Link>
                    </div>
                    <div className={`${style.time} col-8`}>
                      <div className="d-flex justify-content-between pb-2 ">
                        <div className={`btn btn-danger ${style.custom_btn}`}>
                          Hot
                        </div>
                        <p className="text-light d-flex align-items-center">
                          {h.article_time}
                        </p>
                      </div>
                      <Link href={`/article/${h.ai_id}`} className={style.a}>
                        <h6>{h.article_title}</h6>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="col-12 col-md-6">
              <div className={`${estyles.calender} mb-3`}>
                <h4 className="mb-2 text-light d-none d-md-block fw-bold">
                  EVENT / 本月優惠活動
                </h4>
                <h4 className="mb-2 text-light text-center d-block d-md-none fw-bold">
                  EVENT / 本月優惠活動
                </h4>
                <div className="d-flex align-items-center justify-content-md-start justify-content-center mb-md-4 mb-3">
                  <div className={estyles.cirleToday}></div>
                  <h6 className="text-secondary ms-1">TODAY</h6>
                  <div className={`${estyles.cirleSelectDate} ms-3`}></div>
                  <h6 className="text-secondary ms-1">SELECT DATE</h6>
                </div>
                <h6 className="text-white d-none" id="yearAndMonth">{`${
                  now.y
                }/${now.m}/${myDate ? myDate : ''}`}</h6>
                <table className={`align-middle ${estyles.tablestyle}`}>
                  <thead id="title">
                    <tr className={estyles.calenderHead}>
                      {weekDayList.map(function (v, i) {
                        return (
                          <th key={i} className="py-4 text-center">
                            {v}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody id="data">
                    {allData.map((v, i) => {
                      return (
                        <tr key={i}>
                          {v.map((item, idx) => (
                            <td
                              key={idx}
                              onClick={() => {
                                if (item) setMyDate(item)
                                setIsModalOpen(true)
                              }}
                              className={`${
                                now.d === item
                                  ? estyles.today
                                  : estyles.otherday
                              } ${myDate === item ? estyles.chosenDate : ''} ${
                                estyles.tableCell
                              }`}
                              style={{ cursor: 'pointer' }}
                              role="presentation"
                            >
                              <h5 className="d-none d-md-block">{item}</h5>
                              <h6 className="d-block d-md-none">{item}</h6>
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <Link href="./coupon" className="text-decoration-none">
                    <h5 className={`my-3 pe-4 ${estyles.moreLink}`}>
                      More event ...
                    </h5>
                  </Link>
                </div>
              </div>
            </div>
            {/* modal 放這裡 */}
            {isModalOpen && (
              <div
                id="calModal"
                className={`${estyles.modal} ${
                  isModalOpen ? estyles['modal-show'] : ''
                }`}
              >
                <span
                  style={{ cursor: 'pointer' }}
                  role="presentation"
                  className={estyles.close}
                  onClick={() => setIsModalOpen(false)}
                >
                  <IoCloseSharp className="mt-1" />
                </span>
                <div className={estyles.modalContent}>
                  <h2 className={`fw-bold d-none d-md-block`}>WEEKLY</h2>
                  <h2 className={`fw-bold mb-4 d-none d-md-block`}>CHOICE</h2>
                  <h4 className={`fw-bold d-block d-md-none mb-0`}>WEEKLY</h4>
                  <h4 className={`fw-bold mb-4 d-block d-md-none mt-0`}>
                    CHOICE
                  </h4>
                  <div className="d-flex flex-column">
                    {/* <div>
                  <h4 className='text-dark fw-bold mb-2'>本週限定</h4>
                  </div> */}
                    <div>
                      <h4 className="text-dark fw-bold d-none d-md-block">
                        迎接連假的多人遊戲
                      </h4>
                      <h5 className="text-dark fw-bold d-block d-md-none mb-2">
                        迎接連假的多人遊戲
                      </h5>
                      <div className="d-flex flex-column">
                        <Link href="http://localhost:3000/products/13">
                          <div className={`mb-3 ${estyles.eventPicks}`}>
                            <div className={estyles.image}>
                              <Image
                                src="./images/event/brain-academy.png"
                                alt="game-cover"
                                height={120}
                                width={120}
                                className={`${estyles.fit} ${estyles.position2}`}
                              />
                            </div>
                            {/* <h5>一起伸展大腦！</h5> */}
                          </div>
                        </Link>
                        <Link href="http://localhost:3000/products/25">
                          <div className={`mb-3 ${estyles.eventPicks}`}>
                            <div className={estyles.image}>
                              <Image
                                src="./images/event/wario.jpeg"
                                alt="game-cover"
                                height={120}
                                width={120}
                                className={estyles.fit}
                              />
                            </div>
                            {/* <h5>一起伸展大腦！</h5> */}
                          </div>
                        </Link>
                        <Link href="http://localhost:3000/products/14">
                          <div className={`mb-3 ${estyles.eventPicks}`}>
                            <div className={estyles.image}>
                              <Image
                                src="./images/event/hop-step-dance.webp"
                                alt="game-cover"
                                height={120}
                                width={120}
                                className={`${estyles.fit} ${estyles.position}`}
                              />
                            </div>
                            {/* <h5>一起伸展大腦！</h5> */}
                          </div>
                        </Link>
                      </div>
                    </div>
                    {/* <div>
                  <h4 className='text-dark fw-bold'>遊戲新上市</h4>
                  </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="py-md-5 pt-4 container">
        <div className="mb-md-4 mb-2">
          <h4 className="mb-3 mb-md-5 fw-bold text-light text-md-start text-center">
            SHOP / 精選賣家
          </h4>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            {shop && <ShopCardA avgRating={5} shopInfo={shop[0]} />}
            {shop && <ShopCardB avgRating={4} shopInfo={shop[1]} />}
            {shop && <ShopCardA avgRating={5} shopInfo={shop[2]} />}
            {shop && <ShopCardB avgRating={5} shopInfo={shop[3]} />}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
