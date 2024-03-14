import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import style from '@/styles/article/article_main.module.scss'
import { FaSmileWink } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'
import { FaShareAlt } from 'react-icons/fa'
import Link from 'next/link'

export default function article_main() {
  const [article, setArticle] = useState([]);
  const router = useRouter()

  const getArticle = async (aid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/article/${aid}`);
      const data = await res.json();
      setArticle(data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      const { aid } = router.query
      getArticle(aid)
    }
  }, [router.isReady, router.query])

  return (
    <>
      <Navbar />
      <nav className={style.nav_main}>
        <div className="container px-lg-5">
          {article.map((a) => {
            return (
              <h2 className="mt-4" style={{ color: 'white' }}>
                {a.article_title}
              </h2>
            )
          })}
          <div className="d-flex justify-content-between mt-5">
            {article.map((a) => {
              return (
                <div className="d-flex align-items-center">
                  <p>{a.article_time}</p>
                </div>
              )
            })}
            <div className="btn btn-primary  d-flex">
              <FaShareAlt className={style.share_icon} />
              Share
            </div>
          </div>
          <hr className={style.hr} />
          <div className={` d-flex flex-wrap gap-2`}>
            {article.map((a) => {
              return (
                <Link
                  href="list.html"
                  className={`text-decaration-none btn btn-primary ${style.tag}`}
                >
                  <p className={style.txt_p}>#{a.name}</p>
                </Link>
              )
            })}
          </div>
          <div className={style.txt}>
            {article.map((a) => {
              return (
                <>
                  <h6 className="text-white">
                    {a.article_p1}
                  </h6>
                  <img
                    src={`/images/article/${a.article_img}`}
                    alt={a.article_img}
                    className="mt-3"
                  />
                  <h6 className="pt-4 pb-3 text-white">
                    {a.article_p2}
                  </h6>
                </>
              )
            })}

            <h6 className="pt-2 text-white">顯示所有留言...</h6>
            <div className={`${style.comment} pt-3`}>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <div className={style.avatar}>
                    <img
                      src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                      alt=""
                    />
                  </div>
                  <div className={style.member_name}>
                    <h6>張***</h6>
                    <p>July 22,2023</p>
                  </div>
                </div>
                <div className={style.edit}>
                  <FaRegEdit className={style.edit_icon} />
                </div>
              </div>
              <div
                className={`d-flex justify-content-between pt-3 ${style.txt_area}`}
              >
                <div className={style.hi}>
                  <h6 style={{ color: 'white' }}>簡直跟新的一樣!!!!</h6>
                </div>
                <button className={`btn btn-light ${style.edit_heart}`}>
                  <FaSmileWink />
                </button>
              </div>
            </div>
            <div className={`${style.comment} pt-3`}>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <div className={style.avatar}>
                    <img
                      src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                      alt=""
                    />
                  </div>
                  <div className={style.member_name}>
                    <h6>張***</h6>
                    <p>July 22,2023</p>
                  </div>
                </div>
                <div className={style.edit}>
                  <i className="bi bi-pencil-square edit-icon" />
                </div>
              </div>
              <div className="d-flex justify-content-between pt-3 txt-area">
                <div className={style.hi}>
                  <h6 style={{ color: 'white' }}>簡直跟新的一樣!!!!</h6>
                </div>
                <button className="btn btn-light edit-heart">
                  <i className="bi bi-heart-fill" />
                </button>
              </div>
            </div>
            <div className={`${style.comment} pt-3`}>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <div className={style.avatar}>
                    <img
                      src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                      alt=""
                    />
                  </div>
                  <div className={style.member_name}>
                    <h6>張***</h6>
                    <p>July 22,2023</p>
                  </div>
                </div>
                <div className={style.edit}>
                  <i className="bi bi-pencil-square edit-icon" />
                </div>
              </div>
              <div className="d-flex justify-content-between pt-3 txt-area">
                <div className={style.hi}>
                  <h6 style={{ color: 'white' }}>簡直跟新的一樣!!!!</h6>
                </div>
                <button className="btn btn-light edit-heart">
                  <i className="bi bi-heart-fill" />
                </button>
              </div>
            </div>
            <form action="">
              <div
                className={`d-flex justify-content-between pt-4 ${style.submit}`}
              >
                <input
                  type="text"
                  placeholder="發表文字...限50字"
                  className={style.comment_area}
                />
                <button className="btn btn-danger">送出</button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <Footer />
    </>
  )
}
