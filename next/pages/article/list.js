import React from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import style from '@/styles/article/list.module.scss'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
export default function list() {
  return (
    <>
      <Navbar />
      <main className={style.main}>
        <div
          className={`container d-flex justify-content-between px-lg-5 ${style.tag_link}`}
        >
          <div className='align-items-center d-flex'>
            <Link href="index.html" className='text-decoration-none text-white' >首頁&gt;</Link>
            <Link href="list.html" className='text-decoration-none text-white'>熱門標籤</Link>
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
          <ul>
            <li>
              <div className={`${style.list} mt-5`}>
                <a href="article_main.html" className={`d-flex text-decoration-none text-white`}>
                  <div className={style.pic}>
                    <img src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000" alt="" />
                  </div>
                  <div className={`${style.txt} mx-4 p-3`}>
                    <div className= {`badge text-bg-secondary mb-3 ${style.tag_btn}`}>
                      <h5 className='mb-0'>冒險類</h5>
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
            <li>
              <div className={`${style.list} mt-5`}>
                <a href="article_main.html" className={`d-flex text-decoration-none text-white`}>
                  <div className={style.pic}>
                    <img src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000" alt="" />
                  </div>
                  <div className={`${style.txt} mx-4 p-3`}>
                    <div className= {`badge text-bg-secondary mb-3 ${style.tag_btn}`}>
                      <h5 className='mb-0'>冒險類</h5>
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
            <li>
              <div className={`${style.list} mt-5`}>
                <a href="article_main.html" className={`d-flex text-decoration-none text-white`}>
                  <div className={style.pic}>
                    <img src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000" alt="" />
                  </div>
                  <div className={`${style.txt} mx-4 p-3`}>
                    <div className= {`badge text-bg-secondary mb-3 ${style.tag_btn}`}>
                      <h5 className='mb-0'>冒險類</h5>
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
      </main>
      <Footer />
    </>
  )
}
