import React from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/step-progress'
import OrderList from '@/components/cart/index/order-list'

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useAuth } from '@/hooks/use-Auth'

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

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
