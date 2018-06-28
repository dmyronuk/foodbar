
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

  function deleteLogin(){
    return knex("login").del()
  }






  function insert(){

  }

  function insert(){

  }

  function insert(){

  }

  function insert(){

  }

  function insert(){

  }

  function insert(){

  }

  function insert(){

  }

  function insert(){

  }





  return deleteOrderLine()
    .then(deleteOrder)
    .then(deleteMenuItem)
    .then(deleteItem)
    .then(deleteMenu)
    .then(deleteRestaurant)
    .then(deleteCustomer)
    .then(deleteLogin);
};
