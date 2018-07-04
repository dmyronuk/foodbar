require("dotenv").config({path: "../.env"})

const knex = require('knex')({
	client: 'pg',
  connection: {
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  host     : "localhost",
  port     : 5432,
  ssl      : true,
 }
});

knex('midterm')
.where()