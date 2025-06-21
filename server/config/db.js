import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully!');
    connection.release();
  }
});

// Promisified query method
export const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Export pool as well if needed elsewhere
export const getPool = () => pool;