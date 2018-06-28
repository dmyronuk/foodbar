
exports.seed = function(knex, Promise) {


  function deleteOrderLine(){
    return knex("orderLine").del()
  }

  function deleteOrder(){
    return knex("order").del()
  }

  function deleteMenuItem(){
    return knex("menuItem").del()
  }

  function deleteItem(){
    return knex("item").del()
  }

  function deleteMenu(){
    return knex("menu").del()
  }

  function deleteRestaurant(){
    return knex("restaurant").del()
  }

  function deleteCustomer(){
    return knex("customer").del()
  }

  function deleteCategory(){
    return knex("category").del()
  }

  function deleteLogin(){
    return knex("login").del()
  }

  function insertLogin(){
    return knex("login").insert([
      {
        email: "user1@gmail.com",
        password: "z"
      },
      {
        email: "user2@gmail.com",
        password: "z"
      },
      {
        email: "restaurant@gmail.com",
        password: "z"
      },

    ]).returning("*")
  }

  function insertCategory(){
    return knex("category").insert([
      {name: "appetizers"},
      {name: "mains"},
      {name: "beverages"}
    ]).returning("*")
  }

  function insertCustomer(login){
    console.log(login[0].login_id);
    return knex("customer").insert([
    {
      login_id: login[0].login_id,
      first_name: "User",
      last_name: "One",
      phone_number: "6476096899"
    },
    {
      login_id: login[1].login_id,
      first_name: "User",
      last_name: "Two",
      phone_number: "6476096899"
    }
    ]).returning("*")
  }

  function insertRestaurant(login){
    return knex("restaurant").insert([
    {
      login_id: login[2].id,
      name: "Food",
      address: "46 Spadina Ave",
      phone_number: "6476096899", 
    }
    ]).returning("*")
  }

  function insertMenu(){
    return knex("menu").insert([

    ]).returning("*")
  }

  function insertItem(){
    return knex("item").insert([

    ]).returning("*")
  }

  function insertMenuItem(){
    return knex("menuItem").insert([

    ]).returning("*")
  }

  function insertOrder(){
    return knex("order").insert([

    ]).returning("*")
  }

  function insertOrderLine(){
    return knex("orderLine").insert([

    ]).returning("*")
  }

  return deleteOrderLine()
    .then(deleteOrder)
    .then(deleteMenuItem)
    .then(deleteItem)
    .then(deleteMenu)
    .then(deleteRestaurant)
    .then(deleteCustomer)
    .then(deleteCategory)
    .then(deleteLogin)
    .then(insertCategory)
    .then(insertLogin)
    .then(login => insertCustomer(login).then(() => insertRestaurant(login)))
};
