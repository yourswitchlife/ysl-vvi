import {useEffect} from 'react'
import { useRouter } from 'next/router'
import CartNavbar from '@/components/layout/navbar/cart-navbar'
import Footer from '@/components/layout/footer/footer-front'
import CartStep from '@/components/cart/step-progress'
import OrderList from '@/components/cart/index/order-list'

import useRequireCart from '@/hooks/use-require-cart'

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { useAuth } from '@/hooks/use-Auth'
import { useCart } from '@/hooks/use-cart'

export default function CartConfirmProduct() {
  const {cartItems} = useCart()
  const router = useRouter()
  useRequireCart()
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart/empty')
    }
  }, [cartItems])
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
