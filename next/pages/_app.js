import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

// 樣式
import '@/styles/globals.scss'
import '@/styles/loader.scss'
import Swal from 'sweetalert2'
import 'react-tooltip/dist/react-tooltip.css'
// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'
import DefaultLayout from '@/components/layout/default-layout'
// 自訂用載入動畫元件
import { CatLoader, NoLoader } from '@/hooks/use-loader/components'

// 引入Framer motion動畫
import { motion, AnimatePresence } from 'framer-motion'

//身分驗證
import { AuthProvider } from '@/hooks/use-Auth'
import { getRedirectResult } from 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'
import WithWebSocketProvider from '@/context/member/withloginWebsocket'

// 導入購物車Provider
import { CartProvider } from '@/hooks/use-cart'
import { ShippingProvider } from '@/hooks/use-shipping'
import { result } from 'lodash'

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

  // 比對網址獲取商家名稱
  const fetchShopTitle = async (shopId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/shop/${shopId}`)
      if (!response.ok) {
        throw new Error('伺服器連線失敗')
      }
      const result = await response.json()
      return result.shop_name
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  // 監聽路由路徑已改變頁面標題
  useEffect(() => {
    const handleRouteChange = async (url) => {
      console.log('Changing route to:', url)
      const path = url.split('?')[0]
      let pagetitle = 'Your Switch Life｜二手遊戲交易平台'
      if (path.startsWith('/cart')) {
        pagetitle = '我的購物車'
      } else if (path.startsWith('/article')) {
        pagetitle = '最新攻略'
      } else if (path.startsWith('/products')) {
        console.log('商品路由: /products')
        pagetitle = '商品專區'
      } else if (path.startsWith('/coupon')) {
        pagetitle = '優惠報報'
      } else if (path.startsWith('/member/login')) {
        pagetitle = '會員登入'
      } else if (path.startsWith('/member/register')) {
        pagetitle = '會員註冊'
      } else if (path.startsWith('/member')) {
        pagetitle = '會員專區'
      } else if (path.startsWith('/seller')) {
        pagetitle = '賣家中心'
      } else if (path.startsWith('/shop')) {
        const shopId = path.split('/shop/')[1]
        // console.log(shopId)
        const shopName = await fetchShopTitle(shopId)
        pagetitle = `${shopName} | Your Switch Life`
      }
      // 更多路徑判斷請加在這

      document.title = pagetitle
    }

    // 初始化標題載入
    handleRouteChange(router.pathname)
    // 路由改變設置標題
    router.events.on('routeChangeComplete', handleRouteChange)

    // 清理函數
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  //決定要不要套用動畫
  const addAnimation = (route) => {
    //在這裡的不用動畫
    const routesWithoutAnimation = ['/seller', '/seller/shop', '/seller/product', '/seller/product/new', '/seller/order', '/seller/comment']
    return !routesWithoutAnimation.includes(route) 
  }

  // 我把AuthProvider放在最外面 所有應用都能用
  return (
    <LoaderProvider close={3} CustomLoader={CatLoader} global={true}>
      <AuthProvider>
        <CartProvider>
          <ShippingProvider>
            <WithWebSocketProvider>
              <Head>
                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/favicons/apple-touch-icon.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/favicons/favicon-32x32.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/favicons/favicon-16x16.png"
                />
              </Head>
              
              {addAnimation(router.route) ? (
                <AnimatePresence>
                <motion.div
                  key={router.route}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'linear' }}
                >
                  {getLayout(<Component {...pageProps} />)}
                </motion.div>
              </AnimatePresence>
              ):(
                <>
                  {getLayout(<Component {...pageProps} />)}
                </>
              )}
            </WithWebSocketProvider>
          </ShippingProvider>
        </CartProvider>
      </AuthProvider>
    </LoaderProvider>
  )
}
