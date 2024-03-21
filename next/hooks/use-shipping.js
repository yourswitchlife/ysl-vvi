import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-Auth'
// 引用use-cart鉤子
import { useCart } from '@/hooks/use-cart'
// 引入台灣城市區域json
import taiwanDistricts from '@/data/taiwan_districts.json'

export const ShippingContext = createContext()

export function ShippingProvider({ children }) {
  const { memberData } = useAuth()
  const { cartItems } = useCart()

  // 物流方式選項
  const [selectAddrOption, setSelectAddrOption] = useState('')
  // 紀錄不同賣場的物流方式選項
  const [shippingOptions, setShippingOptions] = useState({})
  // 選擇地址、區域狀態
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  // 紀錄除了城市、區域的其他詳細地址
  const [detailAddress, setDetailAddress] = useState('')
  // 收件姓名
  const [name, setName] = useState('')
  // 收件電話
  const [phone, setPhone] = useState('')
  // 寄送時間
  const [deliveryTime, setDeliveryTime] = useState('')
  // 地址類型
  const [addressType, setAddressType] = useState('')

  // 紀錄所選取的宅配欄位
  const [homeField, setHomeField] = useState('')
  // 追蹤選中的地址選項index
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)
  // 設定單個賣場訂單運費價格
  const [shippingFee, setShippingFee] = useState(0)
  // 設定同一付款模式下的總運費
  const [totalShippingFee, setTotalShippingFee] = useState(0)
  // 紀錄從後端傳來的地址資料
  const [addresses, setAddresses] = useState({
    homeAddresses: [],
    sevenAddresses: [],
  })
  // 用戶是否有常用地址資料
  const [hasCommonAddr, setHasCommonAddr] = useState(false)
  // 紀錄宅配地址是否已滿3條
  const [isMaxHomeAddresses, setIsMaxHomeAddresses] = useState(false)
  // 記錄單一賣場的每個運費
  const [shippingFees, setShippingFees] = useState({})
  // 儲存每個賣場訂單的選取的地址選項
  const [selectedAddresses, setSelectedAddresses] = useState({})
  // 紀錄每個訂單的收件資訊
  const [shippingInfos, setShippingInfos] = useState({})
  // 紀錄賣場名稱列表
  const [shopName, setShopName] = useState({})
  const [orderGroup, setOrderGroup] = useState({})

  // 處理城市選項變更
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
    setSelectedRegion('')
  }

  // 處理區域選項變更
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value)
  }

  //根據選擇的城市對應區域們
  const regions = selectedCity
    ? taiwanDistricts.find((city) => city.name === selectedCity)?.districts ||
      []
    : []

  // 後端傳來的地址拆分
  const parseAddress = (address) => {
    const parts = address.split(' ')
    return {
      city: parts[0], // "台北市"
      region: parts[1], // "北投區"
      detail: parts.slice(2).join(' '), // "立農街二段155號"
    }
  }
  // 範例
  // const address = "台北市 北投區 立農街二段155號";
  // const { city, region, detail } = parseAddress(address);
  // console.log(city, region, detail);

  // 根據被選擇的宅配地址radio來拆分地址
  const handleAddressSelection = (memberId, index) => {
    console.log('開始執行handleAddressSelection')
    const selectedAddress = addresses.homeAddresses[index]
    console.log(`handleAddressSelection 追蹤index: ${index}`)
    // 解析地址的城市、區域和詳細地址
    const { city, region, detail } = parseAddress(selectedAddress.address)

    // 姓名、電話、配送類型時間
    const { name, phone } = selectedAddress
    const { AddressType, DeliveryTimePreference } =
      selectedAddress.specialPreferences

    let addressInfo
    if (selectAddrOption === '2') {
      // 宅配
      addressInfo = {
        name,
        phone,
        address: `${city} ${region} ${detail}`,
        addressType,
        deliveryTime,
      }
    } else if (selectAddrOption === '1') {
      // 超商
      addressInfo = {
        name,
        phone,
        address: `${selectedAddress.storeName} ${selectedAddress.address}`,
      }
    }

    // 更新宅配收件人資訊
    handleShippingInfoUpdate(memberId, addressInfo)

    // 設置homeField
    selectAddress(index)

    setSelectedCity(city)
    setSelectedRegion(region)
    setDetailAddress(detail)
    setName(name)
    setPhone(phone)
    setDeliveryTime(DeliveryTimePreference) // 更新配送時間
    setAddressType(AddressType) // 更新地址類型
    setSelectedAddressIndex(index)
  }

  // 計算運費總金額
  const updateShippingFee = (memberId, fee) => {
    setShippingFees((currentFee) => ({ ...currentFee, [memberId]: fee }))
  }
  // useEffect(() => {
  //   console.log(shippingFees)
  // }, [shippingFees])

  // 初始化selectAddrOption
  useEffect(() => {
    const defaultShippingMethod = '2'
    setSelectAddrOption(defaultShippingMethod)
  }, [])

  // 根據選擇更新shippingInfos
  const updateShippingInfo = (memberId, selectAddrOption, selectedAddress) => {
    let addressInfo

    if (selectAddrOption === '2') {
      // 宅配
      addressInfo = {
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        address: `${selectedAddress.city} ${selectedAddress.region} ${selectedAddress.detail}`,
        addressType: selectedAddress.addressType,
        deliveryTime: selectedAddress.deliveryTime,
      }
    } else if (selectAddrOption === '1') {
      // 超商
      addressInfo = {
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        address: `${selectedAddress.storeName} ${selectedAddress.address}`,
      }
    }
    handleShippingInfoUpdate(memberId, addressInfo)
  }

  // 選擇物流方式下拉選單值
  const handleSelectChange = (e, memberId) => {
    const selectedMethod = e.target.value
    // console.log('選擇的物流方式: ', selectedMethod)
    setShippingOptions((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        selectAddrOption: selectedMethod,
        selectedAddressIndex: 0,
      },
    }))

    // 更新 shippingInfos
    setShippingInfos((prevInfos) => ({
      ...prevInfos,
      [memberId]: {
        ...prevInfos[memberId],
      },
    }))

    const hasAddresses =
      addresses.homeAddresses.length > 0 || addresses.sevenAddresses.length > 0
    if (hasAddresses) {
      const defaultAddressIndex = 0
      handleAddressSelection(memberId, defaultAddressIndex)
    }
  }

  // 更新選中地址的選項
  const updateSelectedAddress = (memberId, index) => {
    setShippingOptions((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        selectedAddressIndex: index,
      },
    }))
  }

  // 儲存每個訂單的物流選擇並更新選取的地址選項
  const updateSelectedAddressIndex = (memberId, index, type) => {
    setSelectedAddresses((prev) => ({
      ...prev,
      [memberId]: { [type]: index },
    }))
  }

  // 更新收件地址資訊
  const handleShippingInfoUpdate = (memberId, info) => {
    console.log('member_id:', memberId, 'info:', info)
    setShippingInfos((currentInfos) => ({
      ...currentInfos,
      [memberId]: {
        ...currentInfos[memberId],
        ...info,
      },
    }))
  }

  // 整理shippingInfos成收件人姓名、收件人電話、地址
  const getFormatShippingInfos = (shippingInfos, shippingOptions) => {
    return Object.entries(shippingInfos).map(([member_id, info]) => {
      const shippingOption = shippingOptions[member_id]?.selectAddrOption

      return {
        member_id,
        shippingMethod: shippingOption,
        receiveName: info.name, // 收件人姓名
        receivePhone: info.phone, // 收件人電話
        receiveaddress: `${info.address} ${info.addressType} ${info.deliveryTime}`, // 地址
      }
    })
  }
  useEffect(() => {
    // console.log("在useEffect中使用前的 shippingOptions:", shippingOptions);
    const formattedShippingInfos = getFormatShippingInfos(
      shippingInfos,
      shippingOptions
    )
    // console.log("在useEffect中整理過的收件資訊:", formattedShippingInfos);
    // console.log("整理過的收件資訊:", formattedShippingInfos);
  }, [shippingInfos, shippingOptions])

  useEffect(() => {
    let total = Object.values(shippingFees).reduce(
      (total, fee) => total + fee,
      0
    )
    setTotalShippingFee(total)
  }, [shippingFees])

  // 設定各個物流運費，當用戶改變selectAddrOption就更新運費
  const calcUpdateShippingFee = (memberId, selectAddrOption) => {
    let newFee =
      selectAddrOption === '1' ? 60 : selectAddrOption === '2' ? 100 : 0
    setShippingFees((currentFees) => {
      // 如果費用沒有變，就返回原狀態
      if (currentFees[memberId] === newFee) {
        return currentFees
      }
      // 否則更新費用
      return { ...currentFees, [memberId]: newFee }
    })
  }

  // 計算單筆賣場訂單商品總品項數量 + 計算賣場單筆訂單總價
  useEffect(() => {
    const totalShippingFee = Object.values(shippingFees).reduce(
      (total, fee) => total + fee,
      0
    )
  }, [shippingFees])

  // 設置homeField
  const selectAddress = (addressIndex) => {
    const homeField = `home${addressIndex + 1}`
    setHomeField(homeField)
  }

  // 會員是否有登入已取得memberData
  useEffect(() => {
    if (memberData && memberData.id) {
      fetchCommonAddresses(memberData.id)
    }
  }, [memberData])
  // 連線server端接收到常用地址資料
  const fetchCommonAddresses = async (memberId) => {
    const url = `http://localhost:3005/api/cart/common-address/${memberId}`
    try {
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('連線後端失敗')
          }
          return response.json()
        })
        .then((data) => {
          if (data && data.length > 0) {
            const homeAddresses = []
            const sevenAddresses = []
            // console.log(data)

            data.forEach((item) => {
              if (item.shipping_method === 2) {
                // 宅配地址
                ;['home1', 'home2', 'home3'].forEach((homeField) => {
                  try {
                    if (item[homeField]) {
                      let parsedData = JSON.parse(item[homeField])

                      // 判斷資料是否為陣列
                      if (!Array.isArray(parsedData)) {
                        parsedData = [parsedData]
                      }
                      homeAddresses.push(...parsedData)
                      // console.log(homeAddresses)
                    }
                  } catch (error) {
                    console.error('解析宅配地址data發生錯誤', error)
                  }
                })
              } else if (item.shipping_method === 1) {
                // 超商地址
                ;['seven1', 'seven2', 'seven3'].forEach((sevenField) => {
                  try {
                    if (item[sevenField]) {
                      const parsedData = JSON.parse(item[sevenField])
                      sevenAddresses.push(...parsedData)
                      // console.log(sevenAddresses)
                    }
                  } catch (error) {
                    console.error('解析超商地址data發生錯誤', error)
                  }
                })
              }
            })
            setAddresses({ homeAddresses, sevenAddresses })
            setHasCommonAddr(true)
            // 檢查是否達到最大地址數量
            setIsMaxHomeAddresses(homeAddresses.length >= 3)

            // 設置默認選擇宅配地址
            const newShippingOptions = {}
            Object.keys(orderGroup).forEach((memberId) => {
              newShippingOptions[memberId] = {
                selectAddrOption: '2',
                selectedAddressIndex: 0,
              }
            })
            setShippingOptions(newShippingOptions)
          } else {
            setHasCommonAddr(false)
          }
        })
        .catch((error) => {
          console.error('fetch 失敗', error)
        })
    } catch (error) {
      console.error('取得memberId失敗，請確認是否有登入', error)
    }
  }

  // 初始化物流方式及默認選第一個地址選項
  useEffect(() => {
    // 篩選出userSelect=true的商品並根據商品的memberId進行訂單分組
    const newOrderGroup = cartItems
      .filter((item) => item.userSelect === true)
      .reduce((group, item) => {
        group[item.member_id] = [...(group[item.member_id] || []), item]
        return group
      }, {})

    setOrderGroup(newOrderGroup)
    // console.log(orderGroup)

    const initShippingOptions = {}
    Object.keys(orderGroup).forEach((memberId) => {
      initShippingOptions[memberId] = {
        selectAddrOption: '2',
        selectedAddressIndex: 0,
      }
    })
    setShippingOptions(initShippingOptions)
  }, [cartItems])

  // 初始化 shippingInfos
  useEffect(() => {
    const initShippingInfos = {}
    Object.keys(orderGroup).forEach((memberId) => {
      initShippingInfos[memberId] = {
        name: '',
        phone: '',
        address: '',
        addressType: '',
        deliveryTime: '',
      }
    })
    setShippingInfos(initShippingInfos)
  }, [orderGroup])

  // 當物流方式改變就默認選擇第一個地址選項
  useEffect(() => {
    const newSelectedAddresses = {}
    Object.keys(orderGroup).forEach((memberId) => {
      if (
        shippingOptions[memberId]?.selectAddrOption === '2' &&
        addresses.homeAddresses.length > 0
      ) {
        newSelectedAddresses[memberId] = { home: 0 }
      } else if (
        shippingOptions[memberId]?.selectAddrOption === '1' &&
        addresses.sevenAddresses.length > 0
      ) {
        newSelectedAddresses[memberId] = { seven: 0 }
      }
    })
    setSelectedAddresses(newSelectedAddresses)
  }, [orderGroup, shippingOptions, addresses])

  // 當從後端取得地址且有選擇物流方式時設置shippingInfos
  useEffect(() => {
    Object.keys(orderGroup).forEach((memberId) => {
      // 默認預設宅配
      const selectAddrOption =
        shippingOptions[memberId]?.selectAddrOption || '2'
      let defaultAddress, newShippingInfo

      if (selectAddrOption === '2' && addresses.homeAddresses.length > 0) {
        defaultAddress = addresses.homeAddresses[0]
        newShippingInfo = {
          name: defaultAddress.name,
          phone: defaultAddress.phone,
          address: defaultAddress.address,
          addressType: defaultAddress.specialPreferences?.AddressType,
          deliveryTime:
            defaultAddress.specialPreferences?.DeliveryTimePreference,
        }
      } else if (
        selectAddrOption === '1' &&
        addresses.sevenAddresses.length > 0
      ) {
        defaultAddress = addresses.sevenAddresses[0]
        console.log('默認超商地址:', defaultAddress)
        newShippingInfo = {
          name: defaultAddress.name,
          phone: defaultAddress.phone,
          address: `${defaultAddress.seventInfo?.storeName} ${defaultAddress.seventInfo?.address}`,
        }
      }
      if (newShippingInfo) {
        setShippingInfos((currentInfos) => ({
          ...currentInfos,
          [memberId]: newShippingInfo,
        }))
      }
    })
  }, [addresses, orderGroup, shippingOptions])

  useEffect(() => {
    // 對應連線server端取得賣場名稱
    const memberIds = Object.keys(orderGroup).join(',')
    if (memberIds) {
      fetch(`http://localhost:3005/api/cart/shop-names?memberIds=${memberIds}`)
        .then((response) => response.json())
        .then((data) => {
          setShopName(data)
          // console.log(data)
        })
        .catch((error) => console.error('取得賣場名稱失敗', error))
    } else {
      console.log('沒有可查詢的memberIds') // 當沒有有效的memberIds時
    }
  }, [orderGroup])

  // 測試
  useEffect(() => {
    const pendingPaymentOrderIds = Object.keys(orderGroup).filter((memberId) =>
      orderGroup[memberId].some((item) => item.userSelect)
    )

    const allOrdersHaveCompleteShippingInfo = pendingPaymentOrderIds.every(
      (memberId) => {
        const info = shippingInfos[memberId]
        // 檢查是否存在收件資訊並且收件資訊完整
        return info && info.name && info.phone && info.address
      }
    )
  }, [orderGroup, shippingInfos])

  return (
    <ShippingContext.Provider
      value={{
        selectAddrOption,
        setSelectAddrOption,
        selectedCity,
        setSelectedCity,
        selectedRegion,
        setSelectedRegion,
        detailAddress,
        setDetailAddress,
        name,
        setName,
        phone,
        setPhone,
        deliveryTime,
        setDeliveryTime,
        addressType,
        setAddressType,
        homeField,
        setHomeField,
        selectedAddressIndex,
        setSelectedAddressIndex,
        shippingFee,
        setShippingFee,
        addresses,
        setAddresses,
        handleSelectChange,
        handleCityChange,
        handleRegionChange,
        parseAddress,
        handleAddressSelection,
        updateShippingFee,
        updateSelectedAddress,
        handleShippingInfoUpdate,
        totalShippingFee,
        calcUpdateShippingFee,
        addresses,
        hasCommonAddr,
        isMaxHomeAddresses,
        regions,
        shippingInfos,
        totalShippingFee,
        setTotalShippingFee,
        getFormatShippingInfos,
        shippingFees,
        updateSelectedAddressIndex,
        shippingOptions,
        selectedAddresses,
        orderGroup,
        shopName,
        selectAddress,
      }}
    >
      {children}
    </ShippingContext.Provider>
  )
}

export const useShipping = () => useContext(ShippingContext)
