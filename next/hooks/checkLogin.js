import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

//使用這個 checkLogin 函數來獲取登入狀態和相關的會員資訊
const checkLogin = (token) => {
  const router = useRouter()

  const [loginStatus, setLoginStatus] = useState({
    isLoggedIn: false,
    memberData: null,
  })

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    // 同時確認會員狀態、解析 Token 並向後端請求會員資訊
    fetch('http://localhost:3005/api/member/auth-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, //從cookie拿的token
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data:', data)

        if (data.isLoggedIn) {
          // 登入成功
          setLoginStatus({ isLoggedIn: true, memberData: data.memberData })
        } else {
          setLoginStatus({ isLoggedIn: false, memberData: null });
          // 如果沒登入就跳去登入頁面
          // router.push('/member/login') 這裡不跳因為這支是寫條件渲染用
        }
      })
      .catch((error) => {
        console.error('Error fetching member data:', error)
      })
  }, [router])

  return loginStatus
}

export default checkLogin
