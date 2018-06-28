
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
    return knex("login").del()
  }

  function deleteLogin(){
    return knex("login").del()
  }





  function insertLogin(){
    return knex("login").insert([
      {
        email: "user@gmail.com",
        password: "z"
      },
      {
        email: "user@gmail.com",
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

  function insertCustomer(){
    return knex("customer").insert([
    {
      
    }
    ]).returning("*")
  }

  function insertRestaurant(){
    return knex("restaurant").insert([

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
    .then()
    .then()
    .then()
    .then()
    .then()
    .then()
    .then()
    .then()
    .then()
    .then();
};
