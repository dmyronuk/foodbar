require("dotenv").config({path: "../.env"})

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      host     : "localhost",
      port     : 5432,
      ssl      : true,
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
