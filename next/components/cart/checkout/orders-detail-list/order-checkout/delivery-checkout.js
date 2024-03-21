import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../orders-detail.module.scss'
import { FaCircleQuestion, FaPlus, FaAngleRight } from 'react-icons/fa6'
import { FaRegEdit } from 'react-icons/fa'
import Form from 'react-bootstrap/Form'
import Image from 'next/image'
import Link from 'next/link'
//使用SweetAlert2 API
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

// 引入共同shipping鉤子
import { useShipping } from '@/hooks/use-shipping'

// 引入台灣城市區域json
import taiwanDistricts from '@/data/taiwan_districts.json'

import { useAuth } from '@/hooks/use-Auth'

export default function DeliveryCheckout({ items, memberId }) {
  const { memberData } = useAuth()
  const {
    selectAddrOption,
    handleSelectChange,
    calcUpdateShippingFee,
    addressType,
    setAddressType,
    addresses,
    isMaxHomeAddresses,
    parseAddress,
    name,
    setName,
    phone,
    setPhone,
    selectedCity,
    setSelectedCity,
    selectedRegion,
    setSelectedRegion,
    detailAddress,
    setDetailAddress,
    deliveryTime,
    setDeliveryTime,
    handleCityChange,
    handleRegionChange,
    regions,
    homeField,
    shippingFee,
    updateSelectedAddressIndex,
    shippingOptions,
    selectedAddresses,
    setSelectedAddressIndex,
    handleAddressSelection,
    selectAddress,
    hasCommonAddr,
  } = useShipping()

  // 點擊新增宅配地址按鈕狀態
  const [showAddrForm, setshowAddrForm] = useState(false)

  // 點擊編輯地址按鈕狀態
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  // 單筆賣場商品品項數量
  const [totalProducts, setTotalProducts] = useState(0)
  // 單筆賣場訂單總價
  const [orderPrice, setOrderPrice] = useState(0)

  const [windowWidth, setWindowWidth] = useState(null)

  // 紀錄視窗大小
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth)
      }
      updateWindowWidth()
      window.addEventListener('resize', updateWindowWidth)
      return () => window.removeEventListener('resize', updateWindowWidth)
    }
  }, [])

  // 串接綠界超商地圖
  const getSevenAddress = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/api/cart/get-seven-address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('請求失敗', error)
    }
  }

  // 判斷是新增宅配地址還是編輯宅配地址
  const handleShowForm = (editMode = false) => {
    setshowAddrForm(true)
    setIsEditingAddress(editMode)

    // 如果是新增地址模式就清空表單的值
    if (!editMode) {
      setName('')
      setPhone('')
      setSelectedCity('')
      setSelectedRegion('')
      setDetailAddress('')
      setDeliveryTime('')
      setAddressType('')
    }
  }

  // 編輯/新增地址時點擊取消
  const handleCancel = () => {
    setshowAddrForm(false)
  }

  // 設定各個物流運費，當用戶改變selectAddrOption就更新運費
  useEffect(() => {
    const selectedOption = shippingOptions[memberId]?.selectAddrOption
    const shippingFee =
      selectedOption === '1' ? 60 : selectedOption === '2' ? 100 : 0
    // 更新運費
    calcUpdateShippingFee(memberId, selectedOption)

    const totalItemsPrice = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    )
    const totalPriceWithShipping = totalItemsPrice + shippingFee
    setOrderPrice(totalPriceWithShipping)
  }, [items, shippingOptions, memberId, calcUpdateShippingFee])

  // 點擊編輯地址按鈕
  const handleEditClick = () => {
    const currentSelectedIndex = selectedAddresses[memberId]?.home

    if (currentSelectedIndex !== undefined) {
      selectAddress(currentSelectedIndex)
      // 使用selectedAddressIndex來設計表單資料
      const selectedAddress = addresses.homeAddresses[currentSelectedIndex]
      if (selectedAddress) {
        const { name, phone } = selectedAddress
        const { AddressType, DeliveryTimePreference } =
          selectedAddress.specialPreferences
        const { city, region, detail } = parseAddress(selectedAddress.address)
        // console.log(selectedAddress.address)

        setName(name)
        setPhone(phone)
        setSelectedCity(city)
        setSelectedRegion(region)
        setDetailAddress(detail)
        setDeliveryTime(DeliveryTimePreference)
        setAddressType(AddressType)
        setshowAddrForm(true)
        setIsEditingAddress(true)
      }
    } else {
      MySwal.fire({
        icon: 'warning',
        text: '請選擇一個地址進行編輯',
        confirmButtonColor: '#E41E49',
      })
    }
  }
  const router = useRouter()

  useEffect(() => {
    const currentSelectedIndex = selectedAddresses[memberId]?.home
    if (currentSelectedIndex !== undefined) {
      const selectedAddress = addresses.homeAddresses[currentSelectedIndex]
      if (selectedAddress) {
        const { city, region, detail } = parseAddress(selectedAddress.address)
        const { name, phone } = selectedAddress
        const { AddressType, DeliveryTimePreference } =
          selectedAddress.specialPreferences

        setSelectedCity(city)
        setSelectedRegion(region)
        setDetailAddress(detail)
        setName(name)
        setPhone(phone)
        setDeliveryTime(DeliveryTimePreference)
        setAddressType(AddressType)
      }
    }
  }, [selectedAddresses, memberId, addresses.homeAddresses])

  // 編輯地址點擊送出提交表單
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('提交表單，編輯模式：', isEditingAddress)
    console.log('當前選擇的物流方式: ', selectAddrOption)

    // 送出前檢查表單欄位是否為空
    if (
      !name.trim() ||
      !phone.trim() ||
      !selectedCity.trim() ||
      !selectedRegion.trim() ||
      !detailAddress.trim() ||
      !deliveryTime.trim() ||
      !addressType.trim()
    ) {
      MySwal.fire({
        icon: 'warning',
        text: '所有欄位資訊都需要填寫！',
        confirmButtonColor: '#E41E49',
      })
      return
    }

    if (isEditingAddress && !['home1', 'home2', 'home3'].includes(homeField)) {
      MySwal.fire({
        icon: 'warning',
        text: '無效的地址欄位！',
        confirmButtonColor: '#E41E49',
      })
      return
    }

    if (!memberData || !memberData.id) {
      console.error('未找到對應的memberId')
      return
    }

    let url = isEditingAddress
      ? 'http://localhost:3005/api/cart/edit-address'
      : 'http://localhost:3005/api/cart/add-address'
    const formData = {
      memberId: memberData.id,
      shipping_method: selectAddrOption,
      name,
      phone,
      address: `${selectedCity} ${selectedRegion} ${detailAddress}`,
      specialPreferences: {
        AddressType: addressType,
        DeliveryTimePreference: deliveryTime,
      },
      // 如果是新增地址就沒有預設欄位
      homeField: isEditingAddress ? homeField : undefined,
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('伺服器連線失敗')
        }
        return response.json()
      })
      .then((results) => {
        console.log(results)
        isEditingAddress
          ? MySwal.fire({
              icon: 'success',
              title: '地址編輯成功',
              showConfirmButton: false,
              timer: 2000,
            })
          : MySwal.fire({
              icon: 'success',
              title: '地址新增成功',
              showConfirmButton: false,
              timer: 2000,
            })

        setshowAddrForm(false)
        router.push('/cart/checkout')
      })
      .catch((error) => {
        console.error('連線失敗:', error)
      })
  }

  // 計算假的到貨日期
  const calculateDeliveryDates = () => {
    const currentDate = new Date()
    const deliveryStartDate = new Date(currentDate.getTime() + 86400000 * 1) //加1天的毫秒數86400000
    const deliveryEndDate = new Date(currentDate.getTime() + 86400000 * 4) // 加4天

    const formatDate = (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}`
    }

    return {
      start: formatDate(deliveryStartDate),
      end: formatDate(deliveryEndDate),
    }
  }
  const { start, end } = calculateDeliveryDates()

  // 計算單筆賣場訂單商品總品項數量 + 計算賣場單筆訂單總價
  useEffect(() => {
    let total = items.length
    let totalPrice = items.reduce(
      (order, item) => order + item.quantity * item.price,
      0
    )
    if (selectAddrOption) {
      totalPrice += shippingFee
    }
    setTotalProducts(total)
    setOrderPrice(totalPrice)
  }, [items, shippingFee, selectAddrOption])

  // 更新選中的地址選項
  const handleAddressChange = (memberId, index, shippingType) => {
    // 依據物流方式去判斷是選7-11還是宅配
    console.log('memberId', memberId, 'index', index, 'type:', shippingType)

    handleAddressSelection(memberId, index)

    updateSelectedAddressIndex(memberId, index, shippingType)
  }

  // 每當selectedAddresses發生變化時，同步更新selectedAddressIndex
  useEffect(() => {
    const currentSelected = selectedAddresses[memberId]?.home
    if (currentSelected !== undefined) {
      setSelectedAddressIndex(currentSelected)
    }
  }, [selectedAddresses, memberId])

  const currentShippingOption = shippingOptions[memberId] || {}

  return (
    <>
      <div className={`row ${styles.deliveryRow}`}>
        <div
          className={
            showAddrForm
              ? `col-12 border-0 border-4 pb-4 ${styles.deliveryInfo}`
              : `col-6 border-end border-white border-4 ${styles.deliveryInfo}`
          }
        >
          <div className={styles.headerTitle}>
            <h5>
              <b>寄送資訊</b>
            </h5>
            <FaCircleQuestion className={styles.icon} />
          </div>
          {/* 物流方式下拉選單 */}
          <div className={styles.selectFrame}>
            <label htmlFor="select">
              物流方式：
              {/* <span className={styles.deliveryName}>7-11 超商寄送</span> */}
            </label>
            <Form.Select
              className={styles.formSelect}
              onChange={(e) => handleSelectChange(e, memberId)}
              value={currentShippingOption.selectAddrOption || ''}
              disabled={showAddrForm}
            >
              <option value="">請選擇物流方式</option>
              <option value="1">7-11 超商寄送 ｜運費$60</option>
              <option value="2">店家宅配寄送 ｜運費$100</option>
            </Form.Select>
          </div>
          {/* 新增/編輯常用地址按鈕(宅配) */}
          {!showAddrForm && (
            <div
              className={
                currentShippingOption.selectAddrOption === '2'
                  ? styles.addHomeAdrBtn
                  : 'd-none'
              }
            >
              {hasCommonAddr && (
                <div className={styles.editHomeAdr} onClick={handleEditClick}>
                  <FaRegEdit />
                  <span className={styles.text}>編輯地址</span>
                </div>
              )}

              {!isMaxHomeAddresses && (
                <div
                  className={styles.addHomeAdr}
                  onClick={() => handleShowForm()}
                >
                  <FaPlus />
                  <span className={styles.text}>新增常用地址</span>
                </div>
              )}
            </div>
          )}
          {/* 選擇常用地址radio 區塊 (block)*/}
          {currentShippingOption.selectAddrOption && (
            <div
              className={`${styles.adressFrame} ${
                !showAddrForm ? 'd-block' : 'd-none'
              }`}
            >
              {currentShippingOption.selectAddrOption === '1'
                ? // 7-11超商寄送地址選項
                  addresses.sevenAddresses.map((addr, index) => {
                    const isSelected =
                      selectedAddresses[memberId]?.['seven'] === index
                    return (
                      <div
                        key={index}
                        className="form-check mb-3 d-flex align-items-center"
                      >
                        <input
                          className="form-check-input me-3"
                          type="radio"
                          name={`seven-address-${memberId}`}
                          value={index}
                          checked={isSelected}
                          onChange={() => {
                            handleAddressChange(
                              memberId,
                              index,
                              currentShippingOption.selectAddrOption === '1'
                                ? 'seven'
                                : 'home'
                            )
                          }}
                        />
                        <label className="form-check-label">
                          <div>
                            {addr.name} {addr.phone}
                          </div>
                          <div>
                            {addr.seventInfo.storeName} ｜{' '}
                            {addr.seventInfo.address}
                          </div>
                        </label>
                      </div>
                    )
                  })
                : // 宅配地址選項
                  addresses.homeAddresses.map((addr, index) => {
                    const isSelected =
                      selectedAddresses[memberId]?.['home'] === index
                    return (
                      <div
                        key={index}
                        className="form-check mb-3 d-flex align-items-center"
                      >
                        <input
                          className="form-check-input me-3"
                          type="radio"
                          name={`home-address-${memberId}`}
                          checked={isSelected}
                          value={index}
                          onChange={() => {
                            handleAddressChange(memberId, index, 'home')
                          }}
                        />
                        <label className="form-check-label">
                          <div>
                            {addr.name} {addr.phone}
                          </div>
                          <div>{addr.address}</div>
                          <div>
                            {addr.specialPreferences.AddressType}，
                            {addr.specialPreferences.DeliveryTimePreference}
                          </div>
                        </label>
                      </div>
                    )
                  })}
            </div>
          )}

          {/* 新增超商地址按鈕(寄送資訊) */}
          <div
            className={`flex-column align-items-center mt-4 ${
              currentShippingOption.selectAddrOption === '1'
                ? 'd-flex'
                : 'd-none'
            }`}
          >
            <div onClick={getSevenAddress}>
              <Image
                src="/images/cart/7-eleven.svg"
                width={50}
                height={50}
                alt="選擇7-ELEVEN超商地址"
                className={styles.sevenimg}
              />
            </div>
            {/* 新增超商常用地址按鈕 */}
            <div className={styles.addSevevnAdr} onClick={getSevenAddress}>
              <span className={styles.iconFrame}>
                <FaPlus />
              </span>
              <span className={styles.text}>新增地址</span>
            </div>
          </div>
        </div>
        {/* 宅配地址表單區塊 */}
        <div
          className={`col-12 ${styles.addrForm}`}
          style={{ display: showAddrForm ? 'block' : 'none' }}
        >
          {/* 新增/編輯常用地址標題 */}
          <div className="d-flex mt-4">
            {isEditingAddress ? (
              <div className="border border-black py-1 px-2 rounded">
                編輯常用地址
              </div>
            ) : (
              <div className="border border-black py-1 px-2 rounded">
                新增常用地址
              </div>
            )}
          </div>
          {/* 新增/編輯宅配常用地址 */}
          {showAddrForm && (
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    姓名
                    <FaCircleQuestion />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    電話
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    城市
                  </label>
                  <select
                    id="city"
                    className="form-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">請選擇配送城市</option>
                    {taiwanDistricts.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="region" className="form-label">
                    區域
                  </label>
                  <select
                    id="region"
                    className="form-select"
                    value={selectedRegion}
                    onChange={handleRegionChange}
                  >
                    <option value="">請選擇配送區域</option>
                    {regions.map((region) => (
                      <option key={region.zip} value={region.name}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-12">
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="請輸入詳細地址"
                    aria-label="請輸入詳細地址"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
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
                      value="全天可收 (10:00 - 21:00)"
                      checked={deliveryTime === '全天可收 (10:00 - 21:00)'}
                      onChange={() =>
                        setDeliveryTime('全天可收 (10:00 - 21:00)')
                      }
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
                      value="僅白天可收 (10:00 - 17:00)"
                      checked={deliveryTime === '僅白天可收 (10:00 - 17:00)'}
                      onChange={(e) => setDeliveryTime(e.target.value)}
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
                      value="僅晚上可收 (19:00 - 21:00)"
                      checked={deliveryTime === '僅晚上可收 (19:00 - 21:00)'}
                      onChange={(e) => setDeliveryTime(e.target.value)}
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
                      value="辦公室"
                      checked={addressType === '辦公室'}
                      onChange={() => setAddressType('辦公室')}
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
                      value="住家：有管理室"
                      checked={addressType === '住家：有管理室'}
                      onChange={() => setAddressType('住家：有管理室')}
                    />
                    <label className="form-check-label" htmlFor="addr-type">
                      住家：有管理室
                    </label>
                  </div>
                  <div className="form-check mb-3 d-flex align-items-center">
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="addr-type"
                      id="addr-type3"
                      value="住家：無管理室"
                      checked={addressType === '住家：無管理室'}
                      onChange={() => setAddressType('住家：無管理室')}
                    />
                    <label className="form-check-label" htmlFor="addr-type">
                      住家：無管理室
                    </label>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-end m-0">
                  <button
                    type="button"
                    className="btn btn-light me-3"
                    onClick={() => {
                      handleCancel()
                    }}
                  >
                    取消
                  </button>
                  <button type="submit" className="btn btn-dark">
                    完成
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* 手機版 - 寄送資訊明細區塊 */}
        {windowWidth <= 431 &&
          !showAddrForm &&
          currentShippingOption.selectAddrOption && (
            <div
              className={`col-12 bg-secondary-subtle rounded-3 p-3 ${styles.deliveryInfoMobile} $ `}
            >
              <div className="row align-items-center">
                {currentShippingOption.selectAddrOption === '2' &&
                  selectedAddresses[memberId]?.home !== undefined && (
                    // 宅配地址被選中時顯示的資訊
                    <>
                      {addresses.homeAddresses[
                        selectedAddresses[memberId]?.home
                      ] && (
                        <div className="col-12">
                          <div>
                            {
                              addresses.homeAddresses[
                                selectedAddresses[memberId]?.home
                              ].name
                            }
                          </div>
                          <div>
                            {
                              addresses.homeAddresses[
                                selectedAddresses[memberId]?.home
                              ].address
                            }
                          </div>
                          <div>
                            <span>
                              {
                                addresses.homeAddresses[
                                  selectedAddresses[memberId]?.home
                                ].specialPreferences.AddressType
                              }
                            </span>
                            ｜
                            <span>
                              {
                                addresses.homeAddresses[
                                  selectedAddresses[memberId]?.home
                                ].specialPreferences.DeliveryTimePreference
                              }
                            </span>
                          </div>
                          <div>
                            {
                              addresses.homeAddresses[
                                selectedAddresses[memberId]?.home
                              ].phone
                            }
                          </div>
                          <div className={styles.time}>
                            預計到貨時間 {start} - {end}
                          </div>
                          <div className="col-12 text-end mt-3">
                            <b>運費：$100</b>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                {currentShippingOption.selectAddrOption === '1' &&
                  selectedAddresses[memberId]?.seven !== undefined && (
                    // 7-11地址被選取時顯示的資訊
                    <>
                      {addresses.sevenAddresses[
                        selectedAddresses[memberId]?.seven
                      ] && (
                        <div className="col-12">
                          <div>
                            {
                              addresses.sevenAddresses[
                                selectedAddresses[memberId]?.seven
                              ].name
                            }
                          </div>
                          <div>
                            {
                              addresses.sevenAddresses[
                                selectedAddresses[memberId]?.seven
                              ].seventInfo.storeName
                            }{' '}
                            ｜{' '}
                            {
                              addresses.sevenAddresses[
                                selectedAddresses[memberId]?.seven
                              ].seventInfo.address
                            }
                          </div>
                          <div>
                            {
                              addresses.sevenAddresses[
                                selectedAddresses[memberId]?.seven
                              ].phone
                            }
                          </div>
                          <div className={styles.time}>
                            預計到貨時間 {start} - {end}
                          </div>
                          <div className="col-12 text-end mt-3">
                            <b>運費：$60</b>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                {currentShippingOption.selectAddrOption === '2' &&
                  (selectedAddresses[memberId]?.home === undefined ||
                    selectedAddresses[memberId]?.home === '') && (
                    // 當選擇店家宅配，但没有選擇宅配地址時
                    <div>請新增宅配地址</div>
                  )}
                {currentShippingOption.selectAddrOption === '1' &&
                  (selectedAddresses[memberId]?.seven === undefined ||
                    selectedAddresses[memberId]?.seven === '') && (
                    // 當選擇超商方式，但沒有選擇超商地址時
                    <div>請新增超商地址</div>
                  )}
              </div>
            </div>
          )}

        {/* 收件資訊區塊-電腦版顯示 */}
        <div
          className={`col-6 ${styles.receiveInfo} ${
            showAddrForm ? 'd-none' : 'd-block'
          }`}
        >
          <div className={styles.headerTitle}>
            <h5>
              <b>收件資訊</b>
            </h5>
            <FaCircleQuestion className={styles.icon} />
          </div>
          {/* 有選擇收件地址後顯示地址細項 */}
          <div className={`${styles.infoBar}`}>
            {currentShippingOption.selectAddrOption === '2' &&
              selectedAddresses[memberId]?.home !== undefined && (
                // 顯示選中的宅配地址
                <>
                  {addresses.homeAddresses[
                    selectedAddresses[memberId]?.home
                  ] && (
                    <div>
                      <div>
                        {
                          addresses.homeAddresses[
                            selectedAddresses[memberId]?.home
                          ].address
                        }
                      </div>
                      <div>
                        <span>
                          {
                            addresses.homeAddresses[
                              selectedAddresses[memberId]?.home
                            ].specialPreferences.AddressType
                          }
                        </span>
                        ｜
                        <span>
                          {
                            addresses.homeAddresses[
                              selectedAddresses[memberId]?.home
                            ].specialPreferences.DeliveryTimePreference
                          }
                        </span>
                      </div>
                      <div>
                        {
                          addresses.homeAddresses[
                            selectedAddresses[memberId]?.home
                          ].name
                        }{' '}
                        {
                          addresses.homeAddresses[
                            selectedAddresses[memberId]?.home
                          ].phone
                        }
                      </div>
                      <div className={styles.feeTime}>
                        <div className={styles.time}>
                          預計到貨時間 {start} - {end}
                        </div>
                        <div>
                          <b>運費：$100</b>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            {currentShippingOption.selectAddrOption === '1' &&
              selectedAddresses[memberId]?.seven !== undefined && (
                // 顯示選中的7-11收件地址
                <>
                  {addresses.sevenAddresses[
                    selectedAddresses[memberId]?.seven
                  ] && (
                    <div>
                      <div>
                        {
                          addresses.sevenAddresses[
                            selectedAddresses[memberId]?.seven
                          ].name
                        }{' '}
                        {
                          addresses.sevenAddresses[
                            selectedAddresses[memberId]?.seven
                          ].phone
                        }
                      </div>
                      <div>
                        {
                          addresses.sevenAddresses[
                            selectedAddresses[memberId]?.seven
                          ].seventInfo.storeName
                        }{' '}
                        ｜
                        {
                          addresses.sevenAddresses[
                            selectedAddresses[memberId]?.seven
                          ].seventInfo.address
                        }
                      </div>
                      <div className={styles.feeTime}>
                        <div className={styles.time}>
                          預計到貨時間 {start} - {end}
                        </div>
                        <div>
                          <b>運費：$60</b>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            {currentShippingOption.selectAddrOption === '2' &&
              (selectedAddresses[memberId]?.home === undefined ||
                selectedAddresses[memberId]?.home === '') && (
                // 當選擇店家宅配，但没有選擇宅配地址時
                <div>請新增宅配地址</div>
              )}
            {currentShippingOption.selectAddrOption === '1' &&
              (selectedAddresses[memberId]?.seven === undefined ||
                selectedAddresses[memberId]?.seven === '') && (
                // 當選擇超商方式，但沒有選擇超商地址時
                <div>請新增超商地址</div>
              )}
          </div>
        </div>
        {/* 訂單金額區塊 */}
        <div className={styles.summeryPriceFrame}>
          <span className="d-none d-sm-block">訂單金額：</span>
          <span className="d-block d-sm-none">
            訂單金額 ({totalProducts}件商品)
          </span>
          <span className="text-danger">${orderPrice}</span>
        </div>
      </div>
    </>
  )
}
