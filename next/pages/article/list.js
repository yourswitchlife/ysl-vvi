import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import style from '@/styles/article/list.module.scss'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import Pagination from 'react-bootstrap/Pagination'
export default function list() {
  const [article, setArticle] = useState([])

  const getArticle = async () => {
    try{
      const res = await fetch ('http://localhost:3005/api/article/list')
      const data = await res.json()
      console.log(data)

      if(Array.isArray(data)){
        setArticle(data)
      }
    }catch (e){
      console.error(e)
    }
  }
  useEffect(()=>{
    getArticle()
  },[])

  return (
    <>
      <Navbar />
      <main className={style.main}>
        <div
          className={`container d-flex justify-content-between px-lg-5 ${style.tag_link}`}
        >
          <div className={`align-items-center d-flex ${style.index_padding}`}>
            <Link href="index.html" className="text-decoration-none text-white">
              首頁&gt;
            </Link>
            <Link href="list.html" className="text-decoration-none text-white">
              熱門標籤
            </Link>
          </div>
          <div className="search">
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
        </div>
        <div className="container">
          <ul className={style.ul}>
            {article.map((a) => {
              return (
                <li className={style.li}>
              <div className={`${style.list} mt-5`}>
                <Link
                  href=""
                  className={`d-flex text-decoration-none text-white ${style.li}`}
                >
                  <div className={style.pic}>
                    <img
                      src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                      alt=""
                    />
                  </div>
                  <div className={`${style.txt} mx-4 p-3`}>
                    <div
                      className={`badge text-bg-secondary mb-3 ${style.tag_btn}`}
                    >
                      <h5 className={`${style.h5} mb-0`}>冒險類{a.id}</h5>
                    </div>
                    <div>
                      <h6>
                        《OPUS：心相吾山》是一款劇情導向的多結局冒險故事，玩家將扮演迷失在幻境的主角，透過攝影去挖掘世界的種種謎團，最後找到回家的辦法。官方表示，團隊一貫重視本作的音樂音效，由《OPUS》系列作曲家
                        Triodust、質地有聲製樂所共同操刀；而在遊戲劇情部分由《OPUS：龍脈常歌》編劇、美國獨立遊戲節（Independent
                        Games Festival）敘事大獎榮譽提名劇本家 Brian Lee 執筆。
                      </h6>
                    </div>
                    <div>
                      <p>2024/1/18</p>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
              )
            })}
            <li className={style.li}>
              <div className={`${style.list} mt-5`}>
                <Link
                  href=""
                  className={`d-flex text-decoration-none text-white ${style.li}`}
                >
                  <div className={style.pic}>
                    <img
                      src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                      alt=""
                    />
                  </div>
                  <div className={`${style.txt} mx-4 p-3`}>
                    <div
                      className={`badge text-bg-secondary mb-3 ${style.tag_btn}`}
                    >
                      <h5 className={`${style.h5} mb-0`}>冒險類</h5>
                    </div>
                    <div>
                      <h6>
                        《OPUS：心相吾山》是一款劇情導向的多結局冒險故事，玩家將扮演迷失在幻境的主角，透過攝影去挖掘世界的種種謎團，最後找到回家的辦法。官方表示，團隊一貫重視本作的音樂音效，由《OPUS》系列作曲家
                        Triodust、質地有聲製樂所共同操刀；而在遊戲劇情部分由《OPUS：龍脈常歌》編劇、美國獨立遊戲節（Independent
                        Games Festival）敘事大獎榮譽提名劇本家 Brian Lee 執筆。
                      </h6>
                    </div>
                    <div>
                      <p>2024/1/18</p>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
            <li className={style.li}>
              <div className={`${style.list} mt-5`}>
                <a
                  href="article_main.html"
                  className={`d-flex text-decoration-none text-white ${style.li}`}
                >
                  <div className={style.pic}>
                    <img
                      src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                      alt=""
                    />
                  </div>
                  <div className={`${style.txt} mx-4 p-3`}>
                    <div
                      className={`badge text-bg-secondary mb-3 ${style.tag_btn}`}
                    >
                      <h5 className={`${style.h5} mb-0`}>冒險類</h5>
                    </div>
                    <div>
                      <h6>
                        《OPUS：心相吾山》是一款劇情導向的多結局冒險故事，玩家將扮演迷失在幻境的主角，透過攝影去挖掘世界的種種謎團，最後找到回家的辦法。官方表示，團隊一貫重視本作的音樂音效，由《OPUS》系列作曲家
                        Triodust、質地有聲製樂所共同操刀；而在遊戲劇情部分由《OPUS：龍脈常歌》編劇、美國獨立遊戲節（Independent
                        Games Festival）敘事大獎榮譽提名劇本家 Brian Lee 執筆。
                      </h6>
                    </div>
                    <div>
                      <p>2024/1/18</p>
                    </div>
                  </div>
                </a>
              </div>
            </li>
            <li className={style.li}>
              <div className={`${style.list} mt-5`}>
                <a
                  href="article_main.html"
                  className={`d-flex text-decoration-none text-white ${style.li}`}
                >
                  <div className={style.pic}>
                    <img
                      src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
                      alt=""
                    />
                  </div>
                  <div className={`${style.txt} mx-4 p-3`}>
                    <div
                      className={`badge text-bg-secondary mb-3 ${style.tag_btn}`}
                    >
                      <h5 className={`${style.h5} mb-0`}>冒險類</h5>
                    </div>
                    <div>
                      <h6>
                        《OPUS：心相吾山》是一款劇情導向的多結局冒險故事，玩家將扮演迷失在幻境的主角，透過攝影去挖掘世界的種種謎團，最後找到回家的辦法。官方表示，團隊一貫重視本作的音樂音效，由《OPUS》系列作曲家
                        Triodust、質地有聲製樂所共同操刀；而在遊戲劇情部分由《OPUS：龍脈常歌》編劇、美國獨立遊戲節（Independent
                        Games Festival）敘事大獎榮譽提名劇本家 Brian Lee 執筆。
                      </h6>
                    </div>
                    <div>
                      <p>2024/1/18</p>
                    </div>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <Pagination className="justify-content-center mt-3 pt-3">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </main>
      <Footer />
    </>
  )
}
