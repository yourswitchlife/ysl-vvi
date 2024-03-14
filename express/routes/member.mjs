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
  const mission_start = 0 // 預設新戶
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

    const Query = `INSERT INTO member (account, password, email, level_point, shop_valid, mission_start, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`
    await db.execute(Query, [
      account,
      password,
      email,
      level_point,
      shop_valid,
      mission_start,
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
    const memberQuery = 'SELECT * FROM member WHERE account = ?'
    const [memberResults] = await db.execute(memberQuery, [account])

    if (memberResults.length > 0) {
      const dbPassword = memberResults[0].password
      const passwordCompare = await compareHash(password, dbPassword)

      if (!passwordCompare) {
        return res.status(401).send({ message: '使用者名稱或密碼不正確' })
      }
      //member ID
      const memberId = memberResults[0].id

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

      const token = jwt.sign({ id: memberId }, accessTokenSecret, {
        expiresIn: '3h',
      })
      // 過期後的做法待做
      // 將JWT存放在HTTP標頭的Authorization中
      // res.header('Authorization', `Bearer ${token}`);
      res.cookie('token', token, { httpOnly: true })
      res.status(200).send({ message: '登入成功' })
    } else {
      return res.status(401).send({ message: '使用者名稱或密碼不正確' })
    }
  } catch (error) {
    console.error('登入路由發生錯誤:', error)
    res
      .status(500)
      .send({ message: '登入失敗，內部伺服器錯誤', error: error.message })
  }
})

