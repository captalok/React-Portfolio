import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '&&Alok&&24',
  database: 'portfoliomysql'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    return;
  }
  
  console.log('✅ Connected to MySQL database!');
  
  connection.query('SELECT * FROM tblusers', (err, results) => {
    if (err) {
      console.error('❌ Query failed:', err.message);
    } else {
      console.log('📊 Users in database:', results);
    }
    connection.end();
  });
});