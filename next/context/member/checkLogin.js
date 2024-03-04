import { useEffect } from 'react';
import { useRouter } from 'next/router';

const checkLogin = () => {
  const router = useRouter();

  useEffect(() => {
    // 這裡的後端API已經寫好了
    fetch('http://localhost:3005/api/member/auth-status', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (!data.isLoggedIn) {
          // 如果沒登入就跳去登入頁面
          router.push('/login');
        } else {
          // 如果已經登入要做的事情... 自行增加
          if (router.pathname === '/login' || router.pathname === '/register') {
            router.push('/');//如果登入了還去登入頁或註冊頁就跳轉到首頁
          }
          //

          //

          //
        }
      });
  }, [router, router.asPath]);
};

export default checkLogin;