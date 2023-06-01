const mysql = require('mysql');
const { promisify }= require('util');
const { inventory } = require('./keys');
const db = mysql.createPool(inventory);

db.getConnection((err, connection) => {

  if (err) {

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {

      console.error('Database connection was closed.');

    }

    if (err.code === 'ER_CON_COUNT_ERROR') {

      console.error('Database has to many connections');

    }

    if (err.code === 'ECONNREFUSED') {

      console.error('Database connection was refused');

    }

    console.log("error: "+err);

  }

  if (connection) connection.release();
  
  console.log('DB is Connected');

  return;
});

// Promisify Pool Querys
db.query = promisify(db.query);

module.exports = db;
