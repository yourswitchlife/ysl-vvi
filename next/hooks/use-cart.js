import { createContext, useContext, useState } from 'react'

// 導出createContext方法
export const CartContext = createContext()

export function CartProvider({ children }) {
  // 加入購物車的項目
  const [item, setItem] = useState([])
}
