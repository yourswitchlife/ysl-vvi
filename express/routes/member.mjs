import express from 'express';
const router = express.Router();
import db from '../configs/db.js';

import { generateHash, compareHash } from '../db-helpers/password-hash.js';
import jwt from 'jsonwebtoken';

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
    const userQuery = 'SELECT * FROM member WHERE account = ?';
    const [userResults] = await db.execute(userQuery, [account]);

    if (userResults.length > 0) {
      const dbPassword = userResults[0].password;
      const passwordCompare = await compareHash(password, dbPassword);
      // console.log('passwordCompare:', passwordCompare);

      if (!passwordCompare) {
        return res.status(401).send({ message: '使用者名稱或密碼不正確' });
      }

      // 登入成功的處理
      // 使用者帳號密碼正確，生成JWT
      const userId = userResults[0].id; 
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'fallback_secret_key';
      const token = jwt.sign({ userId }, accessTokenSecret, { expiresIn: '1h' });

      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 建議僅在生產環境中啟用 Secure
      });
      
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

export default router;
