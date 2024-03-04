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
export function CartProvider({ children }) {
  // 加入購物車的項目
  const [cartItems, setCartItems] = useState([])

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
    console.log(cartItems)
  }, [cartItems])

  // SweetAlert2
  const notifySuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: '商品已加入購物車',
      showConfirmButton: false,
      timer: 2000,
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

  const notifyOK = (productQuanty) => {
    MySwal.fire({
      text: `抱歉，此件商品最多只能買${productQuanty}件喔`,
      confirmButtonColor: '#E41E49',
    })
  }

  // 計算被勾選的商品總價
  
  const filterItems = cartItems.filter((item) => item.userSelect === true)
  let totalPrice = 0
  filterItems.forEach((item) => (totalPrice += Number(item.price)))

  // 計算購物車總商品件數
  const totalProducts = cartItems.length

  // 刪除整筆賣場訂單
  const handleDeleteOrder = (id) => {
    const filterItems = cartItems.filter((item) => item.memberId !== id)
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
        if (item.quantity + 1 <= item.productQuanty) {
          // 如果購物車數量+1時小於當前商品庫存量
          return { ...p, quantity: p.quantity + 1 }
        } else {
          notifyOK(item.productQuanty)
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
    // 先檢查商品的id是否已存在購物車中
    const findIndex = cartItems.findIndex((p) => p.id === item.id)

    if (findIndex > -1) {
      // 存在，商品數量+1
      increment(cartItems, item)
    } else {
      // 不存在，執行商品加入購物車列表
      const newItem = { ...item, quantity: 1 }
      const newItems = [newItem, ...cartItems]
      setCartItems(newItems)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        increment,
        decrement,
        remove,
        handleCheckboxChange,
        handleAllCheckboxChange,
        notifySuccess,
        notifyAlert,
        notifyOrder,
        totalProducts,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 導出給訂閱者們包裝好的context 鉤子名稱
export const useCart = () => useContext(CartContext)
