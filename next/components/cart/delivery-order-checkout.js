import React from 'react'
import styles from '@/components/cart/order-detail.module.scss'
import { FaCircleQuestion, FaPlus, FaAngleRight } from 'react-icons/fa6'
import Form from 'react-bootstrap/Form'
import Image from 'next/image'
import Link from 'next/link'

export default function DeliveryOrderCheckout() {
  return (
    <>
      <div className={`row ${styles.deliveryRow}`}>
        <div
          className={`col-6 border-end border-white border-4 ${styles.deliveryInfo}`}
          // className={`col-12 border-0 border-4 pb-4 ${styles.deliveryInfo}`}
        >
          <div className={styles.headerTitle}>
            <h5>
              <b>寄送資訊</b>
            </h5>
            <FaCircleQuestion className={styles.icon} />
          </div>
          <div className={styles.selectFrame}>
            <label htmlFor="select">
              物流方式：
              <span className={styles.deliveryName}>7-11 超商寄送</span>
            </label>
            <Form.Select className={styles.formSelect}>
              <option value="1">7-11 超商寄送 ｜運費$60</option>
              <option value="2">店家宅配寄送 ｜運費$100</option>
            </Form.Select>
          </div>
          {/* 新增常用地址按鈕(宅配) */}
          <div className={`justify-content-end ${styles.addHomeAdrBtn}`}>
            <div className={styles.addHomeAdr}>
              <FaPlus />
              <span className={styles.text}>新增常用地址</span>
            </div>
          </div>
          {/* 選擇常用地址radio 區塊 (block)*/}
          <div className={`${styles.adressFrame}`}>
            <div className=" form-check mb-3 d-flex align-items-center">
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
                  <span>石捷門市</span>台北市北投區石牌路二段8號
                </div>
              </label>
            </div>
            <div className=" form-check mb-3 d-flex align-items-center">
              <input
                className="form-check-input me-3"
                type="radio"
                name="home-adress"
                id="home-adress2"
                defaultValue="2"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="home-adress2">
                <div className={styles.namePhone}>小哈姆 09123456789</div>
                <div className={styles.address}>
                  <span>華泰城門市</span>桃園市中壢區春德路159號86櫃位
                </div>
              </label>
            </div>
          </div>
          {/* 新增超商地址按鈕(寄送資訊) */}
          <div className={`flex-column align-items-center mt-3 d-none`}>
            <Image
              src="/images/cart/7-eleven.svg"
              width={50}
              height={50}
              alt="選擇7-ELEVEN超商地址"
              className={styles.sevenimg}
            />
            {/* 新增住家常用地址按鈕 */}
            <div className={styles.addSevevnAdr}>
              <span className={styles.iconFrame}>
                <FaPlus />
              </span>
              <span className={styles.text}>新增地址</span>
            </div>
          </div>
        </div>
        {/* 電腦版-新增宅配地址表單區塊 */}
        <div className={`col-12 d-none ${styles.addrForm}`}>
          {/* 新增常用地址標題 */}
          <div className="d-flex mt-4">
            <div className="border border-black py-1 px-2 rounded">
              新增常用地址
            </div>
          </div>
          {/* 編輯新增宅配常用地址 */}
          <form className="mt-4">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  姓名
                  <FaCircleQuestion />
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
                  <label className="form-check-label" htmlFor="delivery-time">
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
                  <label className="form-check-label" htmlFor="delivery-time">
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
                  <label className="form-check-label" htmlFor="delivery-time">
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

        {/* 手機版 - 寄送資訊明細區塊 */}
        <Link
          href="/cart/checkout/delivery"
          className={`col-12 bg-secondary-subtle rounded-3 p-3 ${styles.deliveryInfoMobile}`}
        >
          <div className="row align-items-center">
            <div className="col-10">
              <div>7-ELEVEN 華泰城門市</div>
              <div>桃園市中壢區春德路159號86櫃位</div>
              <div>
                <span>辦公室</span>｜<span>僅白天可收 (10:00 - 17:00)</span>
              </div>
              <div>小哈姆 09123456789</div>
              <div className={styles.time}>預計到貨時間 1/19 - 1/23</div>
            </div>
            <div className="col-2">
              <FaAngleRight />
            </div>
            <div className="col-12 text-end mt-3">
              <b>運費：$100</b>
            </div>
          </div>
        </Link>
        {/* 收件資訊區塊-電腦版顯示 */}
        <div className={`col-6 ${styles.receiveInfo}`}>
          <div className={styles.headerTitle}>
            <h5>
              <b>收件資訊</b>
            </h5>
            <FaCircleQuestion className={styles.icon} />
          </div>
          {/* 無7-11常用地址時在收件資訊新增地址 */}
          <div className={`flex-column align-items-center my-2 d-none`}>
            <Image
              src="/images/cart/7-eleven.svg"
              width={50}
              height={50}
              alt="選擇7-ELEVEN超商地址"
              className={styles.sevenimg}
            />
            <div className={styles.addSevevnAdr}>
              <span className={styles.iconFrame}>
                <FaPlus />
              </span>
              <span className={styles.text}>新增地址</span>
            </div>
          </div>
          {/* 有選擇收件地址後顯示地址細項 */}
          <div className={`d-block ${styles.infoBar}`}>
            <div>7-ELEVEN 華泰城門市</div>
            <div>桃園市中壢區春德路159號86櫃位</div>
            <div>
              <span>辦公室</span>｜<span>僅白天可收 (10:00 - 17:00)</span>
            </div>
            <div>小哈姆 09123456789</div>
            <div className={styles.feeTime}>
              <div className={styles.time}>預計到貨時間 1/19 - 1/23</div>
              <div>
                <b>運費：$100</b>
              </div>
            </div>
          </div>
        </div>
        {/* 訂單金額區塊 */}
        <div className={styles.summeryPriceFrame}>
          <span className="d-none d-sm-block">訂單金額：</span>
          <span className="d-block d-sm-none">訂單金額 (4件商品)</span>
          <span className="text-danger">$5820</span>
        </div>
      </div>
    </>
  )
}
