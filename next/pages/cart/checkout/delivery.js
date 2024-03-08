import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import styles from '@/styles/cart/delivery.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import { FaAngleRight, FaAngleDown, FaCircleQuestion } from 'react-icons/fa6'
import { useAuth } from '@/hooks/use-Auth'

import useRequireCart from '@/hooks/use-require-cart'

// 引入台灣城市區域json
import taiwanDistricts from '@/data/taiwan_districts.json'


export default function Delivery() {
  useRequireCart()

  const [showForm, setShowForm] = useState(false)
  // 紀錄從後端傳來的地址資料
  const [addresses, setAddresses] = useState({
    homeAddresses: [],
    sevenAddresses: [],
  });

  // 追蹤選中的宅配地址選項index
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  // 追蹤選中的7-11地址選項index
  const [selectedSevenIndex, setSelectedSevenIndex] = useState(null);

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

  // 點擊新增宅配地址按鈕狀態
  const [showAddrForm, setshowAddrForm] = useState(false)
  // 點擊編輯地址按鈕狀態
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const { memberData } = useAuth();



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

  return (
    <>
      <CartNavbar />
      <section className={`container px-4 ${styles.container}`}>
        <div className="bg-white rounded pb-2">
          <div className={styles.deliveryItem}>
            <div>
              7-11超商取件<span className="text-danger ps-3">$60</span>
            </div>
            <div className={styles.sub}>預計到貨時間 {start} - {end}</div>
          </div>
          {/* 7-11地址radio  */}
          <div className={styles.addrItem}>
            <div className=" form-check d-flex align-items-center">

              {addresses.sevenAddresses.map((addr, index) => (
                // 渲染每個超商地址radio
                <>
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
                </>
              ))}
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
            <div className={styles.sub}>預計到貨時間 {start} - {end}</div>
          </div>
          {/* 宅配地址radio */}
          <div className={styles.addrItem}>
          {addresses.homeAddresses.map((addr, index) => (
                  // 渲染每個宅配地址radio
                  <div key={index} className="form-check mb-3 d-flex align-items-center ">
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
          {/* 新增宅配地址btn */}
          {!isMaxHomeAddresses && (
          <div className={styles.addBtn} onClick={() => handleShowForm()}>
            <div>新增地址</div>
            <FaAngleDown />
          </div>
          )}
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
