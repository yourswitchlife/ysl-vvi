import React, { useState, useEffect, useRef } from 'react'
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
  const [comment, setComment] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [content, setContent] = useState({
    content: '',
  });
  const limitedComments = showAll ? comment : comment.slice(0, 3);
  const formRef = useRef(null);
  useEffect(() => {
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 发送评论数据到后端API
      const res = await fetch('http://localhost:3005/api/article/comment/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.content,

        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data) {
        setContent(data);
        setContent({ content: '' }); // 清空评论输入框
        console.log(data);
      }

      // 处理响应...
      console.log('Comment submitted successfully!');

      window.location.reload();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const router = useRouter()

  const [emo, setEmo] = useState([]);

  const handleClick = async () => {
    try {
      const newEmo = emo === 1 ? 0 : 1;

      const res = await fetch(`http://localhost:3005/api/article/${aid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emo: newEmo }),
      });
      console.log(newEmo);


      if (res.ok) {
        setEmo(newEmo);
      } else {
        console.error('Failed to update emo value in database');
      }
    } catch (error) {
      console.error('Error updating emo value:', error);
    }
  };
  console.log(content.content);




  const getArticle = async (aid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/article/${aid}`);
      const data = await res.json();
      setArticle(data.article);
      setComment(data.comment);

      console.log(data.comment);
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
            {limitedComments.length >= 3 ? (
              <button onClick={toggleShowAll} className='btn btn-outline-danger m-1'>
                <h6 className="text-white">顯示所有留言...</h6>
              </button>
            ) : (
              <h3 className="text-danger d-flex justify-content-center">快來留言吧!!</h3>
            )}

            {limitedComments.map((c, i) => {
              return (
                <div className={`${style.comment} pt-3`} key={i}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                      <div className={style.avatar}>
                        <img
                          src={`images/profile-photo/${c.pic}`}
                          alt=""
                        />
                      </div>
                      <div className={style.member_name}>
                        <h6>{c.name}</h6>
                        <p>{c.create_at}</p>
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
                      <h6 style={{ color: 'white' }}>{c.content}</h6>
                    </div>
                    <button className={`btn btn-light ${style.edit_heart}`} onClick={handleClick}>
                      {limitedComments.emo === 1 ? <FaSmileWink className='text-warning' /> : <FaSmileWink />}
                    </button>
                  </div>
                </div>
              )
            })}
            <div ref={formRef}>
              <form onSubmit={handleSubmit}>
                <div
                  className={`d-flex justify-content-between pt-4 ${style.submit}`}
                >
                  <input
                    id="content"
                    name="content"
                    value={content.content}
                    onChange={handleChange}
                    placeholder="發表文字...限50字"
                    className={style.comment_area}
                  />

                  <button className="btn btn-danger" type="submit">送出</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <Footer />
    </>
  )
}
