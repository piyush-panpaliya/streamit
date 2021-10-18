const faunadb = require('faunadb');
const q = faunadb.query

const clientQuery = new faunadb.Client({
  secret: "fnAEVPxjGBAAyFfUHk7jxqc23MNjFPWdhlcgI-fn",
  domain: 'db.eu.fauna.com',
  scheme: 'https',
});

module.exports = { clientQuery, q };

