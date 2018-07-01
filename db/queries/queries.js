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
// function selectRestaurantsFromEmail(email)
  selectRestaurantsFromEmail,
// function showCartItemsFromEmail(email)
  showCartItemsFromEmail,
  // function insertIntoOrderLines(obj)
  insertIntoOrderLines,
  // function insertOrder(email)
  insertOrder
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

function selectRestaurantsFromEmail(email){
  return knex("restaurants")
    .join("logins", "restaurants.login_id", "logins.login_id")
    .select()
    .where("logins.email", email)
}








// async function combine(email){
//   const x =  await insertOrder(email);
//   // const y =  selectOrderLines();

//   return selectOrderLines(email)
// }
// // insertItemIntoCart("user1@gmail.com")
// // insertOrder("user1@gmail.com")
// // .then(selectOrderLines)


// combine("user1@gmail.com")
// // selectOrderLines()
// .then(result =>{
//   console.log(result)
// })

function insertOrder(email){
 return knex("customers")
  .join("logins", "customers.login_id", "logins.login_id")
  .select()
  .where("logins.email", email)
  .then(result =>{
    knex("orders")
      .insert({
        customer_id: result[0].customer_id
      }).asCallback()
  })
}



async function insertIntoOrderLines(obj) {
  const orders = await knex("orders").select()
  const menuItems = await
      knex("menu_items")
      .join("items", "menu_items.item_id", "items.item_id")
      .select()
      .where("items.item_id", obj.item_id)

  // const x = await knex("orderLines")
  // const x = await knex("menu_items")
  //       .leftJoin("orders", "orders.order_id", "orderLines.order_id")
  //       .join("menu_items", "orderLines.menu_item_id", "menu_items.menu_item_id")
  //       .join("items", "menu_items.item_id", "items.item_id")
  //       .join("customers", "orders.customer_id", "customers.customer_id")
  //       .join("logins", "customers.login_id", "logins.login_id")
  //       .select()
  //       .where(
  //         {
  //           "logins.email": obj.email,
  //           "items.item_id": obj.item_id
  //         })
  // console.log("ordersquery", orders)
  // return
  return knex("orderLines").insert([
      {
        order_id: (orders[orders.length - 1].order_id) + 1,
        menu_item_id: menuItems[0].menu_item_id,
        quantity: obj.quantity,
        status: "In Progress",
        total_price: obj.quantity * menuItems[0].price,
        total_prep_time: obj.quantity * menuItems[0].prep_time
      }
      ]).asCallback()
}
