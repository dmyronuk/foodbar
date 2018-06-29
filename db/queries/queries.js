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

function insertIntoLogins(obj) {
  knex("logins").insert({
    "email": obj.email,//req.body.email,
    "password": obj.password,//bcrypt.hashSync(req.body.password, 10),
  }).asCallback()
}

function insertIntoCustomers(obj){
  insertIntoLogins({
    email:"dasd@HOTMAIL",
    password:"PASSWORD"
  })
 return knex("logins").select().then (result => {
    knex("customers").insert({
      first_name: obj.first_name,//req.body.first_name,
      last_name: obj.last_name,//req.body.last_name,
      phone_number: obj.phone_number,//req.body.phone_number,
      login_id: result[result.length - 1].login_id
    }).asCallback()
  })
}
insertIntoCustomers({
  first_name: "aasd",
  last_name: "basd",
  phone_number: "6475376750",
})
// knex("customer").join("order", "order.customer id", "=", "customer.customer_id").join("customer", "customer.login_id", "=", "login.login_id").select()
// .where({

// }).then (result => {

// })

module.exports = {}












































































//-----------------------------------------------------------------------------------------------------------------------------------