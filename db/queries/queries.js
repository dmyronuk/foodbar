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

function insertLogin(obj) {
  knex("login").insert({
    "email": obj.email,//req.body.email,
    "password": obj.password,//bcrypt.hashSync(req.body.password, 10),
  }).then(insertCustomer).asCallback()
}

function insertCustomer(obj){
 return knex("logins").select().then (result => {
    knex("customer").insert({
      first_name: obj.first_name//req.body.first_name,
      last_name: obj.last_name//req.body.last_name,
      phone_number: obj.phone_number//req.body.phone_number,
      login_id: obj.login_id//result[result.length - 1].login_id
    }).asCallback()
  })
}

knex("customer").join("order", "order.customer id", "=", "customer.customer_id").join()

module.exports = {}












































































//-----------------------------------------------------------------------------------------------------------------------------------