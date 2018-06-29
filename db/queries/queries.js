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
  // function insertIntoLogins(obj)
  insertIntoLogins,
  // function insertIntoCustomers(obj)
  insertIntoCustomers,
// function selectMenusFromRestaurants(restaurantId)
  selectMenusFromRestaurants,
// function selectItemsFromMenu(menuId)
  selectItemsFromMenu,
// function getPass(email) 
  getPass,
// function selectEmailFromCustomer(customerId)
  selectEmailFromCustomer,
// function selectAllInfoFromRestaurants(restaurantId)
  selectAllInfoFromRestaurants,
// function showCartItems(orderId)
  showCartItems
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
function selectItemsFromMenu(menuId){
  return knex("menus")
    .join("menu_items", "menus.menu_id", "menu_items.menu_id")
    .join("items", "menu_items.item_id", "items.item_id")
    .join("categories", "items.category_id", "categories.category_id")
    .select("menu_items.item_name", "items.description", "items.price", "items.url", "categories.name")
    .where("menus.menu_id", menuID)
    .then(result=>{
      const groupedItems = {}
      for (let i = 0; i < result.length; i++) {
        if (!groupedItems[result[i].name]) {
          groupedItems[result[i].name] = []
          groupedItems[result[i].name].push(result[i])
        } else {
          groupedItems[result[i].name].push(result[i])
        }
      }
      return groupedItems;
    })
}

/*gets a hashed password that matches its email*/
function getPass(email) {
  return knex("logins")
    .select("logins.password")
    .where("email", email)
}

/*given an order_id, shows items in a cart*/
function showCartItems(orderId) {
  return knex("orderLines")
    .join("menu_items", "orderLines.menu_item_id", "menu_items.menu_item_id")
    .join("items", "menu_items.item_id", "items.item_id")
    .select("items.name", "items.description", "items.price", "items.url")
    .where("orderLines.order_id", orderId)
}
// showCartItems(1) /*for testing*/


//Given user email, create a new active cart
function createActiveCart(email) {
  return knex("logins")
    .join("customers", "logins.login_id", "customers.login_id")
    .join("orders", "customers.customer_id", "order.customer_id")
    .join("orderLines", "orders.order_id", "orderLines.order_id")
}





















































//-----------------------------------------------------------------------------------------------------------------------------------


function selectMenusFromRestaurants(restaurantId){
  return knex("menus")
    .join("restaurants", "menus.restaurant_id", "restaurants.restaurant_id")
    .select("menus.menu_id", "menus.name")
    .where("menus.restaurant_id", restaurantId)
}

function selectEmailFromCustomer(customerId){
  return knex("customers")
    .join("logins", "customers.login_id", "logins.login_id")
    .select("logins.email")
    .where("customers.customer_id", customerId)
}

function selectAllInfoFromRestaurants(restaurantId){
  return knex("restaurants")
    .join("logins", "restaurants.login_id", "logins.login_id")
    .select("restaurants.name", "restaurants.address", "restaurants.phone_number", "logins.email")
    .where("restaurants.restaurant_id", restaurantId)
}


function insertItemIntoCart(restaurantId){
  return knex("orderLines")
    .join("menu_items", "orderLines.menu_item_id", "menu_items.menu_item_id")
    .join("items", "menu_items.item_id", "items.item_id")
    .select()
    // .where("orderLines.order_id", orderId)

  //   return knex("logins").insert({
  //   "email": obj.email,
  //   "password": obj.password
  // }).asCallback()
}



function createOrder(email){
     return knex("orders")
    .join("customers", "orders.customer_id", "customers.customer_id")
    .join("logins", "customers.login_id", "logins.login_id")
    .select()
    .where("logins.email", email)
    .then(result =>{
      knex("orders")
      .insert({
        customer_id: result[0].customer_id
      }).asCallback()
    })

    

  //   return knex("logins").insert({
  //   "email": obj.email,
  //   "password": obj.password
  // }).asCallback()
}

insertItemIntoCart().then(result =>{
  console.log(result)
})