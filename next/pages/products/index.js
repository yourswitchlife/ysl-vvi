import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaBorderAll } from 'react-icons/fa'
import { IoReorderFour } from 'react-icons/io5'
import ProductCard from '@/components/products/product-card'
import BreadCrumb from '@/components/common/breadcrumb'
import Pagination from '@/components/common/pagination'
import BtnOutline from '@/components/products/btn-outline'
import Link from 'next/link'
// import { Link } from 'react-router-dom'
import styles from '../../styles/products/products.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import data from '@/data/product.json'

export default function Products() {
  
  // const demoProducts = [
  //   {
  //     id: '1',
  //     type_id: '2',
  //     name: '探靈直播',
  //     product_quanty: '1',
  //     fav: 'true',
  //     display_price: '1090',
  //     price: '981',
  //     img_cover: 'Livestream.jpg',
  //     img_1: 'Livestream-0.jpg',
  //     img_2: 'Livestream-1.jpg',
  //     img_3: 'Livestream-2.jpg',
  //     release_time: '2021-12-16',
  //     language: '[CH,JP]',
  //     rating_id: '3',
  //     co_op_valid: '0',
  //     description:
  //       '故事描述在櫻井的提案下，身為實況主的生駒、櫻井和白石三人 前往知名恐怖景點「伊邪那美酒店」拍攝些鬼影幢幢的影片。 原本她們只是想渲染些特效， 能夠平安無事地結束拍攝就好，沒想到…… 在攝影期間，走散的生駒被突如其來的人偶給襲擊， 之後一直徘徊在酒店裡的三人數度遭受威脅。 為何人偶不斷襲擊三人，又為何始終會走不出酒店呢？ 究竟三人能否平安無事地逃離酒店呢？ 在廢棄酒店裡的直播即將開始…… <遊戲概要> 本作為解謎脫逃之冒險遊戲。角色人物需逃離殺人玩偶的魔掌， 並在廢棄酒店裡尋找相關逃脫之線索。 玩家的每個決定都將影響她們的生死。 <系統> ■ 躲藏並逃離人偶吧！ 在廢棄酒店裡到處探險時，一身血漬拿著斧頭的人偶， 開始追著直播的三人！ 當遇到人偶時，必須要趕緊逃開、或是藏身避開人偶的追擊。 要是被一刀給劈下，必死無疑。（遊戲結束） ■ 這是詛咒！？ 直播的女孩們面臨到危及生命的生存危機！ 在廢棄酒店中將面臨各種危機。 調查周遭以獲得相關的線索，善用道具化解生存的危機。 你甚至可以在她們最危機的時刻， 伸手觸碰她們……這難道也是種詛咒！？ ■ 善用提示和道具，這些將能協助找到逃脫的線索！ 在廢棄酒店內尋找各項道具和提示。 搜索房間內的各個角落，以獲得相關的提示。 這將大大改變這些女孩們的命運…… ※ 《探靈直播》中不支援觸控螢幕功能。',
  //     member_id: '1',
  //     valid: '1',
  //     launch_valid: '1',
  //     created_at: '2023-09-08 10:09:00.000000',
  //   },
  // ]
  // console.log(products)
  const initState = data.map((p) => {
    return { ...p, fav: false }
  })
  const [products, setProducts] = useState(initState)
  // console.log(initState)
  const handleToggleFav = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) return { ...p, fav: !p.fav }
      else return p
    })
    setProducts(newProducts)
  }

  return (
    <>
      <Navbar />
      <Image
        src="/images/product/p-index.jpg"
        alt="product"
        width={1440}
        height={560}
        priority={true}
        className={`${styles.pIndexImg}`}
      />
      <PhoneTabNav />

      <div
        className={`${styles.pTitle} z-2 position-absolute d-lg-grid d-none`}
      >
        <div className="p-slogan">
          <h4 className="text-white">Enjoy Your Switch Life!</h4>
          <h1 className="text-white">
            盡情挑選
            <br />
            喜歡的
            <br />
            遊戲
          </h1>
        </div>
      </div>
      <div className="container pt-3 px-lg-5 px-4">
        <BreadCrumb />
        <div className="d-flex justify-content-between mb-3">
          <BtnOutline></BtnOutline>
          <div>
            <FaBorderAll className="text-white me-2 h5" />
            <IoReorderFour className="text-white h4 mb-0" />
          </div>
        </div>
        <div className="container px-0 py-2 mb-3">
          <div className="row row-cols-2 row-cols-lg-5 g-0 g-lg-3">
            {products.map((p) => {
              return (
                
                <div  key={p.id} className="col">
                  <ProductCard
                    className="p-5"
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    displayPrice={p.display_price}
                    releaseTime={p.release_time}
                    cover={p.img_cover}
                    type={p.type_id}
                    ratingId={p.rating_id}
                    fav={p.fav}
                    handleToggleFav={handleToggleFav}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <Pagination />

        <div>
          <h4 className="text-white mx-3 ">猜你喜歡</h4>
          <div className={`px-0 py-2 ${styles.guessLike}`}>
            <ProductCard className="" />
            <ProductCard className="" />
            <ProductCard className="" />
            <ProductCard className="" />
            <ProductCard className="" />
          </div>

          <Link
            href=""
            className={`d-block mt-2 text-end more h6 text-white ${styles.more}`}
          >
            看更多...
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
