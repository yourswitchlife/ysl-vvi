import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config.js'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export default function authenticate(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.json({
      status: 'error',
      message: '授權失敗，沒有存取令牌',
    })
  }

  jsonwebtoken.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.json({
        status: 'error',
        message: '不合法的存取令牌',
      })
    }

    req.memberData = user
    next()
  })
}

/* 

// 如果不是像首頁這種，是需要驗證有登入才能進去的網站或CRUD，請用「authenticate」加在中間進行token驗證
// 登入後才能顯示或進去的

// 後端舉例：

import authenticate from './middlewares/authenticate.js';

app.get('/private', authenticate, (req, res) => {
  
  res.json....//CRUD或該網站
}); 


//在前端的部分則是只要有需要經過會員驗證就要加一個屬性跟值

      fetch('http://localhost:3005/api/member/auth-status', {
      method: 'GET', //或其他方法
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, //要加這一行  首頁那些(不用登入也看得到的)才不用加
      },
    })

*/
