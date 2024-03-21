import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/step-progress'
import OrderList from '@/components/cart/index/order-list'
import Empty from '@/components/cart/empty'

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useAuth } from '@/hooks/use-Auth'
import { useCart } from '@/hooks/use-cart'

export default function CartConfirmProduct() {
  const { cartItems } = useCart()
  return (
    <>
      <CartNavbar />
      {cartItems.length > 0 ? (
        <>
          <CartStep />
          <OrderList />
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
