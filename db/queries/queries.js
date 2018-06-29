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
  selectMenusFromRestaurants,
  selectItemsFromMenus
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

/*return every item from menu_id with name(of menu), item_name, description, price, url*/
function selectItemsFromMenus(menuID){
  return knex("menus")
    .join("menu_items", "menus.menu_id", "menu_items.menu_id")
    .join("items", "menu_items.item_id", "items.item_id")
    .join("categories", "items.category_id", "categories.category_id")
    .select("menu_items.item_name", "items.description", "items.price", "items.url", "categories.name")
    .where("menus.menu_id", menuID)
    .then(result => {
      console.log(result)
    })
}

selectItemsFromMenus(2)

function getPass(email) {
  return knex("logins")
    .select("logins.password")
    .where("email", email)
    .then(result=>{
      console.log(result)
    })
}








































































//-----------------------------------------------------------------------------------------------------------------------------------


function selectMenusFromRestaurants(restaurantID){
  return knex("menus")
    .join("restaurants", "menus.restaurant_id", "restaurants.restaurant_id")
    .select("menus.menu_id", "menus.name")
    .where("menus.restaurant_id", restaurantID)
}

// function selectItemsFromMenus(menuID){

// }
