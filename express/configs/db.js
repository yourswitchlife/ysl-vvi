import mysql from 'mysql2/promise';
const db = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'ysl_db',
    password: 'ysl',
    database: 'ysl_db'
  });

export default db;
  