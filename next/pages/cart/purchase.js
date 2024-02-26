import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/cart-step'

export default function Purchase() {
  return (
    <>
      <CartNavbar />
      <CartStep />
      <Footer />
    </>
  )
}
