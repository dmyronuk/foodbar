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

module.exports = {
  insertIntoLogins,
  insertIntoCustomers,
  selectMenusFromRestaurants
}

function insertIntoLogins(obj) {
  return knex("logins").insert({
    "email": obj.email,
    "password": obj.password
  }).asCallback()
}

function insertIntoCustomers(obj){
  insertIntoLogins(obj)
  return knex("logins").select().then (result => {
    knex("customers").insert({
      first_name: obj.first_name,
      last_name: obj.last_name,
      phone_number: obj.phone_number,
      login_id: result[result.length - 1].login_id
    }).asCallback()
  })
}














































































//-----------------------------------------------------------------------------------------------------------------------------------


function selectMenusFromRestaurants(restaurantID){
  return knex("menus")
    .join("restaurants", "menus.restaurant_id", "restaurants.restaurant_id")
    .select("menus.menu_id", "menus.name")
    .where("menus.restaurant_id", restaurantID)
}

function selectItemsFromMenus(menuID){
  return knex("menu_items")
    .join("items", "menu_items.item_id", "items.item_id")
    .join("menus", "menu_items.menu_id", "menus.menu_id")
    .select("items.name", "items.name", "items.name", )
    .where("menus.menu_id", menuID)
}


selectItemsFromMenus(47).then(result => {
  console.log(result);
})