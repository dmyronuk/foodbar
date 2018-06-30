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
        },
        {
          login_id: result[2].login_id,
          first_name: "D'Arcy",
          last_name: "Myronuk",
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
          category_id: result[0].category_id,//0
          name: "Spicy Nachos",
          price: 1099,
          description: "Our signature nachos, but extra HOT!",
          url: "",
          prep_time: 10
        },
        {
          category_id: result[0].category_id,//1
          name: "Nachos",
          price: 1099,
          description: "Our signature four cheese nachos.",
          url: "",
          prep_time: 10
        },
        {
          category_id: result[0].category_id,//2
          name: "Sweet Potato Fries",
          price: 899,
          description: "Crispy PEI sweet potato fires.",
          url: "",
          prep_time: 5
        },
        {
          category_id: result[1].category_id,//3
          name: "Philly Cheesesteak",
          price: 1399,
          description: "Sirloin steak sandwich with our signature cheese mix.",
          url: "",
          prep_time: 10
        },
        {
          category_id: result[1].category_id,//4
          name: "Kobe Ribeye Steak",
          price: 9999,
          description: "12 oz Kobe beef ribeye steak. Served with fries.",
          url: "../../public/images/kobe-ribeye-steak.jpg",
          prep_time: 15
        },
        {
          category_id: result[1].category_id,//5
          name: "Grilled Salmon",
          price: 2999,
          description: "Atlantic salmon, grilled, with maple glaze. Served with fries.",
          url: "../../public/images/grilled-atlantic-salmon.jpg",
          prep_time: 15
        },
        {
          category_id: result[2].category_id,//6
          name: "Pepsi",
          price: 399,
          description: "Pepsi",
          url: "../../public/images/pepsi.jpg",
          prep_time: 1
        },
        {
          category_id: result[2].category_id,//7
          name: "Diet Pepsi",
          price: 399,
          description: "Diet Pepsi",
          url: "../../public/images/diet-pepsi.jpg",
          prep_time: 1
        },
        {
          category_id: result[2].category_id,//8
          name: "Canada Dry",
          price: 399,
          description: "Canada Dry ginger ale",
          url: "../../public/images/canada-dry.jpg",
          prep_time: 1
        },
        {
          category_id: result[1].category_id,//9
          name: "Speghetti Donuts",
          price: 699,
          description: "Homemade spaghetti noodles made with freshly made doughnut batter.",
          url: "../../public/images/spaghetti-donuts.jpg",
          prep_time: 1
        },
        {
          category_id: result[1].category_id,//10
          name: "Hot Fried Chicken with Burmese Buffalo Sauce",
          price: 1899,
          description: "Homemade spaghetti noodles made with freshly made doughnut batter.",
          url: "../../public/images/Hot-Fried-Chicken.jpg",
          prep_time: 1
        }
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
    return knex("menu_items").insert([
      {
        menu_id: menus[0].menu_id,//LUNCH MENU STARTS HERE
        menu_name: menus[0].name,
        item_id: items[0].item_id,
        item_name: items[0].name
      },
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[1].item_id,
        item_name: items[1].name
      },
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[2].item_id,
        item_name: items[2].name
      },
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[3].item_id,
        item_name: items[3].name
      },
      {
        menu_id: menus[0].menu_id,
        menu_name: menus[0].name,
        item_id: items[6].item_id,
        item_name: items[6].name
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
        menu_id: menus[1].menu_id,//DINNER MENU STARTS HERE
        menu_name: menus[1].name,
        item_id: items[2].item_id,
        item_name: items[2].name
      },
      {
        menu_id: menus[1].menu_id,
        menu_name: menus[1].name,
        item_id: items[4].item_id,
        item_name: items[4].name
      },
      {
        menu_id: menus[1].menu_id,
        menu_name: menus[1].name,
        item_id: items[5].item_id,
        item_name: items[5].name
      },
      {
        menu_id: menus[1].menu_id,
        menu_name: menus[1].name,
        item_id: items[6].item_id,
        item_name: items[6].name
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
        item_id: items[10].item_id,
        item_name: items[10].name
      }
    ]).asCallback()
  }

  async function insertOrderLines(){
    const orders = await knex("orders").select();
    const menuItems = await
      knex("menu_items")
      .join("items", "menu_items.item_id", "items.item_id")
      .select();
    return knex("orderLines").insert([
      {
        order_id: orders[0].order_id,
        menu_item_id: menuItems[0].menu_item_id,
        quantity: 2,
        status: "In Progress",
        total_price: 2 * menuItems[0].price,
        total_prep_time: 2 * menuItems[0].prep_time
      },
      {
        order_id: orders[0].order_id,
        menu_item_id: menuItems[3].menu_item_id,
        quantity: 1,
        status: "In Progress",
        total_price: 1 * menuItems[3].price,
        total_prep_time: 1 * menuItems[3].prep_time
      },
      {
        order_id: orders[0].order_id,
        menu_item_id: menuItems[5].menu_item_id,
        quantity: 1,
        status: "In Progress",
        total_price: 1 * menuItems[5].price,
        total_prep_time: 1 * menuItems[5].prep_time
      },
    ]).asCallback()

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
    .then(insertOrders)
    .then(insertMenuItems)
    .then(insertOrderLines);
};
