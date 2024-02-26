import React from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import style from '@/styles/article/article_main.module.scss'
import { FaSmileWink } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'
import { FaShareAlt } from 'react-icons/fa'
import Link from 'next/link'

export default function article_main() {
  return (
    <>
      <Navbar />
      <nav className={style.nav_main}>
        <div className="container px-lg-5">
          <h2 className="mt-3" style={{ color: 'white' }}>
            【TpGS 24】台灣團隊 SIGONO
            宣布與集英社遊戲共同開發《OPUS：心相吾山》
          </h2>
          <div className="d-flex justify-content-between mt-5">
            <div>
              <p>2024-01-15</p>
            </div>
            <div className="btn btn-primary  d-flex">
              <FaShareAlt className={style.share_icon} />
              Share
            </div>
          </div>
          <hr className={style.hr} />
          <div className={` d-flex`}>
            <Link
              href="list.html"
              className={`text-decaration-none btn btn-primary ${style.tag}`}
            >
              <p className={style.txt_p}>#集英社</p>
            </Link>
            <Link
              href="list.html"
              className={`text-decaration-none btn btn-primary ${style.tag}`}
            >
              <p className={style.txt_p}>#集英社</p>
            </Link>
            <Link
              href="list.html"
              className={`text-decaration-none btn btn-primary ${style.tag}`}
            >
              <p className={style.txt_p}>#集英社</p>
            </Link>
            <Link
              href="list.html"
              className={`text-decaration-none btn btn-primary ${style.tag}`}
            >
              <p className={style.txt_p}>#集英社</p>
            </Link>
          </div>
          <div className={style.txt}>
            <h6 className="text-white">
              台灣獨立遊戲開發團隊 SIGONO
              今（15）日宣布將與集英社遊戲共同開發旗下研發中的新作《OPUS：心相吾山》，遊戲將於
              2024 台北國際電玩展展出。
              <br />
              <br />
              《OPUS：心相吾山》是一款劇情導向的多結局冒險故事，玩家將扮演迷失在幻境的主角，透過攝影去挖掘世界的種種謎團，最後找到回家的辦法。官方表示，團隊一貫重視本作的音樂音效，由《OPUS》系列作曲家
              Triodust、質地有聲製樂所共同操刀；而在遊戲劇情部分由《OPUS：龍脈常歌》編劇、美國獨立遊戲節（Independent
              Games Festival）敘事大獎榮譽提名劇本家 Brian Lee 執筆。
            </h6>
            <img
              src="https://p2.bahamut.com.tw/B/2KU/27/a0ba19cb973bccb43c19287bd91oknj5.PNG?w=1000"
              alt=""
              className="mt-3"
            />
            <h6 className="pt-4 pb-3 text-white">
              今日，SIGONO 宣布將與集英社遊戲共同開發《OPUS：心相吾山》。SIGONO
              的遊戲製作人 Brian
              表示：「集英社對我的童年和青少年時期有著深遠的影響，我一直是他們的忠實粉絲。當我聽到集英社遊戲部門的成立，我非常激動。希望透過這次合作，把
              OPUS 品牌推向全新的境界。」 「很高興能夠宣布與 SIGONO
              建立合作夥伴的關係！自從去年開始，我們就一直在幕後與 SIGONO
              討論這項共同開發的事宜。 我相信結合 SIGONO
              優秀的敘事能力和我們公司的力量能夠產生強大的化學反應。遊戲還需要一段時間才能與大家見面，但請期待更多的消息！」集英社遊戲製作人小林更補充：「偷偷跟你說，當我聽完故事大綱以後我差點哭出來了。」
            </h6>
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
              <div className="d-flex justify-content-between p-4">
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
