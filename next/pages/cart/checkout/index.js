import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/step-progress/cart-step'
import OrdersDetailList from '@/components/cart/checkout/orders-detail-list'

export default function Checkout() {
  return (
    <>
      <CartNavbar />
      <CartStep />
      <OrdersDetailList />
      <Footer />
    </>
  )
}
