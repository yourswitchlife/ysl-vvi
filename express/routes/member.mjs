import express from 'express';
const router = express.Router();
import db from '../configs/db.js';
import authenticate from '../middlewares/authenticate-cookie.js';
import { generateHash, compareHash } from '../db-helpers/password-hash.js';
import jwt from 'jsonwebtoken'


router.post('/register', async function (req, res) {
  const { account, email } = req.body;
  let { password } = req.body;
  const level_point = 0; // 預設積分
  const shop_valid = 0; // 預設賣場沒上架
  const created_at = new Date(); // 註冊時間


  try {
    // 檢查使用者名稱
    const accountCheckQuery = 'SELECT * FROM member WHERE account = ?';
    const [accountResults] = await db.execute(accountCheckQuery, [account]);

    if (accountResults.length > 0) {
      return res.status(400).send({ message: '使用者名稱已經存在' });
    }
    // 檢查信箱
    const emailCheckQuery = 'SELECT * FROM member WHERE email = ?';
    const [emailResults] = await db.execute(emailCheckQuery, [email]);

    if (emailResults.length > 0) {
      return res.status(400).send({ message: '信箱已經存在' });
    }
    //

    password = await generateHash(password); // hash加密密碼

    const Query = `INSERT INTO member (account, password, email, level_point, shop_valid, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    await db.execute(Query, [account, password, email, level_point, shop_valid, created_at]);

    res.status(201).send({ message: '會員註冊成功' });

  } catch (error) {
    res.status(500).send({ message: '註冊失敗' });
    console.error('數據庫相關錯誤:', error);
  }
});


// 登入路由
router.post('/login', async function (req, res) {
  const { account, password } = req.body;

  try {
    // 檢查使用者是否存在
    const memberQuery = 'SELECT * FROM member WHERE account = ?';
    const [memberResults] = await db.execute(memberQuery, [account]);

    if (memberResults.length > 0) {
      const dbPassword = memberResults[0].password;
      const passwordCompare = await compareHash(password, dbPassword);

      if (!passwordCompare) {
        return res.status(401).send({ message: '使用者名稱或密碼不正確' });
      }
      //member資料表
      const memberData = {
        id: memberResults[0].id,
        otp: memberResults[0].otp,
        google_uid: memberResults[0].google_uid,
        name: memberResults[0].name,
        account: memberResults[0].account,
        phone: memberResults[0].phone,
        email: memberResults[0].email,
        address: memberResults[0].address,
        birthday: memberResults[0].birthday,
        birthday_month: memberResults[0].birthday_month,
        gender: memberResults[0].gender,
        pic: memberResults[0].pic,
        level_point: memberResults[0].level_point,
        shop_name: memberResults[0].shop_name,
        shop_site: memberResults[0].shop_site,
        shop_cover: memberResults[0].shop_cover,
        shop_info: memberResults[0].shop_info,
        shop_valid: memberResults[0].shop_valid,
        created_at: memberResults[0].created_at,
        // 
      };

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      const token = jwt.sign(memberData, accessTokenSecret, { expiresIn: '1h' });

      // 將JWT存放在HTTP標頭的Authorization中
      res.header('Authorization', `Bearer ${token}`);

      res.status(200).send({ message: '登入成功' });

    } else {
      return res.status(401).send({ message: '使用者名稱或密碼不正確' });
    }

  } catch (error) {
    console.error('登入路由發生錯誤:', error);
    res.status(500).send({ message: '登入失敗，內部伺服器錯誤', error: error.message });
  }
});



// 登出路由
router.post('/logout', function (req, res) {
  // 登出邏輯...
});

// 檢查會員狀態(登入or not) 
router.get('/auth-status', authenticate, (req, res) => {
  if (req.memberData) {
    res.json({ isLoggedIn: true, memberData: req.memberData });
  } else {
    res.json({ isLoggedIn: false });
  }
});



export default router;
