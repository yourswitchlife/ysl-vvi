// 購物商是空的導頁到cart/empty
import { useEffect } from "react"
import { useRouter } from 'next/router';

const useRequireCart = () => {
    const router = useRouter();
  
    useEffect(() => {
      const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
  
      if (cart.length === 0) {
        router.replace('/cart/empty');
      }
    }, [router]);
  };
  
  export default useRequireCart;
