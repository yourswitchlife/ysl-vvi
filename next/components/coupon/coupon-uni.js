import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import Image from 'next/image'
import Swal from 'sweetalert2'

//scss
import styles from './coupon-uni.module.scss'

//pics
import logo from '@/public/images/coupon/logominiFig.png'

export default function Test() {
  // const [couponName, setCouponName] = useState([])
  const [claimed, setClaimed] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3005/api/coupon/')
      .then((response) => response.json())
      .then((result) => {
        // console.log('success', result[2].expiration_date)
        const coupons = [
          result[15],
          result[22],
          result[29],
          result[36],
          result[44],
          result[45],
          result[46],
          result[47],
        ]
        const couponData = coupons.map((v) => ({ ...v, get: false }))
        setClaimed(couponData)
      })

      .catch((error) => {
        console.log('Error:', error)
      })
  }, [])

  const handleGet = (id) => {
    const memberID = '77'
    const didClaimed = claimed.some((coupon) => coupon.id === id && coupon.get)

    if (didClaimed) {
      //如果領過，按領取按鈕就導頁
      router.push('')
    } else {
      fetch('http://localhost:3005/api/coupon/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberID, couponID: id }),
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        if(data){
          const updatedGet = claimed.map((v) => {
            if (v.id === id && !v.get) {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-center',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer
                  toast.onmouseleave = Swal.resumeTimer
                },
              })
              Toast.fire({
                icon: 'success',
                title: '優惠券領取成功',
              })
              return { ...v, get: true }
            } else {
              return v
            }
          })
          setClaimed(updatedGet)
        }
      })
    
    }
  }

  return (
    <>
      {/* 電腦版 */}
      <div className="container text-center">
        <div className="row">
          {claimed.map((coupon, index) => (
            <div key={coupon.id} className="col-6">
              <div
                // It's better to use unique IDs if available
                className="d-none d-md-block grid text-center row d-flex justify-content-center w-100 mt-5"
              >
                <div
                  className={`${styles.cardBG} p-4 row align-items-center col-lg-6 m-2`}
                >
                  <div className="col-3">
                    <Image
                      src={logo}
                      alt="YSL coupon logo"
                      width={70}
                      height={70}
                    />
                  </div>
                  <div className="col-9 row">
                    <h4 className="text-white text-start fw-bold mb-0 col-12">
                      {coupon.title}優惠券
                    </h4>
                    <div className="col-12 row justify-content-around align-items-center">
                      <span
                        className={`text-white d-none d-md-block col-1 p-0 d-flex align-items-center fs-1 `}
                      >
                        $
                      </span>
                      <h1
                        className={`${styles.font} text-white d-none d-md-block col-5 p-0 me-3`}
                      >
                        {coupon.discount_value}
                      </h1>
                      <button
                        className={`${styles.btnCTA} btn btn-lg ${
                          !coupon.get ? 'btn-danger' : 'btn-info'
                        } ms-3 col-6}`}
                        onClick={() => handleGet(coupon.id)}
                      >
                        <h5 className="">
                          {!coupon.get ? '立即領取' : '去逛一下'}
                        </h5>
                      </button>
                    </div>
                    <h6 className="text-white text-start fs-6 col-12 mt-3">
                      效期至:{' '}
                      {coupon.expiration_date
                        ? moment(coupon.expiration_date).format(
                            'YYYY-MM-DD HH:mm:ss'
                          )
                        : 'Unknown'}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 手機板 */}

      {claimed.map((coupon, index) => (
        <div
          className="d-block d-md-none grid text-center row d-flex justify-content-center w-100 m-auto"
          key={coupon.id}
        >
          <div
            className={`${styles.cardBG} py-3 px-1 row align-items-center col-lg-6 m-2`}
          >
            <div className=" col-3">
              <Image src={logo} width={35} height={35} alt="YSL coupon Logo" />
            </div>

            <div className="col-9 row">
              <p className="text-white text-start fw-bold fs-6 mb-0 col-12">
                {coupon.title}優惠券
              </p>
              <div className="col-12  ">
                <div className="d-flex justify-content-center align-items-center">
                  <h4 className="text-white fw-bold col-2 p-0 m-0">$</h4>
                  <h2 className="text-white fw-bold col-3 p-0">
                    {coupon.discount_value}
                  </h2>
                  <button
                    className={`${styles.btnCTA} btn btn-sm ${
                      !coupon.get ? 'btn-danger' : 'btn-info'
                    } col-5 ms-5`}
                    onClick={() => handleGet(coupon.id)}
                  >
                    <p className={`${styles.btnCTA}`}>
                      {!coupon.get ? '立即領取' : '去逛一下'}
                    </p>
                  </button>
                </div>
              </div>

              <p className="text-white text-start col-12">
                效期至:{' '}
                {coupon.expiration_date
                  ? moment(coupon.expiration_date).format('YYYY-MM-DD HH:mm:ss')
                  : 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
