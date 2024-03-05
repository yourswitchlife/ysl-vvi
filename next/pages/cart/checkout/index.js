import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/step-progress'
import OrdersDetailList from '@/components/cart/checkout/orders-detail-list'

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useAuth } from '@/hooks/use-Auth'

export default function Checkout() {
  const {isLoggedIn, memberData } = useAuth()
  return (
    <>
      <CartNavbar />
      <CartStep />
      <OrdersDetailList />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
