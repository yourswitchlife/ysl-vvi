import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from '../orders-detail.module.scss'
import { FaCircleQuestion, FaPlus, FaAngleRight } from 'react-icons/fa6'
import { FaRegEdit } from "react-icons/fa";
import Form from 'react-bootstrap/Form'
import Image from 'next/image'
import Link from 'next/link'



// 引入台灣城市區域json
import taiwanDistricts from '@/data/taiwan_districts.json'

import { useAuth } from '@/hooks/use-Auth'

export default function DeliveryCheckout() {

  const { memberData } = useAuth();

  const [selectAddrOption, setSelectAddrOption] = useState('1')

  // 點擊新增宅配地址按鈕狀態
  const [showAddrForm, setshowAddrForm] = useState(false)

  // 點擊編輯地址按鈕狀態
  const [isEditingAddress, setIsEditingAddress] = useState(false);


  // 用戶是否有常用地址資料
  const [hasCommonAddr, setHasCommonAddr] = useState(false)

  // 紀錄宅配地址是否已滿3條
  const [isMaxHomeAddresses, setIsMaxHomeAddresses] = useState(false)

  // 選擇地址、區域狀態
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  // 紀錄除了城市、區域的其他詳細地址
  const [detailAddress, setDetailAddress] = useState("")
  // 收件姓名
  const [name, setName] = useState("");
  // 收件電話
  const [phone, setPhone] = useState("");
  // 寄送時間
  const [deliveryTime, setDeliveryTime] = useState("");
  // 地址類型
  const [addressType, setAddressType] = useState("");

  // 紀錄所選取的宅配欄位
  const [homeField, setHomeField] = useState("")


  // 紀錄被編輯地址的radio選項
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  // 追蹤選中的宅配地址選項index
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  // 追蹤選中的7-11地址選項index
  const [selectedSevenIndex, setSelectedSevenIndex] = useState(null);





  // 紀錄從後端傳來的地址資料
  const [addresses, setAddresses] = useState({
    homeAddresses: [],
    sevenAddresses: [],
  });

  const [windowWidth, setWindowWidth] = useState(null);

  // 紀錄視窗大小
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
      };
      updateWindowWidth();
      window.addEventListener("resize", updateWindowWidth);
      return () => window.removeEventListener("resize", updateWindowWidth);
    }
  }, []);

  // 選擇物流方式下拉選單值
  const handleSelectChange = (e) => {
    setSelectAddrOption(e.target.value)
  }

  useEffect(() => {
    if (selectAddrOption === "2" && addresses.homeAddresses.length > 0) {
      setSelectedAddressIndex(0);
    } else if (selectAddrOption === "1" && addresses.sevenAddresses.length > 0) {
      setSelectedSevenIndex(0);
    }
  }, [selectAddrOption, addresses]);

  // 判斷是新增宅配地址還是編輯宅配地址
  const handleShowForm = (editMode = false) => {
    setshowAddrForm(true);
    setIsEditingAddress(editMode);

    // 如果是新增地址模式就清空表單的值
    if (!editMode) {
      setName("");
      setPhone("");
      setSelectedCity("");
      setSelectedRegion("");
      setDetailAddress("");
      setDeliveryTime("");
      setAddressType("");
    }
  };

  // 編輯/新增地址時點擊取消
  const handleCancel = () => {
    setshowAddrForm(false);
  };

  // 處理城市選項變更
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedRegion("");
  };

  // 處理區域選項變更
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  //根據選擇的城市對應區域們
  const regions = selectedCity
    ? taiwanDistricts.find(city => city.name === selectedCity)?.districts || []
    : [];

  // 後端傳來的地址拆分
  const parseAddress = (address) => {
    const parts = address.split(' ');
    return {
      city: parts[0], // "台北市"
      region: parts[1], // "北投區"
      detail: parts.slice(2).join(' '), // "立農街二段155號"
    };
  };
  // 範例
  // const address = "台北市 北投區 立農街二段155號";
  // const { city, region, detail } = parseAddress(address);
  // console.log(city, region, detail);

  // 根據被選擇的宅配地址radio來拆分地址
  const handleAddressSelection = (selectedAddressIndex) => {
    const selectedAddress = addresses.homeAddresses[selectedAddressIndex];
    // 解析地址的城市、區域和詳細地址
    const { city, region, detail } = parseAddress(selectedAddress.address);

    // 姓名、電話、配送類型時間
    const { name, phone } = selectedAddress;
    const { AddressType, DeliveryTimePreference } = selectedAddress.specialPreferences;

    let fieldMapping = ['home1', 'home2', 'home3'];
    let selectedField = fieldMapping[selectedAddressIndex];
    setHomeField(selectedField);

    // console.log("Before setting state:", { city, region, detail });
    setSelectedCity(city);
    setSelectedRegion(region);
    // console.log("After setting state:", { selectedCity, selectedRegion });
    setDetailAddress(detail);
    setName(name);
    setPhone(phone);
    setDeliveryTime(DeliveryTimePreference); // 更新配送時間
    setAddressType(AddressType); // 更新地址類型
    setSelectedAddressIndex(selectedAddressIndex)
  };

  // 根據被選擇的7-11地址radio選項顯示
  const handleSevenAddressChange = (index) => {
    setSelectedSevenIndex(index);
  };


  // 點擊編輯地址按鈕
  const handleEditClick = () => {
    if (selectedAddressIndex !== null) {
      // 使用selectedAddressInde來設計表單資料
      const selectedAddress = addresses.homeAddresses[selectedAddressIndex];
      if (selectedAddress) {
        const { city, region, detail } = parseAddress(selectedAddress.address);
        setSelectedCity(city);
        setSelectedRegion(region);
        setDetailAddress(detail);
        setshowAddrForm(true);
        setIsEditingAddress(true);
      }
    } else {
      alert("請選擇一個地址進行編輯");
    }
  };
  const router = useRouter()

  // 編輯地址點擊送出提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 送出前檢查表單欄位是否為空
    if (!name.trim() || !phone.trim() || !selectedCity.trim() || !selectedRegion.trim() || !detailAddress.trim() || !deliveryTime.trim() || !addressType.trim()) {
      alert('所有欄位資訊都需要填寫！');
      return;
    }

    if (!memberData || !memberData.id) {
      console.error('未找到對應的memberId');
      return;
    }

    let url = isEditingAddress ? "http://localhost:3005/api/cart/edit-address" : "http://localhost:3005/api/cart/add-address"
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
      homeField: isEditingAddress ? homeField : undefined
    };
    console.log(JSON.stringify(formData))
    console.log(formData);

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('伺服器連線失敗');
        }
        return response.json();
      })
      .then((results) => {
        console.log(results);
        alert(isEditingAddress ? '地址更新成功' : '地址新增成功')
        setshowAddrForm(false)
        router.push('/cart/checkout')
      })
      .catch((error) => {
        console.error('連線失敗:', error);
      });

  }


  // 計算假的到貨日期
  const calculateDeliveryDates = () => {
    const currentDate = new Date();
    const deliveryStartDate = new Date(currentDate.getTime() + 86400000 * 1); //加1天的毫秒數86400000
    const deliveryEndDate = new Date(currentDate.getTime() + 86400000 * 4); // 加4天

    const formatDate = (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    return {
      start: formatDate(deliveryStartDate),
      end: formatDate(deliveryEndDate),
    };
  };
  const { start, end } = calculateDeliveryDates();





  // 判斷從後端資料傳進來的宅配/7-11地址是否有資料
  const hasHomeAddr = addresses.homeAddresses.length > 0;
  const hasSevenAddr = addresses.sevenAddresses.length > 0;

  // 連線server端接收到常用地址資料
  useEffect(() => {
    if (memberData && memberData.id) {
      const memberId = memberData.id;
      const url = `http://localhost:3005/api/cart/common-address/${memberId}`
      fetch(url).then(response => {
        if (!response.ok) {
          throw new Error('連線後端失敗')
        }
        return response.json();
      })
        .then(data => {
          if (data && data.length > 0) {
            const homeAddresses = [];
            const sevenAddresses = [];
            console.log(data);

            data.forEach((item) => {
              if (item.shipping_method === 2) {
                // 宅配地址
                ['home1', 'home2', 'home3'].forEach(homeField => {
                  try {
                    if (item[homeField]) {
                      let parsedData = JSON.parse(item[homeField]);

                      // 判斷資料是否為陣列
                      if (!Array.isArray(parsedData)) {
                        parsedData = [parsedData];
                      }
                      homeAddresses.push(...parsedData);
                      console.log(homeAddresses);
                    }
                  } catch (error) {
                    console.error('解析宅配地址data發生錯誤', error);
                  }
                });
              } else if (item.shipping_method === 1) {
                // 超商地址
                ['seven1', 'seven2', 'seven3'].forEach(sevenField => {
                  try {
                    if (item[sevenField]) {
                      const parsedData = JSON.parse(item[sevenField]);
                      sevenAddresses.push(...parsedData);
                      console.log(sevenAddresses);
                    }
                  } catch (error) {
                    console.error('解析超商地址data發生錯誤', error);
                  }
                });
              }
            });
            setAddresses({ homeAddresses, sevenAddresses });
            setHasCommonAddr(true);
            // 檢查是否達到最大地址數量
            setIsMaxHomeAddresses(homeAddresses.length >= 3);

          } else {
            setHasCommonAddr(false)
          }
        })
        .catch(error => {
          console.error('fetch 失敗', error)
        })
    } else {
      console.log('取得memberId失敗，請確認是否有登入');
    }
  }, [memberData])



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
              <span className={styles.deliveryName}>7-11 超商寄送</span>
            </label>
            <Form.Select
              className={styles.formSelect}
              onChange={handleSelectChange}
              disabled={showAddrForm}
            >
              <option value="1">7-11 超商寄送 ｜運費$60</option>
              <option value="2">店家宅配寄送 ｜運費$100</option>
            </Form.Select>
          </div>
          {/* 新增/編輯常用地址按鈕(宅配) */}
          {
            !showAddrForm && (
              <div
                className={
                  selectAddrOption === '2' ? styles.addHomeAdrBtn : 'd-none'
                }
              >
                <div className={styles.editHomeAdr} onClick={() => handleShowForm(true)}>
                  <FaRegEdit />
                  <span className={styles.text}>編輯地址</span>
                </div>
                {!isMaxHomeAddresses && (
                  <div className={styles.addHomeAdr} onClick={() => handleShowForm()}>
                    <FaPlus />
                    <span className={styles.text}>新增常用地址</span>
                  </div>
                )}
              </div>
            )
          }
          {/* 選擇常用地址radio 區塊 (block)*/}
          <div className={`${styles.adressFrame} ${(windowWidth > 430 && !showAddrForm) ? 'd-block' : 'd-none'}`}>
            {selectAddrOption === '1' && (
              <div>
                {addresses.sevenAddresses.map((addr, index) => (
                  // 渲染每個超商地址radio
                  <div key={index} className="form-check mb-3 d-flex align-items-center">
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="seven-address"
                      value={index}
                      checked={selectedSevenIndex === index}
                      onChange={() => handleSevenAddressChange(index)}
                    />
                    <label className="form-check-label">
                      <div>{addr.name} {addr.phone}</div>
                      <div>{addr.seventInfo.storeName} ｜ {addr.seventInfo.address}</div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {selectAddrOption === '2' && (
              <div>
                {addresses.homeAddresses.map((addr, index) => (
                  // 渲染每個宅配地址radio
                  <div key={index} className="form-check mb-3 d-flex align-items-center">
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="home-address"
                      checked={selectedAddressIndex === index}
                      value={index}
                      onChange={() => {
                        handleAddressSelection(index); setSelectedAddressIndex(index);
                      }}
                    />
                    <label className="form-check-label">
                      <div>{addr.name} {addr.phone}</div>
                      <div>{addr.address}</div>
                      <div>{addr.specialPreferences.AddressType}，{addr.specialPreferences.DeliveryTimePreference}</div>
                    </label>
                  </div>
                ))}
              </div>
            )}

          </div>
          {/* 新增超商地址按鈕(寄送資訊) */}
          <div
            className={`flex-column align-items-center mt-4 ${selectAddrOption === '1' && windowWidth > 431 ? 'd-flex' : 'd-none'
              }`}
          >
            <Link href="">
              <Image
                src="/images/cart/7-eleven.svg"
                width={50}
                height={50}
                alt="選擇7-ELEVEN超商地址"
                className={styles.sevenimg}
              />
            </Link>
            {/* 新增超商常用地址按鈕 */}
            <Link href="" className={styles.addSevevnAdr}>
              <span className={styles.iconFrame}>
                <FaPlus />
              </span>
              <span className={styles.text}>新增地址</span>
            </Link>
          </div>
        </div>
        {/* 電腦版-新增宅配地址表單區塊 */}
        <div
          className={`col-12 ${styles.addrForm}`}
          style={{ display: showAddrForm && windowWidth > 431 ? 'block' : 'none' }}
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
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    電話
                  </label>
                  <input type="phone" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    城市
                  </label>
                  <select id="city" className="form-select" value={selectedCity} onChange={handleCityChange}>
                    <option value="">請選擇配送城市</option>
                    {taiwanDistricts.map((city) => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="region" className="form-label">
                    區域
                  </label>
                  <select id="region" className="form-select" value={selectedRegion} onChange={handleRegionChange}>
                    <option value="">請選擇配送區域</option>
                    {regions.map((region) => (
                      <option key={region.zip} value={region.name}>{region.name}</option>
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
                      checked={deliveryTime === "全天可收 (10:00 - 21:00)"}
                      onChange={() => setDeliveryTime("全天可收 (10:00 - 21:00)")}
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
                      checked={deliveryTime === "僅白天可收 (10:00 - 17:00)"}
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
                      checked={deliveryTime === "僅晚上可收 (19:00 - 21:00)"}
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
                      checked={addressType === "辦公室"}
                      onChange={() => setAddressType("辦公室")}
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
                      checked={addressType === "住家：有管理室"}
                      onChange={() => setAddressType("住家：有管理室")}
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
                      checked={addressType === "住家：無管理室"}
                      onChange={() => setAddressType("住家：無管理室")}
                    />
                    <label className="form-check-label" htmlFor="addr-type">
                      住家：無管理室
                    </label>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-end m-0">
                  <button type="button" className="btn btn-light me-3" onClick={() => { handleCancel() }}>
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
        <Link href="/cart/checkout/delivery" className={`col-12 bg-secondary-subtle rounded-3 p-3 ${styles.deliveryInfoMobile}`}>
          <div className="row align-items-center">
            {selectedAddressIndex !== null && (
              // 宅配地址被選中時顯示的資訊
              <>
                <div className="col-10">
                  <div>{addresses.homeAddresses[selectedAddressIndex].name}</div>
                  <div>{addresses.homeAddresses[selectedAddressIndex].address}</div>
                  <div>
                    <span>{addresses.homeAddresses[selectedAddressIndex].specialPreferences.AddressType}</span>｜
                    <span>{addresses.homeAddresses[selectedAddressIndex].specialPreferences.DeliveryTimePreference}</span>
                  </div>
                  <div>{addresses.homeAddresses[selectedAddressIndex].phone}</div>
                  <div className={styles.time}>預計到貨時間 {start} - {end}</div>
                </div>
                <div className="col-2">
                  <FaAngleRight />
                </div>
                <div className="col-12 text-end mt-3">
                  <b>運費：$100</b>
                </div>
              </>
            )}
            {selectedSevenIndex !== null && (
              // 7-11地址被選中時顯示的資訊
              <>
                <div className="col-10">
                  <div>{addresses.sevenAddresses[selectedSevenIndex].name}</div>
                  <div>{addresses.sevenAddresses[selectedSevenIndex].seventInfo.storeName} ｜ {addresses.sevenAddresses[selectedSevenIndex].seventInfo.address}</div>
                  <div>{addresses.sevenAddresses[selectedSevenIndex].phone}</div>
                  <div className={styles.time}>預計到貨時間 {start} - {end}</div>
                </div>
                <div className="col-2">
                  <FaAngleRight />
                </div>
                <div className="col-12 text-end mt-3">
                  <b>運費：$60</b>
                </div>
              </>
            )}
          </div>
        </Link>


        {/* 收件資訊區塊-電腦版顯示 */}
        <div
          className={`col-6 ${styles.receiveInfo} ${showAddrForm ? 'd-none' : 'd-block'
            }`}
        >
          <div className={styles.headerTitle}>
            <h5>
              <b>收件資訊</b>
            </h5>
            <FaCircleQuestion className={styles.icon} />
          </div>
          {/* 無7-11常用地址時在收件資訊新增地址 */}
          <div
            className="flex-column align-items-center my-2 d-none"

          // className={`flex-column align-items-center my-2 ${
          //   !hasCommonAddr && selectAddrOption === 2 ? 'd-none' : 'd-flex'
          // }`}
          >
            <Link href="">
              <Image
                src="/images/cart/7-eleven.svg"
                width={50}
                height={50}
                alt="選擇7-ELEVEN超商地址"
                className={styles.sevenimg}
              />
            </Link>
            <Link href="" className={styles.addSevevnAdr}>
              <span className={styles.iconFrame}>
                <FaPlus />
              </span>
              <span className={styles.text}>新增地址</span>
            </Link>
          </div>
          {/* 有選擇收件地址後顯示地址細項 */}
          <div className={`${styles.infoBar}`}>
            {selectedAddressIndex !== null && (
              <>
                <div>{addresses.homeAddresses[selectedAddressIndex].address} </div>
                <div>
                  <span>{addresses.homeAddresses[selectedAddressIndex].specialPreferences.AddressType}</span>｜<span>{addresses.homeAddresses[selectedAddressIndex].specialPreferences.DeliveryTimePreference}</span>
                </div>
                <div>{addresses.homeAddresses[selectedAddressIndex].name}  {addresses.homeAddresses[selectedAddressIndex].phone} </div>
                <div className={styles.feeTime}>
                  <div className={styles.time}>預計到貨時間 {start} - {end}</div>
                  <div>
                    <b>運費：{selectAddrOption !== 2 ? '$100' : '$60'}</b>
                  </div>
                </div>
              </>
            )}
            {selectedSevenIndex !== null && (
              <><div>{addresses.sevenAddresses[selectedSevenIndex].name} {addresses.sevenAddresses[selectedSevenIndex].phone}</div>
                <div>{addresses.sevenAddresses[selectedSevenIndex].seventInfo.storeName} ｜{addresses.sevenAddresses[selectedSevenIndex].seventInfo.address}</div></>
            )}
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
