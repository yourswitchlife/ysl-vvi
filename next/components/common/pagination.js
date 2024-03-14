import React from 'react';
import { MdOutlineFirstPage, MdLastPage } from 'react-icons/md';

// 傳入參數名稱要注意一致
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // 沒資料時
  if (totalPages === 0) {
    return <div className='d-flex justify-content-center mt-5' style={{minHeight:100}}>目前暫無資料喔！快去拿點好料回來！</div>;
  }
  // 只有一頁就不顯示了
  if (totalPages === 1) {
    return <div className='d-flex justify-content-center mt-5'></div>;
  }

  // 迴圈用
  let pageNumbers = [];
  // 第一頁前
  if (currentPage > 2) {
    pageNumbers.push("...");
  }

  // 中間-永遠只顯示3則頁數(含中間)
  if (currentPage > 1) {
    pageNumbers.push(currentPage - 1);
  }
  pageNumbers.push(currentPage);
  if (currentPage < totalPages) {
    pageNumbers.push(currentPage + 1);
  }

  // 最後一頁前
  if (currentPage < totalPages - 1) {
    pageNumbers.push("...");
  }



  // active
  const activeStyle = {
    backgroundColor: '#ED5260', //$red-secondary
    color: 'white',
    fontSize: 'larger',
    borderRadius: '8px',
  };

  // default
  const linkStyle = {
    backgroundColor: 'transparent',
    color: '#676767', //$gray
    fontSize: 'larger',
  };

  //超過頁數省略...還沒寫完
  return (
    <nav aria-label="Page navigation example d-flex justify-content-center">
      <ul className="pt-5 pagination d-flex justify-content-center align-items-center">
        <li className={`pe-1 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
            style={linkStyle}
          >
            <MdOutlineFirstPage />
          </a>
        </li>
        <li className={`pe-1 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
            style={linkStyle}
          >
            &laquo;
          </a>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index} className={`pe-1 page-item ${number === currentPage ? 'active' : ''} ${number === '...' ? 'disabled' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (typeof number === 'number') {
                  onPageChange(number);
                }
              }}
              style={number === currentPage ? activeStyle : linkStyle}
            >
              {number}
            </a>
          </li>
        ))}
        <li className={`pe-1 page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
            style={linkStyle}
          >
            &raquo;
          </a>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
            style={linkStyle}
          >
            <MdLastPage />
          </a>
        </li>
      </ul>
    </nav>
  );
}
