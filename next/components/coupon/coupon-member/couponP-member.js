import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import Image from 'next/image'
import Swal from 'sweetalert2'

//scss
import styles from './couponP-member.module.scss'

//pics
import logo from '@/public/images/coupon/logominiFig.png'

//hooks
import { useAuth } from '@/hooks/use-Auth'


export default function CouponP({ currentFilter }) {
  const [claimed, setClaimed] = useState([])
  const router = useRouter()
  const { isLoggedIn, memberId } = useAuth()

  useEffect(() => {
    if (!isLoggedIn || !memberId) return

    fetch(`http://localhost:3005/api/coupon/memberCP?memberId=${memberId}&filter=${currentFilter}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        //讀除了運費以外的優惠券
        const results = result.some(coupon => coupon.discount_value == '0')

        const memberCP = results ? result.filter(coupon => coupon.discount_value != '0') : result
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
                className="d-none d-md-block grid text-center row d-flex justify-content-center w-100 mx-5 px-5 my-3 "
              >
                <div
                  className={`${styles.cardBG} p-4 row align-items-center col-lg-6  ${(coupon.status === 1) ? styles.unvalid : ''}`}
                >
                  <div className="col-2">
                    <Image
                      src={logo}
                      alt="YSL coupon logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="col-10 row">
                    <div className={`${styles.title} text-white text-start fw-bold mb-0 col-12 ms-3`}>
                      {coupon.title.includes('獎勵') ? '' : '全館'}{coupon.title}
                    </div>
                    <div className="col-12 row justify-content-around align-items-center">
                      {/* <span
                        className={`text-white d-none d-md-block col-1 p-0 d-flex align-items-center fs-1 `}
                      > */}
                      {/* {coupon.discount_value < 10 ? "" : `$`} */}
                      {/* </span> */}
                      <div
                        className={`${styles.font} text-white d-none d-md-block col-5 p-0 mb-2`}
                      >
                        {coupon.discount_value < 10 ? (
                          <div className='ms-1'>
                            <span className={styles.discountValue}>{coupon.discount_value}</span>
                            <span className={styles.discountFont}>折</span>
                          </div>) : (
                          <div className='ms-4 d-flex align-items-center '>
                            <span className={styles.discountFont}>$</span>
                            <span className={styles.discountValue}>{coupon.discount_value}</span>
                          </div>
                        )}
                      </div>
                      <button
                        className={`${styles.btnCTA} btn-sm ${coupon.status === 1 ? "btn-secondary" : "btn-info"} btn
                        ms-3 col-6}`}
                        onClick={() => visit()}
                      >
                        <h5 className="">
                          {coupon.status === 1? "不能用囉" : "再逛一下"}
                        </h5>
                      </button>
                    </div>
                    <div className={`${styles.expiraDate} text-white text-start ms-3 col-12`}>
                      效期至:{' '}
                      {coupon.expiration_date
                        ? moment(coupon.expiration_date).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                        : 'Unknown'}
                    </div>
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
            className={`${styles.cardBG} py-3 px-1 row align-items-center col-lg-6 m-2  ${( coupon.status === 1) ? styles.unvalid : ''}`}
          >
            <div className=" col-3">
              <Image src={logo} width={35} height={35} alt="YSL coupon Logo" />
            </div>

            <div className="col-9 row">
              <p className="text-white text-start fw-bold fs-6 mb-0 col-12">
                {coupon.title.includes('獎勵') ? '' : '全館'}{coupon.title}
              </p>
              <div className="col-12  ">
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className={`${styles.font} text-white d-block d-md-none col-5 p-0`}
                  >
                    {coupon.discount_value < 10 ? (
                      <div className='ms-1'>
                        <span className={styles.discountValue}>{coupon.discount_value}</span>
                        <span className={styles.discountFont}>折</span>
                      </div>) : (
                      <div className='ms-1 d-flex align-items-center '>
                        <span className={styles.discountFont}>$</span>
                        <span className={styles.discountValue}>{coupon.discount_value}</span>
                      </div>
                    )}
                  </div>
                  <button
                    className={`${styles.btnCTA} btn btn-sm  ${(coupon.status === 1) ? "btn-secondary" : "btn-info"}
                       col-5 ms-5`}
                    onClick={() => visit()}
                    disabled={(coupon.status === 1)}
                  >
                    <p className={`${styles.btnCTA}`}>
                      {(coupon.status === 1) ? "不能用囉" : "再逛一下"}
                    </p>
                  </button>
                </div>
              </div>

              <p className={`${styles.expiraDate} text-white text-start col-12`}>
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
