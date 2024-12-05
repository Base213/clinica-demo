const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '45.236.130.134',
  user: 'user_db_test',
  password: '.PwdTest_2024*',
  database: 'db_test',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

module.exports = connection;
