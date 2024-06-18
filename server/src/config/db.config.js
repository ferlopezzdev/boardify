const mysql = require('mysql2');
const config = require('../config/data.config');

const connection = mysql.createConnection({
    user: config.db.user,
    host: config.db.host,
    password: config.db.password,
    database: config.db.database
});

connection.connect(err => {
    if (err) {
      console.error('Error al conectarse a la base de datos:', err.stack);
      return;
    }
    console.log('Conectado a la base de datos, ID', connection.threadId);
  });
  
  module.exports = connection;