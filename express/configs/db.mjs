import mysql from 'mysql2/promise.js'

const db = await mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'ysl_db',
  password: 'ysl',
  database: 'ysl_db',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
})

export default db
