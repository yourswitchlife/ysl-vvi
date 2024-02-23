import React from 'react'
import Link from 'next/link'

export default function Breadcrumb() {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item h5 text-white">
            <Link href="#">首頁</Link>
          </li>
          <li className="breadcrumb-item h5 text-white">
            <Link href="#">商品列表</Link>
          </li>
          <li
            className="breadcrumb-item active h5 text-white"
            aria-current="page"
          >
            xx商品
          </li>
        </ol>
      </nav>
    </>
  )
}
