import { useEffect } from 'react'
// 樣式
import '@/styles/globals.scss'

import DefaultLayout from '@/components/layout/default-layout'
//身分驗證
import { AuthProvider } from '@/context/AuthContext'; 

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案，對應`components/layout/default-layout/index.js`
  // 或`components/layout/default-layout.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  // 我把AuthProvider放在最外面 所有應用都能用
  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}


