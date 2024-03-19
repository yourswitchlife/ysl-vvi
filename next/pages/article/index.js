import React, { useState, useEffect } from 'react'
import style from '@/styles/article/index.module.scss'
import Footer from '@/components/layout/footer/footer-front'
import Navbar from '@/components/layout/navbar/navbar'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import Slider from 'react-slick'
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import settings from '../article/setting'


export default function index() {

  const [article, setArticle] = useState([])
  const [article2, setArticle2] = useState([])
  const [article3, setArticle3] = useState([])
  const [article4, setArticle4] = useState([])
  const [title, setTitle] = useState([])
  const [more, setMore] = useState([])
  const [hot, setHot] = useState([])

  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim() !== '') {
      const url = `/article/list/${encodeURIComponent(searchKeyword)}`;
      router.push(url);
    }
  };

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };


  const getArticle = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/article')
      const data = await res.json()

      if (data) {
        setArticle(data.article)
        setArticle2(data.article2)
        setArticle3(data.article3)
        setArticle4(data.article4)
        setTitle(data.title)
        setMore(data.more)
        setHot(data.hot)

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
      <Navbar />
      <div className='container'>
        <Slider {...settings} className={`${style.test} test`}>
          {title.map((t) => {
            return (<Link href={`/article/${t.ai_id}`} >
              <div className={style.card2}>
                <img
                  src={`images/article/${t.article_img}`}
                  alt={t.article_img}
                />
                <div className={style.text3}>
                  <h2 className={style.bannerTitle}>
                    {t.article_title}
                  </h2>
                </div>
              </div>
            </Link>)
          })}
        </Slider>
      </div>
      <main>
        <div
          className={`${style.main_media} container px-lg-5 d-flex justify-content-center`}
        >
          <div className={style.left_main}>
            <div className="mb-4">
              <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <button className={`btn btn-primary ${style.search_btn}`} type="submit">
                  <FaSearch />
                </button>
                <input
                  className={`form-control ${style.search_form}`}
                  type="search"
                  placeholder="搜尋文章"
                  aria-label="Search"
                  value={searchKeyword}
                  onChange={handleChange}
                />
              </form>
            </div>
            <h3 className={`text-white ${style.h3}`}>最新文章</h3>
            <div className={style.swtich}>
              <div className='container nav nav-tabs nav-justified'>
                <button className='nav-link active' data-bs-toggle="tab" data-bs-target="#menu1" aria-selected="true">
                  冒險類
                </button>
                <button className='nav-link' data-bs-toggle="tab" data-bs-target="#menu2" aria-selected="true">
                  動作類
                </button>
                <button className='nav-link' data-bs-toggle="tab" data-bs-target="#menu3" aria-selected="true">
                  策略類
                </button>
                <button className='nav-link' data-bs-toggle="tab" data-bs-target="#menu4" aria-selected="true">
                  休閒類
                </button>
              </div>
            </div>
            <div className='tab-content'>
              <div className='tab-pane fade show active' id='menu1'>
                {article.map((a) => {
                  return (
                    <div className={` ${style.hot_main}`}  >
                      <div className={style.hot_main_img}>
                        <Link href={`/article/${a.ai_id}`}>
                          <img
                            src={`images/article/${a.article_img}`}
                            alt={a.article_img}
                          />
                        </Link>
                      </div>
                      <div className={style.time}>
                        <div className="d-flex justify-content-between ">
                          <div
                            className={`btn btn-outline-primary ${style.custom_btn}`}
                          >
                            NEW
                          </div>
                          <p className="text-white d-flex align-items-center">
                            {a.article_time}
                          </p>
                        </div>
                        <Link href={`/article/${a.ai_id}`} className={style.a}>
                          <p className='mt-2'>
                            {a.article_title}
                          </p>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='tab-pane fade show ' id='menu2'>
                {article2.map((a) => {
                  return (
                    <div className={`${style.hot_main}`}  >
                      <div className={style.hot_main_img}>
                        <Link href={`/article/${a.ai_id}`}>
                          <img
                            src={`images/article/${a.article_img}`}
                            alt={a.article_img}
                          />
                        </Link>
                      </div>
                      <div className={style.time}>
                        <div className="d-flex justify-content-between ">
                          <div
                            className={`btn btn-outline-primary ${style.custom_btn}`}
                          >
                            NEW
                          </div>
                          <p className="text-white d-flex align-items-center">
                            {a.article_time}
                          </p>
                        </div>
                        <Link href={`/article/${a.ai_id}`} className={style.a}>
                          <p className='mt-2'>
                            {a.article_title}
                          </p>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='tab-pane fade show ' id='menu3'>
                {article3.map((a) => {
                  return (
                    <div className={`${style.hot_main}`}  >
                      <div className={style.hot_main_img}>
                        <Link href={`/article/${a.ai_id}`}>
                          <img
                            src={`images/article/${a.article_img}`}
                            alt={a.article_img}
                          />
                        </Link>
                      </div>
                      <div className={style.time}>
                        <div className="d-flex justify-content-between ">
                          <div
                            className={`btn btn-outline-primary ${style.custom_btn}`}
                          >
                            NEW
                          </div>
                          <p className="text-white d-flex align-items-center">
                            {a.article_time}
                          </p>
                        </div>
                        <Link href={`/article/${a.ai_id}`} className={style.a}>
                          <p className='mt-2'>
                            {a.article_title}
                          </p>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='tab-pane fade show ' id='menu4'>
                {article4.map((a) => {
                  return (
                    <div className={`${style.hot_main}`}  >
                      <div className={style.hot_main_img}>
                        <Link href={`/article/${a.ai_id}`}>
                          <img
                            src={`images/article/${a.article_img}`}
                            alt={a.article_img}
                          />
                        </Link>
                      </div>
                      <div className={style.time}>
                        <div className="d-flex justify-content-between ">
                          <div
                            className={`btn btn-outline-primary ${style.custom_btn}`}
                          >
                            NEW
                          </div>
                          <p className="text-white d-flex align-items-center">
                            {a.article_time}
                          </p>
                        </div>
                        <Link href={`/article/${a.ai_id}`} className={style.a}>
                          <p className='mt-2'>
                            {a.article_title}
                          </p>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={style.right_main}>
            <h3 className={`text-white mb-3 ${style.h3}`}>標籤列表</h3>
            <div className={style.tag}>
              <Link
                href="/article/list2"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #冒險類
              </Link>
              <Link
                href="/article/list3"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #動作類
              </Link>
              <Link
                href="/article/list4"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #策略類
              </Link>
              <Link
                href="/article/list5"
                className={`${style.tag_btn} btn btn-primary`}
              >
                #休閒類
              </Link>
            </div>
            <h3 className={`text-white mt-4 ${style.h3}`}>熱門話題</h3>
            {hot.map((h) => {
              return (
                <div className={style.hot_main}>
                  <div className={style.hot_main_img}>
                    <Link href={`/article/${h.ai_id}`}>
                      <img
                        src={`/images/article/${h.article_img}`}
                        alt={h.article_img}
                      />
                    </Link>
                  </div>
                  <div className={style.time}>
                    <div className="d-flex justify-content-between pb-2 ">
                      <div className={`btn btn-outline-danger ${style.custom_btn}`}>
                        Hot
                      </div>
                      <p className="text-white d-flex align-items-center">
                        {h.article_time}
                      </p>
                    </div>
                    <Link href={`/article/${h.ai_id}`} className={style.a}>
                      <p>
                        {h.article_title}
                      </p>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <section>
        <div className={`container px-5 ${style.more_main}`}>
          <h5 className="mt-5 " style={{ color: 'white' }}>
            查看更多...
          </h5>
          <div className={`${style.more} pt-3 pb-3`}>
            {more.map((m) => {
              return (
                <Link href={`/article/${m.ai_id}`}>
                  <div className={style.card} >
                    <img
                      src={`images/article/${m.article_img}`}
                      alt={m.article_img}
                    />
                    <div className={style.text2}>
                      <p className={style.bannerTitle}>
                        {m.article_title}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
