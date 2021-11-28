const faunadb = require('faunadb');
const q = faunadb.query

const clientQuery = new faunadb.Client({
  secret: "fnAEXlzXTHAAxRFWbIDV7b90lzrS0dFtdzXd9rG_",
  domain: 'db.eu.fauna.com',
  scheme: 'https',
});

module.exports = { clientQuery, q };

