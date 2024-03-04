import React, { useState } from 'react'
import styles from './coupon-uni.module.scss'

import Image from 'next/image'
import logo from '@/public/images/coupon/logominiFig.png'

export default function CouponTest() {
  const [claimed, setclamied ] = useState(false);
  // if(Token){

  // }
  return (
    <>
      {/* 電腦版 */}

      <div className="container m-auto">
        <div className="row">
          <div className="col">
            <div
              className={`${styles.coupon} d-none d-md-block grid text-center row d-flex justify-content-center w-100 mt-5`}
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
                    角色扮演遊戲折價券
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
                      100
                    </h1>

                    <button
                      className={`${styles.btnCTA} btn btn-lg btn-danger ms-3 col-6}`}
                    >
                      <h5 className="">立即領取</h5>
                    </button>
                  </div>

                  <h6 className="text-white text-start col-12 mt-3">
                    效期至: 2024/04/15 23:59:59
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.coupon} d-none d-md-block grid text-center row d-flex justify-content-center w-100 mt-5`}
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
                    角色扮演遊戲折價券
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
                      100
                    </h1>

                    <button
                      className={`${styles.btnCTA} btn btn-lg btn-danger ms-3 col-6}`}
                    >
                      <h5 className="">立即領取</h5>
                    </button>
                  </div>

                  <h6 className="text-white text-start col-12 mt-3">
                    效期至: 2024/04/15 23:59:59
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.coupon} d-none d-md-block grid text-center row d-flex justify-content-center w-100 mt-5`}
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
                    角色扮演遊戲折價券
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
                      100
                    </h1>

                    <button
                      className={`${styles.btnCTA} btn btn-lg btn-danger ms-3 col-6}`}
                    >
                      <h5 className="">立即領取</h5>
                    </button>
                  </div>

                  <h6 className="text-white text-start col-12 mt-3">
                    效期至: 2024/04/15 23:59:59
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={`${styles.coupon} d-none d-md-block grid text-center row d-flex justify-content-center w-100 mt-5`}
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
                    角色扮演遊戲折價券
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
                      100
                    </h1>

                    <button
                      className={`${styles.btnCTA} btn btn-lg btn-danger ms-3 col-6}`}
                    >
                      <h5 className="">立即領取</h5>
                    </button>
                  </div>

                  <h6 className="text-white text-start col-12 mt-3">
                    效期至: 2024/04/15 23:59:59
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 手機板 */}
      <div className="d-block d-md-none grid text-center row d-flex justify-content-center w-100 m-auto">
        <div
          className={`${styles.cardBG} py-3 px-1 row align-items-center col-lg-6 m-2`}
        >
          <div className=" col-3">
            <Image src={logo} width={35} height={35} alt="YSL coupon Logo" />
          </div>

          <div className="col-9 row">
            <p className="text-white text-start fw-bold fs-6 mb-0 col-12">
              角色扮演遊戲折價券
            </p>
            <div className="col-12  ">
              <div className="d-flex justify-content-center align-items-center">
                <h4 className="text-white fw-bold col-2 p-0 m-0">$</h4>
                <h2 className="text-white fw-bold col-3 p-0">100</h2>
                <button
                  className={`${styles.btnCTA} btn btn-sm btn-danger col-5 ms-5`}
                >
                  <p className={`${styles.btnCTA}`}>立即領取</p>
                </button>
              </div>
            </div>

            <p className="text-white text-start col-12">
              效期至: 2024/04/15 23:59:59
            </p>
          </div>
        </div>
      </div>

      <div className="d-block d-md-none grid text-center row d-flex justify-content-center w-100 m-auto">
        <div
          className={`${styles.cardBG} py-3 px-1 row align-items-center col-lg-6 m-2`}
        >
          <div className=" col-3">
            <Image src={logo} width={35} height={35} alt="YSL coupon Logo" />
          </div>

          <div className="col-9 row">
            <p className="text-white text-start fw-bold fs-6 mb-0 col-12">
              角色扮演遊戲折價券
            </p>
            <div className="col-12  ">
              <div className="d-flex justify-content-center align-items-center">
                <h4 className="text-white fw-bold col-2 p-0 m-0">$</h4>
                <h2 className="text-white fw-bold col-3 p-0">100</h2>
                <button
                  className={`${styles.btnCTA} btn btn-sm btn-danger col-5 ms-5`}
                >
                  <p className={`${styles.btnCTA}`}>立即領取</p>
                </button>
              </div>
            </div>

            <p className="text-white text-start col-12">
              效期至: 2024/04/15 23:59:59
            </p>
          </div>
        </div>
      </div>

      <div className="d-block d-md-none grid text-center row d-flex justify-content-center w-100 m-auto">
        <div
          className={`${styles.cardBG} py-3 px-1 row align-items-center col-lg-6 m-2`}
        >
          <div className=" col-3">
            <Image src={logo} width={35} height={35} alt="YSL coupon Logo" />
          </div>

          <div className="col-9 row">
            <p className="text-white text-start fw-bold fs-6 mb-0 col-12">
              角色扮演遊戲折價券
            </p>
            <div className="col-12  ">
              <div className="d-flex justify-content-center align-items-center">
                <h4 className="text-white fw-bold col-2 p-0 m-0">$</h4>
                <h2 className="text-white fw-bold col-3 p-0">100</h2>
                <button
                  className={`${styles.btnCTA} btn btn-sm btn-danger col-5 ms-5`}
                >
                  <p className={`${styles.btnCTA}`}>立即領取</p>
                </button>
              </div>
            </div>

            <p className="text-white text-start col-12">
              效期至: 2024/04/15 23:59:59
            </p>
          </div>
        </div>
      </div>

      <div className="d-block d-md-none grid text-center row d-flex justify-content-center w-100 m-auto">
        <div
          className={`${styles.cardBG} py-3 px-1 row align-items-center col-lg-6 m-2`}
        >
          <div className=" col-3">
            <Image src={logo} width={35} height={35} alt="YSL coupon Logo" />
          </div>

          <div className="col-9 row">
            <p className="text-white text-start fw-bold fs-6 mb-0 col-12">
              角色扮演遊戲折價券
            </p>
            <div className="col-12  ">
              <div className="d-flex justify-content-center align-items-center">
                <h4 className="text-white fw-bold col-2 p-0 m-0">$</h4>
                <h2 className="text-white fw-bold col-3 p-0">100</h2>
                <button
                  className={`${styles.btnCTA} btn btn-sm btn-danger col-5 ms-5`}
                >
                  <p className={`${styles.btnCTA}`}>立即領取</p>
                </button>
              </div>
            </div>

            <p className="text-white text-start col-12">
              效期至: 2024/04/15 23:59:59
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
