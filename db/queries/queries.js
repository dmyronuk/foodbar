const settings = require('../settings')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex('logins').insert({
  // email: req.body.email,
  // password: bcrypt.hashSync(req.body.password, 10),
}).then(insertCustomer).asCallback()

function insertCustomer(arguments){
 return knex('logins').select().then (result => {
    knex('customers').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      login_id: result[result.length - 1].login_id
    }).asCallback()
  })
}

module.exports = {}












































































//-----------------------------------------------------------------------------------------------------------------------------------