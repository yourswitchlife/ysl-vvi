import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import Image from 'next/image'
import Swal from 'sweetalert2'

//scss
import styles from './coupon-uni.module.scss'

//pics
import logo from '@/public/images/coupon/logominiFig.png'

//hooks
import { useAuth } from '@/hooks/use-Auth'
import logIn from '@/pages/member/login'

export default function Coupons() {
  const [claimed, setClaimed] = useState([])
  const router = useRouter()
  const { isLoggedIn, memberId } = useAuth()

  //領取成功通知
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



  useEffect(() => {
    fetch('http://localhost:3005/api/coupon/')
      .then((response) => response.json())
      .then((result) => {
        // console.log('success', result[48])
        const coupons = [
          result[48],
          result[49],
          result[50],
          result[51],
          result[52],
          result[53],
          result[54],
          result[55],
        ]
        const couponData = coupons.map((v) => ({ ...v, get: false }))
        setClaimed(couponData)
      })

      .catch((error) => {
        console.log('Error:', error)
      })
  }, [])

  const handleGet = (id) => {
    // const memberID = ''

    if (!isLoggedIn) {
      router.push('/member/login')
      return
    }
    const didClaimed = claimed.some((coupon) => coupon.id === id && coupon.get)

    if (didClaimed) {
      //如果領過，按領取按鈕就導頁
      router.push('/member/coupon-product')
    } else {
      fetch('http://localhost:3005/api/coupon/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberID: memberId, couponID: id }),
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          if (data) {
            const updatedGet = claimed.map((v) => {
              if (v.id === id && !v.get) {
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
                      全館{coupon.title}
                    </h4>
                    <div className="row justify-content-around align-items-center">
                      {coupon.discount_value < 10 ? (<div className='col-6 row justify-content-around align-items-end'>
                        <h1
                          className={`${styles.font} text-white d-none d-md-block col-2 p-0 ms-4`}
                        >
                          {coupon.discount_value}
                        </h1>
                        <span className='text-white d-none d-md-block col-1 p-0 me-3 fs-1'>折</span>
                      </div>) : (<div className='col-6 row justify-content-around align-items-center'>
                        <span
                          className={`text-white d-none d-md-block col-1 p-0 fs-1  `}
                        >
                          $
                        </span>
                        <h1
                          className={`${styles.font} text-white d-none d-md-block col-5 p-0 me-5`}
                        >
                          {coupon.discount_value}
                        </h1>
                      </div>)}


                      {/* <span className=''>
                      {coupon.discount_value<10? "折":""}
                      </span> */}

                      <button
                        className={`${styles.btnCTA} btn btn-lg ${!coupon.get ? 'btn-danger' : 'btn-info'
                          } col-6 ms-5 }`}
                        onClick={() => handleGet(coupon.id)}
                      >
                        <h5 className="">
                          {!coupon.get ? '立即領取' : '去逛一下'}
                        </h5>
                      </button>
                    </div>
                    <h6 className="text-white text-start fs-6 col-12 mt-4">
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
                全館{coupon.title}
              </p>
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center">
                  {coupon.discount_value < 10 ? (<div className='d-flex justify-content-center align-items-center ms-5'>
                    <h2
                      className="text-white fw-bold"
                    >
                      {coupon.discount_value}
                    </h2>
                    <h5 className='text-white fw-bold'>折</h5>
                    </div>) : (<div className='d-flex justify-content-center align-items-end'>
                      <h4 className="text-white fw-bold">$</h4>
                      <h2 className="text-white fw-bold col-7">
                        {coupon.discount_value}
                      </h2>
                    </div>)}

                  <button
                    className={`${styles.btnCTA} btn btn-sm ${!coupon.get ? 'btn-danger' : 'btn-info'
                      } col-5 ms-4`}
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
