import { useState } from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import styles from '@/styles/cart/delivery.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { FaAngleRight, FaAngleDown, FaCircleQuestion } from 'react-icons/fa6'

export default function Delivery() {
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <>
      <CartNavbar />
      <section className={`container px-4 ${styles.container}`}>
        <div className="bg-white rounded pb-2">
          <div className={styles.deliveryItem}>
            <div>
              7-11超商取件<span className="text-danger ps-3">$60</span>
            </div>
            <div className={styles.sub}>預計到貨時間 1/19 - 1/23</div>
          </div>
          {/* 7-11地址radio  */}
          <div className={styles.addrItem}>
            <div className=" form-check d-flex align-items-center">
              <input
                className="form-check-input me-3"
                type="radio"
                name="home-adress"
                id="home-adress1"
                defaultValue="1"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="home-adress1">
                <div>石捷門市</div>
                <div className={styles.namePhone}>小哈姆 09123456789</div>
                <div className={styles.address}>台北市北投區石牌路二段8號</div>
              </label>
            </div>
          </div>

          {/* 新增超商地址 */}
          <div className={styles.addBtn}>
            <Image src="/images/cart/7-eleven.svg" width={25} height={25} />
            <div>新增超商門市</div>
            <FaAngleRight />
          </div>
          <div className={styles.deliveryItem}>
            <div>
              店家宅配寄送<span className="text-danger">$100</span>
            </div>
            <div className={styles.sub}>預計到貨時間 1/19 - 1/23</div>
          </div>
          {/* 宅配地址radio */}
          <div className={styles.addrItem}>
            <div className=" form-check d-flex align-items-center">
              <input
                className="form-check-input me-3"
                type="radio"
                name="home-adress"
                id="home-adress1"
                defaultValue="1"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="home-adress1">
                <div className={styles.namePhone}>小哈姆 09123456789</div>
                <div className={styles.address}>
                  112 台北市北投區石牌路二段123號1樓
                </div>
              </label>
            </div>
          </div>
          {/* 新增宅配地址btn */}
          <div className={styles.addBtn} onClick={toggleForm}>
            <div>新增地址</div>
            <FaAngleDown />
          </div>
          {/* 宅配地址表單 */}
          {showForm && (
            <div className={styles.adressForm}>
              <form className="mt-4">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      姓名
                      <FaCircleQuestion className="ms-1" />
                    </label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      電話
                    </label>
                    <input type="phone" className="form-control" id="phone" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      城市
                    </label>
                    <select id="city" className="form-select">
                      <option selected="">請選擇配送城市</option>
                      <option>台北市</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="region" className="form-label">
                      區域
                    </label>
                    <select id="region" className="form-select">
                      <option selected="">請選擇配送區域</option>
                      <option>北投區</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="請輸入詳細地址"
                      aria-label="請輸入詳細地址"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">適合配達時間：</div>
                    <div className="form-check mb-3 d-flex align-items-center">
                      <input
                        className="form-check-input me-3"
                        type="radio"
                        name="delivery-time"
                        id="delivery-time1"
                        defaultValue="1"
                        defaultChecked=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="delivery-time"
                      >
                        全天可收 (10:00 - 21:00)
                      </label>
                    </div>
                    <div className="form-check mb-3 d-flex align-items-center">
                      <input
                        className="form-check-input me-3"
                        type="radio"
                        name="delivery-time"
                        id="delivery-time2"
                        defaultValue="2"
                        defaultChecked=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="delivery-time"
                      >
                        僅白天可收 (10:00 - 17:00)
                      </label>
                    </div>
                    <div className="form-check mb-3 d-flex align-items-center">
                      <input
                        className="form-check-input me-3"
                        type="radio"
                        name="delivery-time"
                        id="delivery-time3"
                        defaultValue="3"
                        defaultChecked=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="delivery-time"
                      >
                        僅晚上可收 (19:00 - 21:00)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">地址類型：</div>
                    <div className="form-check mb-3 d-flex align-items-center">
                      <input
                        className="form-check-input me-3"
                        type="radio"
                        name="addr-type"
                        id="addr-type1"
                        defaultValue="1"
                        defaultChecked=""
                      />
                      <label className="form-check-label" htmlFor="addr-type">
                        辦公室
                      </label>
                    </div>
                    <div className="form-check mb-3 d-flex align-items-center">
                      <input
                        className="form-check-input me-3"
                        type="radio"
                        name="addr-type"
                        id="addr-type2"
                        defaultValue="2"
                        defaultChecked=""
                      />
                      <label className="form-check-label" htmlFor="addr-type">
                        住家：有管理室
                      </label>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end m-0">
                    <button type="button" className="btn btn-light me-3">
                      取消
                    </button>
                    <button type="submit" className="btn btn-dark">
                      完成
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          <Link href="/cart/checkout" className={styles.confirmBtn}>
            確認
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
