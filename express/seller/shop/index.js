const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser') //用於解析HTTP請求體。這是處理POST請求中的數據非常重要的一步，尤其是當數據以JSON或URL編碼形式發送時。
const morgan = require('morgan') //是一個HTTP請求日誌記錄器。morgan可以幫助開發者通過記錄請求信息來調試和監控應用。
const _ = require('lodash') //一個提供了大量實用函數的JavaScript工具庫，用於處理陣列、數字、對象、字符串等。雖然在這個段落的上下文中沒有直接使用到lodash，但它通常被用於簡化數據操作和處理邏輯。
const app = express() //配置middleware、路由以及啟動web服務器等。

//啟動檔案上傳＆創建路徑true來避免路徑錯誤情形
app.use(
  fileUpload({
    createParentPath: true,
  })
)

//加入其他的middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
