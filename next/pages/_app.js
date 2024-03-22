import { useEffect } from 'react'
import { useRouter } from 'next/router'
// 樣式
import '@/styles/globals.scss'
import '@/styles/loader.scss'
import Swal from 'sweetalert2'

// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'
import DefaultLayout from '@/components/layout/default-layout'
// 自訂用載入動畫元件
import { CatLoader, NoLoader } from '@/hooks/use-loader/components'
//身分驗證
import { AuthProvider } from '@/hooks/use-Auth'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'
import WithWebSocketProvider from '@/context/member/withloginWebsocket'

// 導入購物車Provider
import { CartProvider } from '@/hooks/use-cart'
import { ShippingProvider } from '@/hooks/use-shipping'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案，對應`components/layout/default-layout/index.js`
  // 或`components/layout/default-layout.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  //google api
  const router = useRouter()

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '登入成功！歡迎您！',
            showConfirmButton: false,
            timer: 1300,
          })
          const gmember = result.user
          fetch('http://localhost:3005/api/member/google-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: gmember.uid,
              email: gmember.email,
              displayName: gmember.displayName,
              photoURL: gmember.photoURL,
            }),
            credentials: 'include', 
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('登入成功:', data)
              router.replace('/')
            })
            .catch((error) => {
              console.error('登入失敗:', error)
            })
        }
      })
      .catch((error) => {
        console.error('登入錯誤:', error)
        Swal.close()
      })
  }, [router])

  // 我把AuthProvider放在最外面 所有應用都能用
  return (
    <LoaderProvider close={3} CustomLoader={CatLoader} global={true}>
      <AuthProvider>
        <CartProvider>
          <ShippingProvider>
            <WithWebSocketProvider>
              {getLayout(<Component {...pageProps} />)}
            </WithWebSocketProvider>
          </ShippingProvider>
        </CartProvider>
      </AuthProvider>
    </LoaderProvider>
  )
}
