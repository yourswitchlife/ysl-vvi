import * as fs from 'fs'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import path from 'path'
import session from 'express-session'
import db from './configs/db.mjs';


// 使用檔案的session store，存在sessions資料夾
import sessionFileStore from 'session-file-store'
const FileStore = sessionFileStore(session)

// 修正 ESM 中的 __dirname 與 windows os 中的 ESM dynamic import
import { fileURLToPath, pathToFileURL } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 讓console.log呈現檔案與行號，與字串訊息呈現顏色用
import { extendLog } from '#utils/tool.js'
import 'colors'
extendLog()

// 建立 Express 應用程式
const app = express()

// cors設定，參數為必要，注意不要只寫`app.use(cors())` 跨域用設定
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3005',
      'https://localhost:9000',
      'https://sandbox-web-pay.line.me',
      undefined,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Authorization')
  next()
})

// 視圖引擎設定
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// 記錄HTTP要求
app.use(logger('dev'))
// 剖析 POST 與 PUT 要求的JSON格式資料
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 剖折 Cookie 標頭與增加至 req.cookies
app.use(cookieParser())
// 在 public 的目錄，提供影像、CSS 等靜態檔案
app.use(express.static(path.join(__dirname, 'public')))

// fileStore的選項 session-cookie使用
const fileStoreOptions = { logFn: function () {} }
app.use(
  session({
    store: new FileStore(fileStoreOptions), // 使用檔案記錄session
    name: 'SESSION_ID', // cookie名稱，儲存在瀏覽器裡
    secret: '67f71af4602195de2450faeb6f8856c0', // 安全字串，應用一個高安全字串
    cookie: {
      maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session保存30天
    },
    resave: false,
    saveUninitialized: false,
  })
)

// 載入routes中的各路由檔案，並套用api路由 START
const apiPath = '/api' // 預設路由
const routePath = path.join(__dirname, 'routes')
const filenames = await fs.promises.readdir(routePath)

for (const filename of filenames) {
  const item = await import(pathToFileURL(path.join(routePath, filename)))
  const slug = filename.split('.')[0]
  // const route = `${apiPath}/${slug === 'index' ? '' : slug}`

  app.use(`${apiPath}/${slug === 'index' ? '' : slug}`, item.default)

  // console.log(`已註冊的api路由: ${route}`)
}
// 載入routes中的各路由檔案，並套用api路由 END

// TRIGGER
(async () => {
  try {
    const triggerSQL = `
    CREATE TRIGGER after_member_coupon_insert
    AFTER INSERT ON member_coupon
    FOR EACH ROW
    BEGIN
      INSERT INTO notify_coupon (member_id, coupon_id, valid, created_at)
      VALUES (NEW.member_id, NEW.coupon_id, 0, NEW.created_at);
    END;
    `;
    await db.query(triggerSQL);
    console.log('trigger創建成功');
  } catch (error) {
    if (error.code === 'ER_TRG_ALREADY_EXISTS') {
      console.log('trigger已存在(看到這個很正常)');
    } else {
      console.error('創建trigger發生錯誤:', error);
    }
  }
})();

// 捕抓404錯誤處理
app.use(function (req, res, next) {
  next(createError(404))
})

// 錯誤處理函式
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  // 更改為錯誤訊息預設為JSON格式
  res.status(500).send({ error: err })
})

export default app
