import express from 'express';
const router = express.Router();
import db from '../configs/db.mjs';

// middleware
import authenticate from '../middlewares/authenticate-cookie.js';
// tools
import { generateHash, compareHash } from '../db-helpers/password-hash.js';
import jwt from 'jsonwebtoken'
// 用來處理上傳的檔案
import multer from 'multer';
import path from 'path';
// OTP NM API
import nodemailer from 'nodemailer';



router.post('/register', async function (req, res) {
  const { account, email } = req.body
  let { password } = req.body
  const level_point = 0 // 預設積分
  const shop_valid = 0 // 預設賣場沒上架
  const created_at = new Date() // 註冊時間

  try {
    // 檢查使用者名稱
    const accountCheckQuery = 'SELECT * FROM member WHERE account = ?'
    const [accountResults] = await db.execute(accountCheckQuery, [account])

    if (accountResults.length > 0) {
      return res.status(400).send({ message: '使用者名稱已經存在' })
    }
    // 檢查信箱
    const emailCheckQuery = 'SELECT * FROM member WHERE email = ?'
    const [emailResults] = await db.execute(emailCheckQuery, [email])

    if (emailResults.length > 0) {
      return res.status(400).send({ message: '信箱已經存在' })
    }
    //

    password = await generateHash(password) // hash加密密碼

    const Query = `INSERT INTO member (account, password, email, level_point, shop_valid, created_at) VALUES (?, ?, ?, ?, ?, ?)`
    await db.execute(Query, [
      account,
      password,
      email,
      level_point,
      shop_valid,
      created_at,
    ])

    res.status(201).send({ message: '會員註冊成功' })
  } catch (error) {
    res.status(500).send({ message: '註冊失敗' })
    console.error('數據庫相關錯誤:', error)
  }
})

// 登入路由
router.post('/login', async function (req, res) {
  const { account, password } = req.body

  try {
    // 檢查使用者是否存在
    const memberQuery = 'SELECT * FROM member WHERE account = ?';
    const [memberResults] = await db.execute(memberQuery, [account]);

    if (memberResults.length > 0) {
      const dbPassword = memberResults[0].password;
      const passwordCompare = await compareHash(password, dbPassword);

      if (!passwordCompare) {
        return res.status(401).send({ message: '使用者名稱或密碼不正確' })
      }
      //member ID
      const memberId = memberResults[0].id;

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      const token = jwt.sign({ id: memberId }, accessTokenSecret, { expiresIn: '3h' });
      // 過期後的做法待做
      // 將JWT存放在HTTP標頭的Authorization中
      // res.header('Authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true })
      res.status(200).send({ message: '登入成功' });

    } else {
      return res.status(401).send({ message: '使用者名稱或密碼不正確' })
    }
  } catch (error) {
    console.error('登入路由發生錯誤:', error)
    res
      .status(500)
      .send({ message: '登入失敗，內部伺服器錯誤', error: error.message })
  }
});


