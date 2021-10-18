const faunadb = require('faunadb');
const q = faunadb.query

const clientQuery = new faunadb.Client({
  secret: "fnAEVzhBcLAAwCe8YdANqir89YaB0EsYxh7A8zr0",
  domain: 'db.eu.fauna.com',
  scheme: 'https',
});

module.exports = { clientQuery, q };