// google登入路由
router.post('/google-login', async function (req, res) {
  const { uid, email, displayName, photoURL } = req.body

  const google_uid = uid
  const account = displayName
  const pic = photoURL
  const level_point = 0 // 預設積分
  const shop_valid = 0 // 預設店沒上架
  const mission_start = 0
  const created_at = new Date()

  try {
    // 使用google_uid来检查用户是否已存在
    const gmCheckQuery = 'SELECT * FROM member WHERE google_uid = ?'
    const [gmResults] = await db.execute(gmCheckQuery, [google_uid])

    let memberId

    if (gmResults.length > 0) {
      // 已用GOOGLE登入過
      memberId = gmResults[0].id
    } else {
      // 沒 先註冊再登入
      const creategmQuery = `INSERT INTO member (account, email, google_uid, pic, level_point, shop_valid, mission_start, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      const [createResult] = await db.execute(creategmQuery, [
        account,
        email,
        google_uid,
        pic,
        level_point,
        shop_valid,
        mission_start,
        created_at,
      ])
      memberId = createResult.insertId
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const token = jwt.sign({ id: memberId }, accessTokenSecret, {
      expiresIn: '3h',
    })

    // res.header('Authorization', `Bearer ${token}`);
    res.cookie('token', token, { httpOnly: true })
    return res.json({
      status: 'success',
      data: {
        token,
      },
    })
  } catch (error) {
    console.error('GOOGLELOGIN ERROR:', error)
    res.status(500).send({ message: 'GOOGLELOGIN ERROR', error: error.message })
  }
})

// 登出路由
router.post('/logout', function (req, res) {
  res.cookie('token', '', { expires: new Date(0) })

  res.status(200).send({ message: '登出成功' })
})

// 檢查會員狀態(登入or not)
router.get('/auth-status', authenticate, (req, res) => {
  if (req.memberData) {
    const memberId = req.memberData.id
    res.json({ isLoggedIn: true, memberId: memberId })
  } else {
    res.json({ isLoggedIn: false })
  }
})

// 查詢並更新會員資料
router.get('/info/:id', async (req, res) => {
  const memberId = req.params.id

  const query = `SELECT * FROM member WHERE id = ?`;

  try {
    const [results] = await db.execute(query, [memberId])

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'Member not found.' });
    }
  } catch (error) {
    console.error('Error fetching member data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
})

// 修改個人資料account
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

// 結帳後積分更新
router.patch('/levelup', async (req, res) => {
  const memberId = req.query.memberId;
  console.log(memberId)
  const { totalPrice } = req.body; 
  console.log(totalPrice)
  try {
    //  level_point 
    const updatePointQuery = `
    UPDATE member
    SET level_point = level_point + ?
    WHERE id = ?;
  `;
    const [result] = await db.execute(updatePointQuery, [totalPrice, memberId]);
    
    if (result.affectedRows > 0) {// 再次查詢會員資料以獲取最新的level_point
      const getMemberQuery = `
      SELECT level_point
      FROM member
      WHERE id = ?;
      `;
      const [memberResult] = await db.execute(getMemberQuery, [memberId]);
      const updatedLevelPoint = memberResult[0].level_point;
      // 檢查更新後的 level_point 是否到達下一等級
      if (updatedLevelPoint >= 6000 && updatedLevelPoint < 13000) {
          // 1張免運
          await db.execute('INSERT INTO member_coupon (member_id, coupon_id, status, created_at)VALUES (?, ?, ?, NOW())', [memberId, 43, 0]);
          
      } else if (updatedLevelPoint >= 13000 && updatedLevelPoint < 20000) {
          // 2張免運
          await db.execute(`
          INSERT INTO member_coupon (member_id, coupon_id, status, created_at)
          VALUES (?, ?, ?, NOW()), (?, ?, ?, NOW())
          `, [memberId, 43, 0, memberId, 43, 0]);

      } else if (updatedLevelPoint >= 20000) {
          // 3張免運
          // 這裡待修給優惠券的邏輯、時間限制
          await db.execute(`
          INSERT INTO member_coupon (member_id, coupon_id, status, created_at)
          VALUES (?, ?, ?, NOW()), (?, ?, ?, NOW()), (?, ?, ?, NOW())
          `, [memberId, 43, 0, memberId, 43, 0, memberId, 43, 0]);
      }
      
      // 返回成功訊息
      res.json({ message: '會員資料更新成功' });
  } else {
      throw new Error('沒有找到符合條件的會員');
  }
  } catch (error) {
    console.error('更新會員資料失敗:', error);
    res.status(500).json({ error: '更新會員資料失敗' });
  }
});

// pic改按鈕上傳
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile-pic'); // 存放上傳檔案的資料夾
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
// -拿驗證碼
// 郵件寄送(基於SMTP得API)

router.post('/get-code', async (req, res) => {
  const { email } = req.body;
  console.log('email:', email);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_TO_EMAIL,
      pass: process.env.SMTP_TO_PASSWORD,
    }
  });
  await transporter.verify();

  // 生成OTP n6
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // 檢查特定email 
    const [existingEmail] = await db.execute(
      'SELECT email FROM member WHERE email = ?',
      [email]
    );
    if (existingEmail.length === 0) {
      // 如果 email 不存在於資料表中，返回相應的錯誤訊息
      return res.status(400).json({ error: ' 請輸入有效的註冊會員電子郵件地址。' });
    }
    if (!email) {
      return res.status(400).json({ error: '請輸入email。' });
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
      const mailOptions = {
        from: process.env.SMTP_TO_EMAIL,
        to: email,
        subject: '哈囉！此信為您的重設密碼請求。',
        html: `我們收到了您的密碼重設請求，請於頁面上輸入OTP驗證碼：<br>
        <div style="color: red; font-size: 25px; font-weight: bold;">${otp}</div><br>
        此驗證碼十分鐘內有效，如果您並沒有進行重設密碼請求，請盡速聯繫YSL團隊客服。<br><br><br>
        YSL全體祝福您有個愉快的一天。<br>
        BE GAMER, BE HAPPIER! :)`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error sending email')
        }
        console.log(info);
        res.send('OTP sent to your email.');
      });
    } catch (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: error.message });
    }
  } catch (outerError) {
    console.error('Error in outer try-catch block:', outerError);
    res.status(500).json({ error: outerError.message });
  }
});

// reset password
router.post('/reset-password', async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    // 檢查驗證碼是否符合

    const [otpRecord] = await db.execute(
      'SELECT * FROM otp WHERE email = ? AND token = ? ORDER BY id DESC LIMIT 1',
      [email, verificationCode]
    );
    const otpResult = otpRecord[0];

    if (!otpResult || new Date() > new Date(otpResult.exp_timestamp)) {
      return res.status(400).json({ error: '驗證碼無效或已過期' });
    }

    // 修改密碼
    const password = await generateHash(newPassword); // hash加密密碼
    await db.execute(
      'UPDATE member m ' +
      'JOIN otp o ON m.id = o.member_id ' +
      'SET m.password = ? ' +
      'WHERE o.id = ?',
      [password, otpResult.id]
    );

    // 刪除使用過的 OTP
    await db.execute('DELETE FROM otp WHERE id = ?', [otpResult.id]);
    return res.status(200).json({ message: '密碼修改成功' });

  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ error: '內部伺服器錯誤' });
  }
});

// fav-shop
router.get('/fav-shop', async (req, res) => {
  const buyerId = req.query.memberId
  const orderBy = req.query.orderBy || 'created_at';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;


  try {
    // 總項目
    const [totalItemsResult] = await db.execute(
      'SELECT COUNT(*) AS totalItems FROM fav_shop WHERE buyer_id = ?',
      [buyerId]
    );
    const totalItems = totalItemsResult[0].totalItems;

    // 總頁數
    const totalPages = Math.ceil(totalItems / limit);

    let orderClause = '';
    if (orderBy === 'created_at_asc') {
      orderClause = 'ORDER BY `created_at` ASC';
    } else if (orderBy === 'created_at') {
      // 預設或指定為 created_at 時，使用降序排序
      orderClause = 'ORDER BY `created_at` DESC';
    }
    const [data] = await db.execute(`
    SELECT 
    fs.*, 
    m.shop_name, 
    m.shop_site, 
    m.pic,
    COUNT(DISTINCT ps.id) AS totalProducts,
    COALESCE(o.totalOrders, 0) AS totalOrders,
    COUNT(DISTINCT fs.seller_id) AS totalFavs,
    ROUND(COALESCE(sc.averageRating, 0), 1) AS averageRating,
    COUNT(DISTINCT shop_comment.id) AS CommentCount
    FROM 
    fav_shop fs
    JOIN 
    member m ON fs.seller_id = m.id
    LEFT JOIN 
    product ps ON fs.seller_id = ps.member_id
    LEFT JOIN (
      SELECT member_seller_id, COALESCE(SUM(quantity), 0) AS totalOrders
      FROM orders
      GROUP BY member_seller_id
    ) o ON fs.seller_id = o.member_seller_id
    LEFT JOIN (
      SELECT shop_id, AVG(rating) AS averageRating
      FROM shop_comment
      GROUP BY shop_id
    ) sc ON fs.seller_id = sc.shop_id
    LEFT JOIN 
      shop_comment ON fs.seller_id = shop_comment.shop_id
    WHERE 
    fs.buyer_id = ?
    GROUP BY 
    fs.id
    ${orderClause}
    LIMIT ?, ?`,
      [buyerId, offset, limit]);

    const responseData = {
      items: data,
      totalItems,
      totalPages,
    };
    console.log(responseData)
    res.json(responseData);

  } catch (error) {
    console.error('取得收藏列表出錯:', error);
    res.status(500).send('伺服器錯誤');
  }
});

// fav-shop-cancel
router.delete('/unfav-shop', async (req, res) => {
  const memberId = req.query.memberId;
  const sellerId = req.query.sellerId;

  try {
    const unfavQuery = 'DELETE FROM fav_shop WHERE buyer_id = ? AND seller_id = ?';
    const [unfavshopResult] = await db.execute(unfavQuery, [memberId, sellerId]);

    if (unfavshopResult.affectedRows > 0) {
      res.status(200).json({ success: true, message: '取消收藏成功' });
    } else {
      res.status(404).json({ success: false, message: '找不到相應的收藏記錄' });
    }
  } catch (error) {
    console.error('取消收藏失敗', error);
    res.status(500).json({ success: false, message: '取消收藏失敗' });
  }
});

// fav-product
router.get('/fav-product', async (req, res) => {
  const buyerId = req.query.memberId;
  const orderBy = req.query.orderBy || 'created_at';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  try {
    // Total items
    const [totalItemsResult] = await db.execute(
      'SELECT COUNT(*) AS totalItems FROM fav_product WHERE member_id = ?',
      [buyerId]
    );
    const totalItems = totalItemsResult[0].totalItems;

    // Total pages
    const totalPages = Math.ceil(totalItems / limit);

    let orderClause = '';
    if (orderBy === 'created_at_asc') {
      orderClause = 'ORDER BY fp.created_at ASC';
    } else if (orderBy === 'created_at') {
      orderClause = 'ORDER BY fp.created_at DESC';
    }

    const [data] = await db.execute(`
      SELECT
        fp.id AS favProductId,
        FORMAT(p.display_price, 0) AS display_price,
        FORMAT(p.price, 0) AS price,
        DATE_FORMAT(p.release_time, '%Y-%m-%d') AS release_date,
        p.id AS productId,
        p.rating_id,
        p.type_id,
        p.name AS productName,
        p.language,
        p.product_quanty,
        p.img_cover,
        m.id AS memberId,
        m.shop_name,
        m.shop_site,
        fp.created_at
      FROM
        fav_product fp
      JOIN
        product p ON fp.product_id = p.id
      JOIN
        member m ON p.member_id = m.id
      WHERE
        fp.member_id = ?
      ${orderClause}
      LIMIT ?, ?`,
      [buyerId, offset, limit]
    );

    const responseData = {
      items: data,
      totalItems,
      totalPages,
    };

    res.json(responseData);
    // console.log(responseData);
  } catch (error) {
    console.error('Error fetching favorite product list:', error);
    res.status(500).send('Internal Server Error');
  }
});

// fav-product-cancel
router.delete('/unfav-product', async (req, res) => {
  const memberId = req.body.memberId;
  const productIds = req.body.productIds; // array
  // console.log(productIds)
  const productHolders = productIds.map(() => '?').join(', ');

  try {
    const unfavPQuery = `DELETE FROM fav_product WHERE member_id = ? AND id IN (${productHolders})`;
    const [unfavPResult] = await db.execute(unfavPQuery, [memberId, ...productIds]);

    if (unfavPResult.affectedRows > 0) {
      res.status(200).json({ success: true, message: '取消收藏成功' });
    } else {
      res.status(404).json({ success: false, message: '找不到對應收藏紀錄' });
    }
  } catch (error) {
    console.error('取消收藏失敗', error);
    res.status(500).json({ success: false, message: '取消收藏失敗' });
  }
});


// order (含篩選)
router.get('/order', async (req, res) => {
  const buyerId = req.query.memberId;
  const orderBy = req.query.orderBy || 'created_at';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  const selectedFilter = req.query.selectedFilter;

  let statusFilter = '';
  let queryParams = [parseInt(buyerId)]; // first buyerId
  let totalsellerParams = [parseInt(buyerId)];

  if (selectedFilter !== null && selectedFilter !== undefined && selectedFilter !== '') {
    const parsedFilter = parseInt(selectedFilter);
    if (!isNaN(parsedFilter)) {
      statusFilter = 'AND o.shipping_status = ?';
      queryParams.push(parsedFilter);
      totalsellerParams.push(parsedFilter);
    }
  }
  // and offset&limit
  queryParams.push(offset, limit);

  // console.log(selectedFilter);
  // console.log(queryParams);
  // console.log(totalItemsParams)

  try {
    // 總項目
    const [totalsellerResult] = await db.execute(
      `SELECT o.member_seller_id, COUNT(o.id) AS totalseller FROM orders o WHERE member_buyer_id = ? ${statusFilter}`,
      totalsellerParams
    );
    const totalseller = totalsellerResult[0].totalseller;

    // 總頁數
    const totalPages = Math.ceil(totalseller / limit);

    // orderby
    let orderClause = '';
    if (orderBy === 'order_date_asc') {
      orderClause = 'ORDER BY `order_date` ASC';
    } else if (orderBy === 'order_date') {
      orderClause = 'ORDER BY `order_date` DESC';
    }

    const [data] = await db.execute(`
    SELECT 
      o.member_seller_id,
      o.quantity,
      o.shipping_status,
      DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i:%s') AS order_date,
      m_seller.shop_name AS seller_shop_name,
      m_seller.shop_site AS seller_shop_site,
      CONCAT('[', GROUP_CONCAT('{"img_cover": "', p.img_cover, '", "name": "', p.name, '", "price": "', FORMAT(p.price, 0), '"}' SEPARATOR ','), ']') AS productItems
    FROM 
      orders o
    JOIN 
      member m_seller ON o.member_seller_id = m_seller.id
    JOIN 
      product p ON o.product_id = p.id
    WHERE 
      o.member_buyer_id = ? 
    ${statusFilter} 
    GROUP BY
      o.member_seller_id, 
      DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i:%s')
    ${orderClause}
    LIMIT ?, ?
    `, queryParams);

    const responseData = {
      items: data, //含productItems
      totalseller,
      totalPages,
    };
    console.log(offset)

    res.json(responseData);
    console.log(responseData)

  } catch (error) {
    console.error('取得收藏列表出錯:', error);
    res.status(500).send('伺服器錯誤');
  }
});

// 


export default router
