import React from 'react';
import { MdOutlineFirstPage, MdLastPage } from 'react-icons/md';

export default function PaginationFront({ currentPage, totalPages, onPageChange }) {

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // active
  const activeStyle = {
    // backgroundColor: '#ED5260', //$red-secondary
    border: '1px solid white',
    color: 'white',
    fontSize: '16px',
    borderRadius: '6px',
  };

  // default
  const linkStyle = {
    backgroundColor: 'transparent',
    color: '#676767', //$gray
    fontSize: '14px',
  };

  //超過頁數省略...還沒寫完
  return (
    <nav aria-label="Page navigation example d-flex justify-content-center">
      <ul className="pt-5 pagination d-flex justify-content-center align-items-center">
        <li className={`pe-2 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
        <li className={`pe-2 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
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
        {pageNumbers.map(number => (
          <li key={number} className={`pe-2 page-item ${number === currentPage ? 'active' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
              style={number === currentPage ? activeStyle : linkStyle}
            >
              {number}
            </a>
          </li>
        ))}
        <li className={`pe-4 page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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