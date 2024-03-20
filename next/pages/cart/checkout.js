import React, { useEffect } from 'react'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/step-progress'
import OrdersDetailList from '@/components/cart/checkout/orders-detail-list'
import Empty from '@/components/cart/empty'

import { useCart } from '@/hooks/use-cart'

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useAuth } from '@/hooks/use-Auth'

export default function Checkout() {
  const { isLoggedIn, memberData } = useAuth()
  const { cartItems } = useCart()


  return (
    <>
      <CartNavbar />
      {cartItems.length > 0 ? (
        <>
          <CartStep />
          <OrdersDetailList />
          <Footer />
        </>
      ) : (
        <>
          <Empty />
          <Footer />
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