// google登入路由
router.post('/google-login', async function (req, res) {
  const { uid, email, displayName, photoURL } = req.body;

  const google_uid = uid;
  const account = displayName;
  const pic = photoURL;
  const level_point = 0; // 預設積分
  const shop_valid = 0; // 預設店沒上架
  const created_at = new Date();

  try {
    // 使用google_uid来检查用户是否已存在
    const gmCheckQuery = 'SELECT * FROM member WHERE google_uid = ?';
    const [gmResults] = await db.execute(gmCheckQuery, [google_uid]);

    let memberId;

    if (gmResults.length > 0) {
      // 已用GOOGLE登入過
      memberId = gmResults[0].id;
    } else {
      // 沒 先註冊再登入
      const creategmQuery = `INSERT INTO member (account, email, google_uid, pic, level_point, shop_valid, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const [createResult] = await db.execute(creategmQuery, [
        account,
        email,
        google_uid,
        pic,
        level_point,
        shop_valid,
        created_at,
      ]);
      memberId = createResult.insertId;
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const token = jwt.sign({ id: memberId }, accessTokenSecret, { expiresIn: '3h' });

    // res.header('Authorization', `Bearer ${token}`);
    res.cookie('token', token, { httpOnly: true })
    return res.json({
      status: 'success',
      data: {
        token,
      },
    })

  } catch (error) {
    console.error('GOOGLELOGIN ERROR:', error);
    res.status(500).send({ message: 'GOOGLELOGIN ERROR', error: error.message });
  }
});




// 登出路由
router.post('/logout', function (req, res) {
  res.cookie('token', '', { expires: new Date(0) });


  res.status(200).send({ message: '登出成功' });
});



// 檢查會員狀態(登入or not) 
router.get('/auth-status', authenticate, (req, res) => {
  if (req.memberData) {
    const memberId = req.memberData.id;
    res.json({ isLoggedIn: true, memberId: memberId });

  } else {
    res.json({ isLoggedIn: false });
  }
});


// 查詢並更新會員資料
router.get('/info/:id', async (req, res) => {
  const memberId = req.params.id;

  const query = `SELECT * FROM member WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [memberId]);

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'Member not found.' });
    }
  } catch (error) {
    console.error('Error fetching member data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


//修改個人資料account
router.put('/account/:memberId', async (req, res) => {
  const memberId = req.params.memberId;
  const { name, gender, address, birthday, phone, birthday_month } = req.body;



  const updateQuery = `UPDATE member SET name = ?, gender = ?, address = ?, birthday = ?, birthday_month = ?, phone = ? WHERE id = ?`;

  try {
    const [updateResults] = await db.execute(updateQuery, [name, gender, address, birthday, birthday_month, phone, memberId]);

    if (updateResults.affectedRows > 0) {
      // 更新成功
      const [results] = await db.execute(`SELECT * FROM member WHERE id = ?`, [memberId]);
      res.status(200).json(results[0]);
    } else {
      // 更新失敗
      res.status(404).json({ error: 'member not found.' });
    }
  } catch (error) {
    console.error('Error updating member data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }

});


//pic改按鈕上傳
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploadImg/profile-pic'); // 存放上傳檔案的資料夾
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 以時間戳記作為檔名
  },
});
const upload = multer({ storage: storage });

router.put('/pic/:memberId', upload.single('file'), async (req, res) => {
  const memberId = req.params.memberId;
  const filePath = req.file.path; // 上傳後的檔案路徑
  const filename = path.basename(filePath);

  const picQuery = 'UPDATE member SET pic = ? WHERE id = ?';

  try {
    // 執行 SQL 更新
    const [picResults] = await db.execute(picQuery, [filename, memberId]);

    if (picResults.affectedRows > 0) {
      // 更新成功
      res.status(200).json({ success: true, message: '照片上傳成功' });
    } else {
      // 更新失敗
      res.status(404).json({ error: '照片上傳失敗' });
    }
  } catch (error) {
    console.error('Error updating member data:', error);
    res.status(500).json({ error: '上傳途中發生錯誤' });
  }
});




// forget password
//-拿驗證碼
// 郵件寄送(基於SMTP得API)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yslife.project@gmail.com',
    pass: 'yslteammfee442024'
  }
});

// 生成OTP n6
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 发送OTP的路由处理函数
router.post('/api/member/get-code', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }
  const otp = generateOTP();
  const expTimestamp = new Date();
  expTimestamp.setMinutes(expTimestamp.getMinutes() + 10); // 10mins

  try {
    // 插入或更新数据库中的OTP记录
    await db.execute(
      `INSERT INTO otp (member_id, email, token, exp_timestamp) VALUES ((SELECT id FROM member WHERE email = ?), ?, ?, ?)
           ON DUPLICATE KEY UPDATE token = ?, exp_timestamp = ?`,
      [email, email, otp, expTimestamp, otp, expTimestamp]
    );

    // 寄信
    await transporter.sendMail({
      from: 'yslife.project@gmail.com',
      to: email,
      subject: '哈囉！此信為您的重設密碼請求。',
      html: `我們收到了您的密碼重設請求，請於頁面上輸入OTP驗證碼：<br>
      <div style="color: red; font-size: 25px; font-weight: bold;">${otp}</div><br>
      此驗證碼十分鐘內有效，如果您並沒有進行重設密碼請求，請盡速聯繫YSL團隊客服。<br><br><br>
      YSL全體祝福您有個愉快的一天。<br>
      BE GAMER, BE HAPPIER! :)`
    });

    await db.end();
    res.send('OTP sent to your email.');
  } catch (error) {
    console.error('Failed to send OTP:', error);
    res.status(500).send('Failed to send OTP.');
  }
});

export default router
