const { Client } = require('pg');

const client = new Client({
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  host: 'localhost',
  port: '5432',
  user: 'root',
  password: 'root',
  database: 'cryptofolio',
});

client.connect();

console.log('Connection with DB established');

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
