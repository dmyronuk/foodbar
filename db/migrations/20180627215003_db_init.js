exports.up = function(knex, Promise) {
  return createLogins()
    .then(createCategories)
    .then(createCustomers)
    .then(createRestaurants)
    .then(createMenus)
    .then(createItems)
    .then(createMenuItems)
    .then(createOrders)
    .then(createOrderLines);

  function createLogins() {
    return knex.schema.createTable("logins", table => {
      table.increments("login_id").unsigned().primary();
      table.string("email");
      table.string("password");
    });
  };

  function createCategories(){
    return knex.schema.createTable("categories", table => {
      table.increments("category_id").unsigned().primary();
      table.string("name");
    });
  };

  function createCustomers() {
    return knex.schema.createTable("customers", table => {
      table.increments("customer_id").unsigned().primary();
      table.integer("login_id").unsigned();
      table.foreign("login_id").references("logins.login_id");
      table.string("first_name");
      table.string("last_name");
      table.string("phone_number");
    });
  };

  function createRestaurants() {
    return knex.schema.createTable("restaurants", table => {
      table.increments("restaurant_id").unsigned().primary();
      table.integer("login_id").unsigned();
      table.foreign("login_id").references("logins.login_id");
      table.string("name");
      table.string("address");
      table.string("phone_number");
    });
  };

  function createMenus() {
    return knex.schema.createTable("menus", table => {
      table.increments("menu_id").unsigned().primary();
      table.integer("restaurant_id").unsigned();
      table.foreign("restaurant_id").references("restaurants.restaurant_id");
      table.string("name");
      table.string("start_time");
      table.string("end_time");
      table.string("type");
    });
  };

  function createItems() {
    return knex.schema.createTable("items", table => {
      table.increments("item_id").unsigned().primary();
      table.integer("category_id").unsigned();
      table.foreign("category_id").references("categories.category_id");
      table.string("name");
      table.integer("price").unsigned();
      table.string("description");
      table.string("url");
      table.integer("prep_time").unsigned();
    });
  };

  function createMenuItems() {
    return knex.schema.createTable("menu_items", table => {
      table.increments("menu_item_id").unsigned().primary();
      table.integer("item_id").unsigned();
      table.integer("menu_id").unsigned();
      table.foreign("item_id").references("items.item_id");
      table.foreign("menu_id").references("menus.menu_id");
      table.string("menu_name");
      table.string("item_name");
    });
  };

  function createOrders() {
    return knex.schema.createTable("orders", table => {
      table.increments("order_id").unsigned().primary();	
      table.integer("customer_id").unsigned();
      table.foreign("customer_id").references("customers.customer_id")   
      table.string("order_date");
    });
  };

  function createOrderLines() {
    return knex.schema.createTable("orderLines", table => {
      table.increments("orderLines_id").unsigned().primary();
      table.integer("order_id").unsigned();
      table.integer("menu_item_id").unsigned();
      table.foreign("order_id").references("orders.order_id")
      table.foreign("menu_item_id").references("menu_items.menu_item_id")
      table.integer("quantity").unsigned();
      table.integer("total_price").unsigned();
      table.integer("total_prep_time").unsigned();
      table.string("status");	
    });
  };

};

exports.down = function(knex, Promise) {
  
  return dropOrderLines()
    .then(dropOrders)
    .then(dropMenuItems)
    .then(dropItems)
    .then(dropMenus)
    .then(dropRestaurants)
    .then(dropCustomers)
    .then(dropCategories)
    .then(dropLogins);

  function dropOrderLines() {
    return knex.schema.dropTable("orderLines");
  };

  function dropOrders() {
    return knex.schema.dropTable("orders");
  };

  function dropMenuItems() {
    return knex.schema.dropTable("menu_items");
  };

  function dropItems() {
    return knex.schema.dropTable("items");
  };

  function dropMenus() {
    return knex.schema.dropTable("menus");
  };

  function dropRestaurants() {
    return knex.schema.dropTable("restaurants");
  };

  function dropCustomers() {
    return knex.schema.dropTable("customers");
  };

  function dropCategories() {
    return knex.schema.dropTable("categories");
  };

  function dropLogins() {
    return knex.schema.dropTable("logins");
  };


};