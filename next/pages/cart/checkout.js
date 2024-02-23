import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/cart-step'
import OrderDetail from '@/components/cart/order-detail'

export default function Checkout() {
  return (
    <>
      <CartNavbar />
      <CartStep />
      <OrderDetail />
      <Footer />
    </>
  )
}
