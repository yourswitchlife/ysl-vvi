import { createContext, useContext, useEffect, useState } from 'react'

//使用路由鉤子導頁
import { useRouter } from 'next/router'

//使用SweetAlert2 API
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


// 導出createContext方法
export const CartContext = createContext()

// 預設模板
// 加入購物車的商品物件
// cartItems = {
//   id:0,
//   name:"",
//   language:[],
//   product_quanty=0
//   price:0,
//   display_price:0,
//   quantity:1
//   total_price:0,
//   user_select:false
// }

// 導出全站Provider 元件，集中要使用的狀態及邏輯函式
// 預設模板
// 加入購物車的商品物件
// cartItems = {
//   id:0,
//   name:"",
//   language:"",
//   product_quanty=0
//   price:0,
//   display_price:0,
//   quantity:1
//   member_id:
//   total_price:0,
//   user_select:false
// }

// 導出全站Provider 元件，集中要使用的狀態及邏輯函式
export function CartProvider({ children }) {
  // 加入購物車的項目
  const [cartItems, setCartItems] = useState([])
  // seller ids
  const [memberIds, setMemberIds] = useState([])

  const router = useRouter()


  // 在元件掛載時讀取 localStorage 中的購物車狀態
  useEffect(() => {
    const cartData = localStorage.getItem('cartItems')

    if (cartData) {
      // 商品加入是否被勾選屬性
      const itemSelect = JSON.parse(cartData).map((item) => ({
        ...item,
        userSelect: item.userSelect || false,
      }))
      setCartItems(itemSelect)
    }
  }, [])

  // 當cartItems變化，就保存到localStorage裡面
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])



  // SweetAlert2
  const notifySuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: '商品已加入購物車',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const notifyAlert = (name, id) => {
    MySwal.fire({
      title: '確定移除這個商品嗎?',
      text: name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E41E49',
      cancelButtonColor: '#676767',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.isConfirmed) {
        remove(cartItems, id)
        Swal.fire({
          title: '刪除成功',
          text: '商品已從購物車中移除',
          icon: 'success',
        })
      }
    })
  }

  const notifyOrder = (id) => {
    MySwal.fire({
      title: '確定移除賣場所有商品嗎?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E41E49',
      cancelButtonColor: '#676767',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteOrder(id)
        Swal.fire({
          title: '刪除成功',
          text: '賣場商品已從購物車中移除',
          icon: 'success',
        })
      }
    })
  }

  const notifyOK = (product_quanty) => {
    MySwal.fire({
      text: `抱歉，此件商品最多只能買${product_quanty}件喔`,
      confirmButtonColor: '#E41E49',
    })
  }

  // 購物車中已有幾件商品，超過購買量
  const notifyCartQunanty = (quantity) => {
    MySwal.fire({
      text: `無法將所選數量加到購物車。因為您的購物車已有 ${quantity} 件商品，請至購物車頁面查看~`,
      confirmButtonColor: '#E41E49',
    })
  }
  // 購物車中已有幾件商品，超過購買量
  const notifyMax = () => {
    MySwal.fire({
      text: "已達購買上限",
      confirmButtonColor: '#E41E49',
    })
  }

  // 轉換商品語言版本為中文
  const changeLanguage = (language)=>{
    // 檢查language是否為非字串格式
    const languageStr = Array.isArray(language) ? language.join(',') : (typeof language === 'string' ? language : '')
    const languageList = {
      CH:'中文',
      EN:'英文',
      JP:'日文'
    }
    const languageNames = languageStr.split(',').map(item => languageList[item] || item).join(', ')
    return languageNames
  }

  // 計算被勾選的商品總價
  const filterItems = cartItems.filter((item) => item.userSelect === true)
  let totalPrice = 0
  filterItems.forEach((item) => (totalPrice += Number(item.price)))

  // 計算購物車總商品件數
  const totalProducts = cartItems.length


  // 刪除整筆賣場訂單
  const handleDeleteOrder = (id) => {
    const filterItems = cartItems.filter((item) => item.member_id !== id)
    setCartItems(filterItems)
  }

  // 選取全部checkbox
  const handleAllCheckboxChange = (cartItems) => {
    const alltrue = cartItems.every((item) => item.userSelect === true)
    const allfalse = cartItems.every((item) => item.userSelect === false)
    const allCheckState = cartItems.map((item) => {
      if (alltrue) {
        // 商品全部勾選
        return { ...item, userSelect: false }
      }
      if (allfalse) {
        // 商品全部沒被勾選
        return { ...item, userSelect: true }
      }
      // 商品有至少1個被勾選，但不是全部
      return { ...item, userSelect: true }
    })
    setCartItems(allCheckState)
  }

  // 當勾選框框改變時，改變userSelect的值
  const handleCheckboxChange = (cartItems, id) => {
    const selectItem = cartItems.map((p) => {
      if (p.id === id) {
        return { ...p, userSelect: !p.userSelect }
      } else {
        return p
      }
    })

    setCartItems(selectItem)
  }

  // 移除購物車商品
  const remove = (cartItems, id) => {
    const newItems = cartItems.filter((p) => {
      return p.id !== id
    })
    setCartItems(newItems)
  }

  // 商品數量-1
  const decrement = (cartItems, id) => {
    // 先找到對應的商品
    const targetItem = cartItems.find((p) => p.id === id)

    // 商品數量為1刪除直接移除該商品
    if (targetItem && targetItem.quantity === 1) {
      notifyAlert(name, id)
      return
    }

    // 商品數量大於1就數量-1
    const newItems = cartItems.map((p) => {
      if (p.id === id) {
        return { ...p, quantity: p.quantity - 1 }
      } else {
        return p
      }
    })

    setCartItems(newItems)
  }

  // 商品數量+1
  const increment = (cartItems, item) => {
    const newItems = cartItems.map((p) => {
      if (p.id === item.id) {
        if (item.quantity + 1 <= item.product_quanty) {
          // 如果購物車數量+1時小於當前商品庫存量
          return { ...p, quantity: p.quantity + 1 }
        } else {
          notifyOK(item.product_quanty)
          return p
        }
      } else {
        return p
      }
    })
    setCartItems(newItems)
  }


  // 加入購物車存進狀態內
  const addItem = (item) => {
    // 成功加入要跳轉頁面
    let routerPush = true
    // 先檢查商品的id是否已存在購物車中
    const findIndex = cartItems.findIndex((p) => p.id === item.id)
    const existingItem = cartItems[findIndex]
    // 時間戳記紀錄最新加入購物車的賣場
    const timeStamp = Date.now()

    if (existingItem) {
      // 存在，檢查商品庫存量
      if (existingItem.quantity + item.quantity <= item.product_quanty) {
        // 不超過庫存量
        const updateCartItems = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + item.quantity, timeStamp }
          }
          return cartItem
        })
        setCartItems(updateCartItems)
        notifySuccess()
      } else {
        // 超過庫存量
        notifyCartQunanty(item.product_quanty)
        routerPush = false
      }

    } else {
      // 不存在，加到cartItems裡面
      const newItem = { ...item, quantity: item.quantity || 1, userSelect: item.userSelect || false, timeStamp }
      const newItems = [newItem, ...cartItems]
      setCartItems(newItems)
      notifySuccess()
      // sellers
      setMemberIds([item.member_id, ...memberIds])
    }
    return routerPush
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        increment,
        decrement,
        remove,
        handleCheckboxChange,
        handleAllCheckboxChange,
        notifySuccess,
        notifyAlert,
        notifyOrder,
        notifyOK,
        notifyMax,
        totalProducts,
        totalPrice,
        changeLanguage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 導出給訂閱者們包裝好的context 鉤子名稱
export const useCart = () => useContext(CartContext)
