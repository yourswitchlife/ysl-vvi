import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-front'
import style from '@/styles/article/list.module.scss'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import Pagination from 'react-bootstrap/Pagination'
export default function list() {

  const [article, setArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);

  const fetchArticle = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/article/list');
      const data = await res.json();

      if (Array.isArray(data)) {
        setArticle(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

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
          <div className={`align-items-center d-flex ${style.index_padding}`}>
            <Link href="/article" className="text-decoration-none text-white">
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
