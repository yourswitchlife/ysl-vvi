// 此檔案用於設定和啟動Node.js服務器

/**
 * Module dependencies.
 */
import app from '../app';
// 使用debug模組讀取環境變量DEBUG來決定是否輸出調試信息
import debugLib from 'debug';
const debug = debugLib('node-express-es6:server')
import http from 'http';

// 導入dotenv 使用 .env 檔案中的設定值 process.env
import 'dotenv/config.js'

/**
 * Get port from environment and store in Express.
 設定端口(port)給Express應用
 */
var port = normalizePort(process.env.PORT || '3005')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
   啟動服務器
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
   normalizePort函數檢查端口值是否有效，並將其正規化為數字或字符串，或者在無效時返回false
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
   處理特定的監聽錯誤，並給出錯誤信息
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
   onListening()用於當服務器開始監聽時，打印一條消息到控制台
 */

function onListening() {
  var addr = server.address();
//如果server.address()傳回的addr是字串，表示伺服器正在監聽一個命名管道（pipe），此時訊息將會是：「Listening on pipe {管道名稱}」。
// 反之，如果server.address()傳回的addr是Object對象，通常表示伺服器監聽的是一個網頁連接埠（port），此時訊息將是：「Listening on port {連接埠號}」。
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
