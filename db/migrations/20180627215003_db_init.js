exports.up = function(knex, Promise) {
  return createLogin()
    .then(createCategory)
    .then(createCustomer)
    .then(createRestaurant)
    .then(createMenu)
    .then(createItem)
    .then(createMenuItem)
    .then(createOrder)
    .then(createOrderLine);

  function createLogin() {
    return knex.schema.createTable("login", table => {
      table.increments("login_id").unsigned().primary();
      table.string("email");
      table.string("password");
    });
  };

  function createCategory(){
    return knex.schema.createTable("category", table => {
      table.increments("category_id").unsigned().primary();
      table.string("name");
    });
  };

  function createCustomer() {
    return knex.schema.createTable("customer", table => {
      table.increments("customer_id").unsigned().primary();
      table.integer("login_id").unsigned();
      table.foreign("login_id").references("login.login_id");
      table.string("email");
      table.string("first_name");
      table.string("last_name");
      table.string("phone_number");
    });
  };

  function createRestaurant() {
    return knex.schema.createTable("restaurant", table => {
      table.increments("restaurant_id").unsigned().primary();
      table.integer("login_id").unsigned();
      table.foreign("login_id").references("login.login_id");
      table.string("name");
      table.string("address");
      table.string("phone_number");
    });
  };

  function createMenu() {
    return knex.schema.createTable("menu", table => {
      table.increments("menu_id").unsigned().primary();
      table.integer("restaurant_id").unsigned();
      table.foreign("restaurant_id").references("restaurant.restaurant_id");
      table.string("name");
      table.string("start_time");
      table.string("end_time");
      table.string("type");
    });
  };

  function createItem() {
    return knex.schema.createTable("item", table => {
      table.increments("item_id").unsigned().primary();
      table.integer("category_id").unsigned();
      table.foreign("category_id").references("category.category_id");
      table.integer("price").unsigned();
      table.integer("prep_time").unsigned();
      table.string("name");
      table.string("description");
      table.string("url");
    });
  };

  function createMenuItem() {
    return knex.schema.createTable("menuItem", table => {
      table.increments("menuItem_id").unsigned().primary();
      table.integer("item_id").unsigned();
      table.integer("menu_id").unsigned();
      table.foreign("item_id").references("item.item_id");
      table.foreign("menu_id").references("menu.menu_id");
    });
  };

  function createOrder() {
    return knex.schema.createTable("order", table => {
      table.increments("order_id").unsigned().primary();	
      table.integer("customer_id").unsigned();
      table.foreign("customer_id").references("customer.customer_id")   
      table.string("order_date");
    });
  };

  function createOrderLine() {
    return knex.schema.createTable("orderLine", table => {
      table.increments("orderLine_id").unsigned().primary();
      table.integer("order_id").unsigned();
      table.integer("menuItem_id").unsigned();
      table.foreign("order_id").references("order.order_id")
      table.foreign("menuItem_id").references("menuItem.menuItem_id")
      table.integer("quantity").unsigned();
      table.integer("total_price").unsigned();
      table.integer("total_prep_time").unsigned();
      table.string("status");	
    });
  };

};

exports.down = function(knex, Promise) {
  
  return dropOrderLine()
    .then(dropOrder)
    .then(dropMenuItem)
    .then(dropItem)
    .then(dropMenu)
    .then(dropRestaurant)
    .then(dropCustomer)
    .then(dropCategory)
    .then(dropLogin);

  function dropOrderLine() {
    return knex.schema.dropTable("orderLine");
  };

  function dropOrder() {
    return knex.schema.dropTable("order");
  };

  function dropMenuItem() {
    return knex.schema.dropTable("menuItem");
  };

  function dropItem() {
    return knex.schema.dropTable("item");
  };

  function dropMenu() {
    return knex.schema.dropTable("menu");
  };

  function dropRestaurant() {
    return knex.schema.dropTable("restaurant");
  };

  function dropCustomer() {
    return knex.schema.dropTable("customer");
  };

  function dropCategory() {
    return knex.schema.dropTable("category");
  };

  function dropLogin() {
    return knex.schema.dropTable("login");
  };


};