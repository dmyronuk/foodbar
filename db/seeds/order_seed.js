exports.seed = function(knex, Promise) {

  function deleteOrderLines(){
    return knex("orderLines").del()
  }

  function deleteMenuItems(){
    return knex("menu_items").del()
  }

  function deleteOrders(){
    return knex("orders").del()
  }

  function deleteItems(){
    return knex("items").del()
  }

  function deleteMenus(){
    return knex("menus").del()
  }

  function deleteRestaurants(){
    return knex("restaurants").del()
  }

  function deleteCustomers(){
    return knex("customers").del()
  }

  function deleteCategories(){
    return knex("categories").del()
  }

  function deleteLogins(){
    return knex("logins").del()
  }

  function insertLogins(){
    return knex("logins").insert([
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
    ]).asCallback();
  }

  function insertCategories(){
    return knex("categories").insert([
      {name: "appetizers"},
      {name: "mains"},
      {name: "beverages"}
    ]).asCallback();
  }

  function insertCustomers(){
    return knex("logins").select().then(result =>{
      knex("customers").insert([
        {
          first_name: "Frank",
          login_id: result[0].login_id,
          last_name: "Zhou",
          phone_number: "6476096899"
        },
        {
          login_id: result[1].login_id,
          first_name: "Adib",
          last_name: "Al-Amir",
          phone_number: "6476096899"
        }
      ]).asCallback();
    });
  }

  function insertRestaurants(){
    return knex("logins").select().then(result =>{
      knex("restaurants").insert(
      {
        login_id: result[2].login_id,
        name: "Lighthouse Labs",
        address: "46 Spadina Ave",
        phone_number: "6475376750"
      }
      ).asCallback();
    });
  }

  function insertMenus(){
    return knex("restaurants").select().then(result => {
      knex("menus").insert([
      {
        restaurant_id: result[0].restaurant_id,
        name: "Lunch",
        start_time: "10:00",
        end_time: "15:00",
        type: "lunch"
      },
      {
        restaurant_id: result[0].restaurant_id,
        name: "Dinner",
        start_time: "15:00",
        end_time: "22:00",
        type: "dinner"
      }
      ]).asCallback();
    });
  }

  function insertItems(){
    return knex("categories").select().then(result => {
      knex("items").insert([
        {
          category_id: result[0].category_id,
          name: "Spicy Nachos",
          price: 1099,
          description: "Our signature nachos, but extra HOT!",
          url: "",
          prep_time: 10
        },      
        {
          category_id: result[0].category_id,
          name: "Nachos",
          price: 1099,
          description: "Our signature four cheese nachos.",
          url: "",
          prep_time: 10
        },
        {
          category_id: result[0].category_id,
          name: "Sweet Potato Fries",
          price: 899,
          description: "Crispy PEI sweet potato fires.",
          url: "",
          prep_time: 5
        },
        {
          category_id: result[1].category_id,
          name: "Philly Cheesesteak",
          price: 1399,
          description: "Sirloin steak sandwich with our signature cheese mix.",
          url: "",
          prep_time: 10
        },

        {
          category_id: result[1].category_id,
          name: "Spicy Philly Cheesesteak",
          price: 1399,
          description: "Sirloin steak sandwich with our signature cheese mix.",
          url: "",
          prep_time: 10
        },
        {
          category_id: result[1].category_id,
          name: "Kobe Ribeye Steak",
          price: 9999,
          description: "12 oz Kobe beef ribeye steak. Served with fries.",
          url: "",
          prep_time: 15
        },
        {
          category_id: result[1].category_id,
          name: "Grilled Salmon",
          price: 2999,
          description: "Atlantic salmon, pan fried, with maple glaze. Served with fries.",
          url: "",
          prep_time: 15
        },
        {
          category_id: result[2].category_id,
          name: "Pepsi",
          price: 399,
          description: "Pepsi",
          url: "",
          prep_time: 1
        },

        {
          category_id: result[2].category_id,
          name: "Diet Pepsi",
          price: 399,
          description: "Diet Pepsi",
          url: "",
          prep_time: 1
        },

        {
          category_id: result[2].category_id,
          name: "Canada Dry",
          price: 399,
          description: "Canada Dry ginger ale",
          url: "",
          prep_time: 1
        },
      ]).asCallback();
    });
  }

  function insertOrders(){
    return knex("customers").select().then(result =>{
      knex("orders").insert([
        {
          customer_id: result[0].customer_id,
          order_date: "1500/06/28/2018"
        },
        {
          customer_id: result[0].customer_id,
          order_date: "1500/06/29/2018"
        },
        {
          customer_id: result[1].customer_id,
          order_date: "1500/06/30/2018"
        }
      ]).asCallback();
    });
  }

  async function insertMenuItems(){
  	const items = await knex("items").select()
  	const menus = await knex("menus").select()
    knex("menu_items").insert([
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[0].item_id,
        item_name: items[0].name
      },
      {
        menu_id: menus[1].menu_id,
        menu_name: menus[1].name,
        item_id: items[0].item_id,
        item_name: items[0].name
      },
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[7].item_id,
        item_name: items[7].name
      },
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[8].item_id,
        item_name: items[8].name
      },
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[9].item_id,
        item_name: items[9].name
      },
      {
        menu_id: menus[1].menu_id,
        menu_name: menus[1].name,
        item_id: items[7].item_id,
        item_name: items[7].name
      },
      {
        menu_id: menus[1].menu_id,
        menu_name: menus[1].name,
        item_id: items[8].item_id,
        item_name: items[8].name
      },
      {
        menu_id: menus[1].menu_id,
        menu_name: menus[1].name,
        item_id: items[9].item_id,
        item_name: items[9].name
      }
    ]).asCallback()
  }

  async function insertOrderLines(){
    const orders = await knex("orders").select()
    const menuItems = await knex("menu_items").select()
    // const initialInsert =  knex("menu_items").select()
    // knex("orderLines").insert([
    //   {
    //     order_id: orders[0].order_id,
    //     menu_item_id: menuItems[0].menu_item_id,
    //     quantity: 2
    //   }
    // ]).asCallback()
    console.log(orders)
    console.log(menuItems)
    // console.log(initialInsert)
  }

  return deleteOrderLines()
    .then(deleteMenuItems)
    .then(deleteOrders)
    .then(deleteItems)
    .then(deleteMenus)
    .then(deleteRestaurants)
    .then(deleteCustomers)
    .then(deleteCategories)
    .then(deleteLogins)
    .then(insertCategories)
    .then(insertLogins)
    .then(insertCustomers)
    .then(insertRestaurants)
    .then(insertItems)
    .then(insertMenus)
    .then(insertMenuItems)
    .then(insertOrders)
    .then(insertOrders)
    // .then(insertMenuItems)
    .then(insertOrderLines)
};
