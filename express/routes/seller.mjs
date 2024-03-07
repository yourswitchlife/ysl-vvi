import express from 'express'
const router = express.Router()
import authenticate from '../middlewares/authenticate.js'
import db from '../configs/db.mjs'
// import authenticate from '../middlewares/authenticate-cookie.js'

//賣家中心後台首頁
router.get('/', authenticate, async (req, res) => {
  try {
    //假設req.memberData 包含了 memberID
    const memberId = req.memberData.id

    let [comments] = await db.execute(
      'SELECT * FROM `shop_comment` WHERE `member_id` = ?',
      [memberId]
    )
    // console.log(comments)
    // res.json(comments)
    let [orders] = await db.execute('SELECT * FROM `orders`')
    res.json(orders, comments)
    // console.log(orders)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

//賣場管理 查看資料
router.get('/shop', authenticate, async (req, res) => {
  try {
    let [shops] = await db.execute('SELECT * FROM `member-shop`')
    // console.log(shops)
    res.json(shops)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})
//賣場管理 編輯及新增賣場資料
//怎麼抓取預設值存入
//實現兩個按鈕：分別是shop_valid = 0 或shop_valid = 1
router.post('/shop/edit', authenticate, async function (req, res) {
  const { shopName, shopSite, shopCover, shopInfo, shopValid } = req.body

  try {
    //檢查賣場名稱
    const shopNameCheckQuery = 'SELECT * FROM `member-shop` WHERE shop_name = ?'
    const [shopNameResults] = await db.execute(shopNameCheckQuery, [shopName])

    if (shopNameResults.length > 0) {
      return res.status(400).send({ message: '賣場名稱已經存在' })
    }
    //檢查網址有沒有重複（預設網址是member.account)
    const shopSiteCheckQuery = 'SELECT * FROM `member-shop` WHERE shop_site = ?'
    const [shopSiteResults] = await db.execute(shopSiteCheckQuery, [shopSite])

    if (shopSiteResults.length > 0) {
      return res.status(400).send({ message: '賣場網址已經存在' })
    }

    //把資料存進去
    const Query =
      'INSERT INTO `member-shop` (`shop_name`, `shop_site`, `shop_cover`, `shop_info`, `shop_valid`) VALUES (?, ?, ?, ?, ?)'
    await db.execute(Query, [
      shopName,
      shopSite,
      shopCover,
      shopInfo,
      shopValid,
    ])

    res.status(201).send({ message: '賣場資料建立成功' })
  } catch (error) {
    res.status(500).send({ message: '建立失敗' })
    console.log('資料庫相關錯誤：', error)
  }
})

//賣家商品管理
router.get('/product', authenticate, async (req, res) => {
  try {
    let [products] = await db.execute('SELECT * FROM `product`')
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

//新增賣家商品
router.post('/product/new', authenticate, async (req, res) => {
  const {
    typeId,
    name,
    productQuantity,
    fav,
    displayPrice,
    price,
    imgCover,
    img1,
    img2,
    img3,
    imgDetails,
    releaseTime,
    language,
    ratingId,
    coOpValid,
    description,
  } = req.body
  const created_at = new Date() //創建商品日期
  //const memberId = 抓當前使用者的id
  try {
    //把資料存進去
    const Query =
      'INSERT INTO `product` (`type_id`, `name`,`product_quantity`, `fav`, `display_price`,`price`, `img_cover`, `img_1`,`img_2`,`img_3`,`img_details`,`release_time`,`language`,`rating_id`,`co_op_valid`,`description`,`created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    await db.execute(Query, [
      typeId,
      name,
      productQuantity,
      fav,
      displayPrice,
      price,
      imgCover,
      img1,
      img2,
      img3,
      imgDetails,
      releaseTime,
      language,
      ratingId,
      coOpValid,
      description,
      created_at,
    ])

    res.status(201).send({ message: '新增商品成功' })
  } catch (error) {
    res.status(500).send({ message: '新增商品失敗' })
    console.log('資料庫相關錯誤:', error)
  }
})

//商品編輯:只改成PUT裡面都還沒修改
router.put('/product/:pid', authenticate, async (req, res) => {
  const {
    typeId,
    name,
    productQuantity,
    fav,
    displayPrice,
    price,
    imgCover,
    img1,
    img2,
    img3,
    imgDetails,
    releaseTime,
    language,
    ratingId,
    coOpValid,
    description,
  } = req.body
  const created_at = new Date() //創建商品日期
  //const memberId = 抓當前使用者的id
  try {
    //把資料存進去
    const Query =
      'UPDATE `product` (`type_id`, `name`,`product_quantity`, `fav`, `display_price`,`price`, `img_cover`, `img_1`,`img_2`,`img_3`,`img_details`,`release_time`,`language`,`rating_id`,`co_op_valid`,`description`,`created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE `product`.`member_id` = '
    await db.execute(Query, [
      typeId,
      name,
      productQuantity,
      fav,
      displayPrice,
      price,
      imgCover,
      img1,
      img2,
      img3,
      imgDetails,
      releaseTime,
      language,
      ratingId,
      coOpValid,
      description,
      created_at,
    ])

    res.status(201).send({ message: '新增商品成功' })
  } catch (error) {
    res.status(500).send({ message: '新增商品失敗' })
    console.log('資料庫相關錯誤:', error)
  }
})

//賣家評價
router.get('/comment', authenticate, async (req, res) => {
  try {
    let [comments] = await db.execute('SELECT * FROM `shop_comment`')
    // console.log(comments)
    res.json(comments)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

//賣家訂單
router.get('/order', authenticate, async (req, res) => {
  try {
    let [orders] = await db.execute('SELECT * FROM `orders`')
    // console.log(orders)
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

export default router
