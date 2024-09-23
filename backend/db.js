// backend/db.js
const mysql = require('mysql2');

// Conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'todolistdb',
  timezone: 'America/Sao_Paulo' // Ajustar fuso horário do Brasil
});

module.exports = pool.promise();
