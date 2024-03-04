//content有需要用的人用 不用身分驗證也能進入的頁面不需要條件式渲染或身分驗證就不用用他

// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//google api
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/utils/firebaseConfig';

//Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    memberId: null,
    memberData: null,
    gmember: null, 
  });
  const router = useRouter();

  useEffect(() => {
      fetch('http://localhost:3005/api/member/auth-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.isLoggedIn) {
            const memberId = data.memberId;
            console.log('Updated MemberId:', memberId);
            const memberData = await fetchMemberData(memberId);
            console.log('Updated Member Data:', memberData); 
            
            setAuthState({
              isLoggedIn: true,
              memberId: memberId,
              memberData: memberData, // 更新會員資料
            });
          } else {
            setAuthState({ isLoggedIn: false, memberId: null, memberData: null });
          }
        })
        .catch((error) => {
          console.error('Fetching member data error:', error);
        });
        
  }, [router]);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};


const fetchMemberData = async (memberId) => {
  try {
    const response = await fetch(`http://localhost:3005/api/member/info/${memberId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('response不是2XX');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching member data:', error);
    return null;
  }
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
