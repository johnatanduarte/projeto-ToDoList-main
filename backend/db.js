// backend/db.js
const mysql = require('mysql2');

// Conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'bianca',
  database: 'todolistdb'
});

module.exports = pool.promise();
