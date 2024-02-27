import React from 'react'

export default function Paginage() {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-center ">
          <li class="page-item ms-2 me-2">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item ms-2 me-2">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item ms-2 me-2 active">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item ms-2 me-2">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item ms-2 me-2">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
