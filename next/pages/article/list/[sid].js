import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import { useRouter } from 'next/router'
import Footer from '@/components/layout/footer/footer-front'
import style from '@/styles/article/list.module.scss'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import Pagination from 'react-bootstrap/Pagination'
import { Button, Col, Row, Toast, } from 'react-bootstrap';
export default function list() {

  const [article, setArticle] = useState([]);
  const router = useRouter()


  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [showB, setShowB] = useState(false);
  const toggleShowB = () => setShowB(!showB);

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

  const getArticle = async (sid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/article/list/${sid}`);
      const data = await res.json();
      setArticle(data);
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      const { sid } = router.query
      getArticle(sid)
    }
  }, [router.isReady, router.query])

  // useEffect(() => {
  //   fetchArticle();
  // }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticle = article.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <Navbar />
      <main className={style.main}>
        <div
          className={`container d-flex justify-content-between px-lg-5 ${style.tag_link}`}
        >
          <div className={`  ${style.index_padding}`}>
            <div>
              <Link href="/article" className="text-decoration-none text-white">
                首頁&gt;
              </Link>
            </div>
            <div className='pt-2 align-items-center d-flex'>
            <Row className={`${style.fdc}`}>
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
                            冒險類
                          </div>
                        </Link>
                      </div>
                      <div>
                        <Link href="/article/list3" className="text-decoration-none text-white">
                          <div className={style.ttt2}>
                            動作類
                          </div>
                        </Link>
                      </div>
                      <div>
                        <Link href="/article/list4" className="text-decoration-none text-white">
                          <div className={style.ttt2}>
                            策略類
                          </div>
                        </Link>
                      </div>
                      <div>
                        <Link href="/article/list5" className="text-decoration-none text-white">
                          <div className={style.ttt2}>
                            休閒類
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Toast.Body>
                </Toast>
              </Col>
            </Row>
          </div>
          </div>
          <div className='d-flex justify-content-center'>
          
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
        </div>
        <div className="container">
          <ul className={style.ul}>
            {currentArticle.map((a, i) => {
              return (
                <li className={style.li} >
                  <div className={`${style.list} mt-5`}>
                    <Link
                      href={`/article/${a.ai_id}`}
                      className={`d-flex text-decoration-none text-white ${style.li}`}
                    >
                      <div className={style.pic}>
                        <img
                          src={`/images/article/${a.article_img}`}
                          alt={a.article_img}
                        />

                      </div>
                      <div className={`${style.txt} mx-4 p-3`}>
                        <div>
                          <div
                            className={`badge text-bg-secondary mb-3 ${style.tag_btn}`}
                          >
                            <h5 className={`${style.h5} mb-0`}>{a.name}</h5>
                          </div>
                        </div>
                        <div>
                          <h4>
                            {a.article_title}
                          </h4>
                        </div>
                        <div>
                          <p className='d-flex justify-content-end'>{a.article_time}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <Pagination className="justify-content-center mt-3 pt-3">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(article.length / articlesPerPage)).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(article.length / articlesPerPage)}
          />
          <Pagination.Last onClick={() => handlePageChange(Math.ceil(article.length / articlesPerPage))} />
        </Pagination>
      </main>
      <Footer />
    </>
  )
}
