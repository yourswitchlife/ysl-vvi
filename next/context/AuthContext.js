//content有需要用的人用 不用身分驗證也能進入的頁面不需要條件式渲染或身分驗證就不用用他

// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState({
    isLoggedIn: false,
    memberData: null,
  });
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      fetch('http://localhost:3005/api/member/auth-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isLoggedIn) {
            setLoginStatus({ isLoggedIn: true, memberData: data.memberData });
          } else {
            setLoginStatus({ isLoggedIn: false, memberData: null });
            // 這裡就不寫跳轉路由了 因為有的人需要條件式渲染 請自行在自己的前端FETCH裡撰寫
            // router.push('/member/login');
          }
        })
        .catch((error) => {
          console.error('fetching member data錯誤', error);
        });
    }
  }, [router]);

  return (
    <AuthContext.Provider value={loginStatus}>
      {children}
    </AuthContext.Provider>
  );
};


//已經導入全站content
//在任何組件中都可以使用useAuth這個Hook了來獲得兩個東西
//1.登入與否的布林值 及 
//2.有登入的話該會員的member資料表所有欄位資料(沒登入的話是空值)。
//舉例使用方式可以參考navbar我改好的範例

/* import { useAuth } from '@/context/AuthContext';
 // 你要用的那頁一定要引入這行

你自己的前端渲染 = () => {
  const { isLoggedIn, memberData } = useAuth(); //這行狀態要加
  //我判斷式用isLoggedIn三元判斷前面是true:後面是沒登入(false要渲染的)
  //如果要取會員資料在memberData這包裡面(前提是有登入)，取東西寫memberData.欄位(member資料表欄位)
  EX:
  return (
    <div>
      { isLoggedIn ? <p>歡迎, {memberData.name}</p> : <p>請登入</p> }
    </div>
  );
}; */
