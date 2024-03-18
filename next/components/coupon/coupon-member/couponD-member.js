import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import Image from 'next/image'
import Swal from 'sweetalert2'

//scss
import styles from './couponD-member.module.scss'

//pics
import logo from '@/public/images/coupon/logominiFig.png'

//hooks
import { useAuth } from '@/hooks/use-Auth'


export default function CouponD({ currentFilter }) {
  const [claimed, setClaimed] = useState([])
  const router = useRouter()
  const { isLoggedIn, memberId } = useAuth()

  useEffect(() => {
    fetch(`http://localhost:3005/api/coupon/memberCP?memberId=${memberId}&filter=${currentFilter}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        //讀除了運費以外的優惠券
        console.log("Original data:", result);
        // console.log("Filter condition check for each item:");
        // result.forEach(coupon => console.log(coupon.discount_value === '0'))

        const memberCP = result.filter(coupon => coupon.discount_value == '0')
        // console.log(memberCP)

        setClaimed(memberCP)
      })

      .catch((error) => {
        console.log('Error:', error)
      })
  }, [memberId, currentFilter, isLoggedIn])


  const visit = () => {
    router.push('/products')
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
                className="d-none d-md-block grid text-center row d-flex justify-content-center w-100 mx-5 px-5 my-3"
              >
                <div
                  className={`${styles.cardBG} p-2 row align-items-center col-lg-6 ${(new Date(coupon.expiration_date) < new Date() || coupon.status === 1) ? styles.unvalid : ''
                    }`}
                >
                  <div className="col-3">
                    <Image
                      src={logo}
                      alt="YSL coupon logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="col-9 row">
                    <h4 className="text-white text-start fw-bold mb-0 col-12">
                      全館{coupon.title}
                    </h4>
                    <div className="col-12 row justify-content-around align-items-center">
                      {/* <span
                        className={`text-white d-none d-md-block col-1 p-0 d-flex align-items-center fs-1 `}
                      >
                        {coupon.discount_value < 10 ? "" : `$`}
                      </span> */}
                      <div
                        className={`${styles.font} text-white d-none d-md-block col-5 p-0 me-3`}
                      >
                        {coupon.discount_value}
                        <span className='fs-2 ms-3'>元</span>
                      </div>

                      <button
                        className={`${styles.btnCTA} btn btn-sm ${(new Date(coupon.expiration_date) < new Date() || coupon.status === 1) ? "btn-secondary" : "btn-dark"}
                        ms-3 col-6}`}
                        onClick={() => visit()}
                        disabled={(new Date(coupon.expiration_date) < new Date() || coupon.status === 1)}
                      >
                        <h5 className="text-white">
                          {(new Date(coupon.expiration_date) < new Date() || coupon.status === 1) ? "不能用囉" : "再逛一下"}
                        </h5>
                      </button>
                    </div>
                    <h6 className={`${styles.expiraDate} "text-start col-12 mt-3">`}>
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
            className={`${styles.cardBG} py-3 px-1 row align-items-center col-lg-6 m-2 ${(new Date(coupon.expiration_date) < new Date() || coupon.status === 1) ? styles.unvalid : ''}`}
          >
            <div className=" col-3">
              <Image src={logo} width={35} height={35} alt="YSL coupon Logo" />
            </div>

            <div className="col-9 row">
              <p className="text-white text-start fw-bold fs-6 mb-0 col-12">
                全館{coupon.title}
              </p>
              <div className="col-12  ">
                <div className="d-flex justify-content-center align-items-center">
                  {/* <h4 className="text-white fw-bold col-2 p-0 m-0">$</h4> */}
                  <div className='d-flex justify-content-center align-items-end'>
                    <h3 className="text-white fw-bold col-3 ">
                      {coupon.discount_value}
                    </h3>
                    <h5 className="text-white fw-bold col-2 ms-3">元</h5>
                  </div>
                  <button
                    className={`${styles.btnCTA} btn btn-sm btn-dark
                    col-5 ms-5`}
                    onClick={() => handleGet(coupon.id)}
                  >
                    <p className={`${styles.btnCTA}`}>
                      去逛一下
                    </p>
                  </button>
                </div>
              </div>

              <p className="text-white text-start col-12 mt-1">
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
