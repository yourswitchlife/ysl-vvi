import jsonwebtoken from 'jsonwebtoken'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 獲得加密用字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 中介軟體middleware，用於檢查授權(authenticate) --舉例請看最下面
export default function authenticate(req, res, next) {
  // const token = req.headers['authorization']
  const token = req.cookies.token
  // console.log(token)

  // if no token
  if (!token) {
    return res.json({
      status: 'error',
      message: '授權失敗，沒有存取令牌',
    })
  }

  // verify的callback會帶有decoded payload(解密後的有效資料)，就是user的資料
  jsonwebtoken.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.json({
        status: 'error',
        message: '不合法的存取令牌',
      })
    }

    // 將user資料加到req中
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


//在前端的部分則是只要有需要經過會員驗證就要加一個屬性跟值credentials: 'include', (表示允許攜帶跨域的cookie)
 try {
      const response = await fetch('http://localhost:3005/api/member/login', {
        method: 'POST',
        credentials: 'include', //要加這一行  首頁那些(不用登入也看得到的)才不用加
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: formData.account,
          password: formData.password,
        }),
      })

*/