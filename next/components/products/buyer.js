import React from 'react'
import Image from 'next/image'

export default function Buyer() {
  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Q4MggV6w-pawJAzZs7iz4yeTMsQrSJsddA&usqp=CAU"
          className="rounded-circle img-fluid"
          alt="買家大頭照"
          width={50}
          height={50}
        />
        <div className="ms-2">
          <h6 className="text-white mb-1">陳ＸＸ</h6>
          <p className="text-white">July 22,2023</p>
        </div>
      </div>
    </>
  )
}
