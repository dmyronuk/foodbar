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
// function selectCustomerFromEmail(email)
  selectCustomerFromEmail,
// function selectAllInfoFromRestaurants(restaurantId)
  selectAllInfoFromRestaurants,
// function showCartItemsFromEmail(email)
  showCartItemsFromEmail
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
    .select("menu_items.item_name", "items.description", "items.price", "items.url", "categories.name","items.item_id")
    .where("menus.menu_id", menuId)
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
function showCartItemsFromEmail(email) {
  return knex("orderLines")
    .join("orders", "orderLines.order_id", "orders.order_id")
    .join("menu_items", "orderLines.menu_item_id", "menu_items.menu_item_id")
    .join("items", "menu_items.item_id", "items.item_id")
    .join("customers", "orders.customer_id", "customers.customer_id")
    .join("logins", "customers.login_id", "logins.login_id")
    .select("items.name", "items.description", "items.price", "items.url")
    .where("logins.email", email)
}


//Given user email, create a new active cart

// function createActiveCart(email) {
//   return knex("logins")
//     .join("customers", "logins.login_id", "customers.login_id")
//     .join("orders", "customers.customer_id", "order.customer_id")
//     .join("orderLines", "orders.order_id", "orderLines.order_id")
//     .insert({
//       order_date:
//     })

// }

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

function selectCustomerFromEmail(email){
  return knex("customers")
    .join("logins", "customers.login_id", "logins.login_id")
    .select()
    .where("logins.email", email)
}

function selectAllInfoFromRestaurants(restaurantId){
  return knex("restaurants")
    .join("logins", "restaurants.login_id", "logins.login_id")
    .select("restaurants.name", "restaurants.address", "restaurants.phone_number", "logins.email")
    .where("restaurants.restaurant_id", restaurantId)
}


function selectOrderLines(){
  /*
    1. create order
    2. pull orderLines table containing all information, including the newly created order
    3. insert item into orderLines from item_id.... use another async function???

  */
  return knex("orderLines")
        .join("orders", "orderLines.order_id", "orders.order_id")
        .join("menu_items", "orderLines.menu_item_id", "menu_items.menu_item_id")
        .join("items", "menu_items.item_id", "items.item_id")
        .join("customers", "orders.customer_id", "customers.customer_id")
        .join("logins", "customers.login_id", "logins.login_id")
        .select()
        // .then((result) =>{
        //   console.log(result)
        // })






  // const newOrder = await insertOrder(email)
    // .where("orderLines.order_id", orderId)
    // console.log(orderLinesTable);
    // console.log(orderLinesTable);
    // return orderLinesTable


    // knex("orderLines")
    // .insert({
    //   order_id: orderLinesTable[0].order_id,
    // }).asCallback()

}



function insertOrder(email){
     return knex("orders")
    .join("customers", "orders.customer_id", "customers.customer_id")
    .join("logins", "customers.login_id", "logins.login_id")
    .select()
    .where("logins.email", email)
    .then(result =>{
      knex("orders")
      .insert({
        customer_id: result[0].customer_id
      })
    })
}


async function combine(email){
  const x = await insertOrder(email)
  const y = await selectOrderLines()

  return y
}
// insertItemIntoCart("user1@gmail.com")
// insertOrder("user1@gmail.com")
// .then(selectOrderLines)
// queryOrder("user1@gmail.com")