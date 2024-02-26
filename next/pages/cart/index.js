import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/cart-step'
import OrderList from '@/components/cart/order-list'

export default function CartConfirmProduct() {
  return (
    <>
      <CartNavbar />
      <CartStep />
      <OrderList />
      <Footer />
    </>
  )
}
