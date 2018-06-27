const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

module.exports = knex;