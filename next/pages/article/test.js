import React, { useState } from 'react';
import { Button, Col, Row, Toast, } from 'react-bootstrap';
import style from '@/styles/article/index.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import { FaSearch } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import settings from '../article/setting'
import Link from 'next/link'

// import data from '@/public/images/card'

export default function index() {
  // const initState = data.map((v, i) => {
  //   return { ...v, fav: false }
  // })

  // const [article, setArticle] = useState(initState)
  const [showB, setShowB] = useState(true);
  const toggleShowB = () => setShowB(!showB);


  return (
    <>
      <Navbar />
      <Slider {...settings} className={`${style.test} test`}>
        <a href="article_main.html">
          <div className={style.card2}>
            <img
              src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
              alt=""
            />
            <div className={style.text3}>
              <h2 className={style.bannerTitle}>
                《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
              </h2>
            </div>
          </div>
        </a>
        <a href="article_main.html">
          <div className={style.card2}>
            <img
              src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
              alt=""
            />
            <div className={style.text3}>
              <h2 className={style.bannerTitle}>
                《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
              </h2>
            </div>
          </div>
        </a>
        <a href="article_main.html">
          <div className={style.card2}>
            <img
              src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
              alt=""
            />
            <div className={style.text3}>
              <h2 className={style.bannerTitle}>
                《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
              </h2>
            </div>
          </div>
        </a>
        <a href="article_main.html">
          <div className={style.card2}>
            <img
              src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
              alt=""
            />
            <div className={style.text3}>
              <h2 className={style.bannerTitle}>
                《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
              </h2>
            </div>
          </div>
        </a>
        <a href="article_main.html">
          <div className={style.card2}>
            <img
              src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
              alt=""
            />
            <div className={style.text3}>
              <h2 className={style.bannerTitle}>
                《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
              </h2>
            </div>
          </div>
        </a>
        <a href="article_main.html">
          <div className={style.card2}>
            <img
              src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
              alt=""
            />
            <div className={style.text3}>
              <h2 className={style.bannerTitle}>
                《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
              </h2>
            </div>
          </div>
        </a>
      </Slider>
      <div className='container'>
        <Row>
          <Col md={6} className="mb-2">
            <Button onClick={toggleShowB} className={`${style.btnn} mb-2`}>
              分類列表
            </Button>
            <Toast onClose={toggleShowB} show={showB} animation={false} bg="dark" className={style.ttt} >
              <Toast.Body className='p-0'>
                <div >
                  <div >
                    <Link href="/article/list2" className="text-decoration-none text-white">
                      <div className={style.ttt2}>
                        動作類
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="/article/list3" className="text-decoration-none text-white">
                      <div className={style.ttt2}>
                        冒險類
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="/article/list4" className="text-decoration-none text-white">
                      <div className={style.ttt2}>
                        休閒類
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href="/article/list5" className="text-decoration-none text-white">
                      <div className={style.ttt2}>
                        策略類
                      </div>
                    </Link>
                  </div>
                </div>
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </div>
      <main>
        <div
          className={`${style.main_media} container px-lg-5 d-flex justify-content-center`}
        >
          <div className={style.left_main}>
            <div className="mb-4">
              <form className="d-flex" role="search">
                <button
                  className={`btn btn-primary ${style.search_btn}`}
                  type="submit"
                >
                  <FaSearch />
                </button>
                <input
                  className={`form-control ${style.search_form}`}
                  type="search"
                  placeholder="搜尋文章"
                  aria-label="Search"
                />
              </form>
            </div>
            <h3 className={`text-white ${style.h3}`}>最新文章</h3>
            <div className={style.swtich}>
              <li>冒險類</li>
              <li>動作類</li>
              <li>策略類</li>
              <li>休閒類</li>
            </div>
            <div className={style.hot_main}>
              <div className={style.hot_main_img}>
                <a href="article_main.html">
                  <img
                    src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                    alt=""
                  />
                </a>
              </div>
              <div className={style.time}>
                <div className="d-flex justify-content-between ">
                  <div
                    className={`btn btn-outline-primary ${style.custom_btn}`}
                  >
                    NEW
                  </div>
                  <p className="text-white d-flex align-items-center">
                    2024/2/11
                  </p>
                </div>
                <a href="article_main.html" className={style.a}>
                  <p>
                    台灣獨立遊戲開發團隊 SIGONO
                    今（15）日宣布將與集英社遊戲共同開發旗下研發中的新作《OPUS：心
                  </p>
                </a>
              </div>
            </div>
            <div className="hot_main">
              <div className="hot_main_img">
                <img src="/article_Title/05.webp" alt="" />
              </div>
              <div className="time">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-success custom-btn">
                    NEW
                  </button>
                  <p className="date">2024/2/11</p>
                </div>
                <p>wefwiehfowehfoweifwef</p>
              </div>
            </div>
            <div className="hot_main">
              <div className="hot_main_img">
                <img src="/article_Title/05.webp" alt="" />
              </div>
              <div className="time">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-success custom-btn">
                    NEW
                  </button>
                  <p className="date">2024/2/11</p>
                </div>
                <p>wefwiehfowehfoweifwef</p>
              </div>
            </div>
            <div className="hot_main">
              <div className="hot_main_img">
                <img src="/article_Title/05.webp" alt="" />
              </div>
              <div className="time">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-success custom-btn">
                    NEW
                  </button>
                  <p className="date">2024/2/11</p>
                </div>
                <p>wefwiehfowehfoweifwef</p>
              </div>
            </div>
          </div>
          <div className={style.right_main}>
            <h3 className={`text-white mb-3 ${style.h3}`}>熱門標籤</h3>
            <div className={style.tag}>
              <a
                href="list.html"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #集英社
              </a>
              <a
                href="list.html"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #集英社
              </a>
              <a
                href="list.html"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #集英社
              </a>
              <a
                href="list.html"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #集英社
              </a>
              <a
                href="list.html"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #集英社
              </a>
            </div>
            <h3 className={`text-white mt-4 ${style.h3}`}>熱門話題</h3>
            <div className={style.hot_main}>
              <div className={style.hot_main_img}>
                <a href="article_main.html">
                  <img
                    src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                    alt=""
                  />
                </a>
              </div>
              <div className={style.time}>
                <div className="d-flex justify-content-between ">
                  <div className={`btn btn-outline-danger ${style.custom_btn}`}>
                    Hot
                  </div>
                  <p className="text-white d-flex align-items-center">
                    2024/2/11
                  </p>
                </div>
                <a href="article_main.html" className={style.a}>
                  <p>
                    台灣獨立遊戲開發團隊 SIGONO
                    今（15）日宣布將與集英社遊戲共同開發旗下研發中的新作《OPUS：心
                  </p>
                </a>
              </div>
            </div>
            <div className="hot_main">
              <div className="hot_main_img">
                <img src="/article_Title/05.webp" alt="" />
              </div>
              <div className="time">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-danger custom-btn">
                    Hot
                  </button>
                  <p className="date">2024/2/11</p>
                </div>
                <p>wefwiehfowehfoweifwef</p>
              </div>
            </div>
            <div className="hot_main">
              <div className="hot_main_img">
                <img src="/article_Title/05.webp" alt="" />
              </div>
              <div className="time">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-danger custom-btn">
                    Hot
                  </button>
                  <p className="date">2024/2/11</p>
                </div>
                <p>wefwiehfowehfoweifwef</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section>
        <div className={`container px-5 ${style.more_main}`}>
          <h5 className="mt-5 " style={{ color: 'white' }}>
            查看更多...
          </h5>
          <div className={`${style.more} pt-3 pb-3`}>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
            <a href="article_main.html">
              <div className={style.card}>
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                  alt=""
                />
                <div className={style.text2}>
                  <p className={style.bannerTitle}>
                    《魔物獵人 Now》龍年好運到！獨家龍年活動邀玩家出門狩獵
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      <div className='container nav nav-tabs nav-justified'>
        <button className='nav-link active' data-bs-toggle="tab" data-bs-target="#menu1" aria-selected="true">
          冒險類
        </button>
        <button className='nav-link' data-bs-toggle="tab" data-bs-target="#menu2" aria-selected="true">
          動作類
        </button>
        <button className='nav-link' data-bs-toggle="tab" data-bs-target="#menu2" aria-selected="true">
          策略類
        </button>
        <button className='nav-link' data-bs-toggle="tab" data-bs-target="#menu2" aria-selected="true">
          休閒類
        </button>
      </div>
      <div className='tab-content'>
        <div className='tab-pane fade show active' id='menu1'>
          <p>
            sefhsefosefiuhseihsehfio
          </p>
        </div>
        <div className='tab-pane fade show active' id='menu2'>
          <h2>
            sefhsefosefiuhseihsehfio
          </h2>
        </div>
      </div>
      <Footer />
    </>
  )
}
