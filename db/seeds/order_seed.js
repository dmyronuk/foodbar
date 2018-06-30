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
      knex("items").insert([//0=appet, 1=mains, 2=bev
        {
          category_id: result[0].category_id,//0
          name: "Nachos",
          price: 1099,
          description: "Our signature four cheese nachos with your choice of regular or HOT.",
          url: "../../public/images/nachos.jpg",
          prep_time: 10
        },
        {
          category_id: result[0].category_id,//1
          name: "Sweet Potato Fries",
          price: 1199,
          description: "Crispy PEI sweet potato fires.",
          url: "../../public/images/sweet-potato.jpg",
          prep_time: 5
        },
        {
          category_id: result[1].category_id,//2
          name: "Philly Cheesesteak",
          price: 1499,
          description: "Sirloin steak sandwich with our signature cheese mix. With your choice of regular or HOT.",
          url: "../../public/images/philly-cheese.jpg",
          prep_time: 10
        },
        {
          category_id: result[1].category_id,//3
          name: "Kobe Ribeye Steak",
          price: 9999,
          description: "12 oz Kobe beef ribeye steak. Served with fries.",
          url: "../../public/images/kobe-ribeye-steak.jpg",
          prep_time: 15
        },
        {
          category_id: result[1].category_id,//4
          name: "Grilled Salmon",
          price: 2999,
          description: "Atlantic salmon, grilled, with maple glaze. Served with fries.",
          url: "../../public/images/grilled-atlantic-salmon.jpg",
          prep_time: 15
        },
        {
          category_id: result[2].category_id,//5
          name: "Pepsi",
          price: 199,
          description: "Pepsi",
          url: "../../public/images/pepsi.jpg",
          prep_time: 1
        },
        {
          category_id: result[2].category_id,//6
          name: "Diet Pepsi",
          price: 199,
          description: "Diet Pepsi",
          url: "../../public/images/diet-pepsi.jpg",
          prep_time: 1
        },
        {
          category_id: result[2].category_id,//7
          name: "Canada Dry",
          price: 199,
          description: "Canada Dry ginger ale",
          url: "../../public/images/canada-dry.jpg",
          prep_time: 1
        },
        {
          category_id: result[1].category_id,//8
          name: "Speghetti Donuts",
          price: 899,
          description: "Homemade spaghetti noodles with our freshly made doughnut batter.",
          url: "../../public/images/spaghetti-donuts.jpg",
          prep_time: 5
        },
        {
          category_id: result[1].category_id,//9
          name: "Hot Fried Chicken",
          price: 1899,
          description: "Juicy Korean-style fried chicken with a side of garlic sauce.",
          url: "../../public/images/Hot-Fried-Chicken.jpg",
          prep_time: 15
        },
        {
          category_id: result[0].category_id,//10
          name: "Kale Salad",
          price: 699,
          description: "Blue cheese kale salad with pecans and pomegranate, tossed with fresh lemon juice and extra-virgin olive oil.",
          url: "../../public/images/kale-salad.jpg",
          prep_time: 10
        },
        {
          category_id: result[1].category_id,//11
          name: "Roasted Red Pepper Chorizo Mac and Cheese",
          price: 799,
          description: "Classic homestyle comfort food made with nutty gruyère cheese.",
          url: "../../public/images/mac-and-cheese.jpeg",
          prep_time: 15
        },
        {
          category_id: result[0].category_id,//12
          name: "Avocado Bagel",
          price: 299,
          description: "Made with seasoned eggs and fresh avocado.",
          url: "../../public/images/bagel-avocado.jpeg",
          prep_time: 15
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
    return knex("menu_items").insert([//LUNCH MENU STARTS HERE
      {
        menu_id: menus[0].menu_id,//nachos
        menu_name: menus[0].name,
        item_id: items[0].item_id,
        item_name: items[0].name
      },
      {
        menu_id: menus[0].menu_id,//SP fries
        menu_name: menus[0].name,
        item_id: items[1].item_id,
        item_name: items[1].name
      },
      {
        menu_id: menus[0].menu_id,//philly cheese
        menu_name: menus[0].name,
        item_id: items[2].item_id,
        item_name: items[2].name
      },
      {
        menu_id: menus[0].menu_id,//pepsi
        menu_name: menus[0].name,
        item_id: items[5].item_id,
        item_name: items[5].name
      },
      {
        menu_id: menus[0].menu_id,//diet pepsi
        menu_name: menus[0].name,
        item_id: items[6].item_id,
        item_name: items[6].name
      },
      {
        menu_id: menus[0].menu_id,//gingerale
        menu_name: menus[0].name,
        item_id: items[7].item_id,
        item_name: items[7].name
      },
      {
        menu_id: menus[0].menu_id,//spagh donuts
        menu_name: menus[0].name,
        item_id: items[8].item_id,
        item_name: items[8].name
      },
      {
        menu_id: menus[0].menu_id,//kale salad
        menu_name: menus[0].name,
        item_id: items[10].item_id,
        item_name: items[10].name
      },
      {
        menu_id: menus[0].menu_id,//mac-and-cheese
        menu_name: menus[0].name,
        item_id: items[11].item_id,
        item_name: items[11].name
      },
      {
        menu_id: menus[0].menu_id,//bagel avocado
        menu_name: menus[0].name,
        item_id: items[12].item_id,
        item_name: items[12].name
      },
      {
        menu_id: menus[1].menu_id,//DINNER MENU STARTS HERE
        menu_name: menus[1].name,//steak
        item_id: items[3].item_id,
        item_name: items[3].name
      },
      {
        menu_id: menus[1].menu_id,//salmon
        menu_name: menus[1].name,
        item_id: items[4].item_id,
        item_name: items[4].name
      },
      {
        menu_id: menus[1].menu_id,//pepsi
        menu_name: menus[1].name,
        item_id: items[5].item_id,
        item_name: items[5].name
      },
      {
        menu_id: menus[1].menu_id,//diet pepsi
        menu_name: menus[1].name,
        item_id: items[6].item_id,
        item_name: items[6].name
      },
      {
        menu_id: menus[1].menu_id,//gingerale
        menu_name: menus[1].name,
        item_id: items[7].item_id,
        item_name: items[7].name
      },
      {
        menu_id: menus[1].menu_id,//fried chicken
        menu_name: menus[1].name,
        item_id: items[9].item_id,
        item_name: items[9].name
      },
      {
        menu_id: menus[1].menu_id,//kale salad
        menu_name: menus[1].name,
        item_id: items[10].item_id,
        item_name: items[10].name
      },
      {
        menu_id: menus[1].menu_id,//mac-and-cheese
        menu_name: menus[1].name,
        item_id: items[11].item_id,
        item_name: items[11].name
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
        menu_item_id: menuItems[5].menu_item_id,
        quantity: 2,
        status: "In Progress",
        total_price: 2 * menuItems[5].price,
        total_prep_time: 2 * menuItems[5].prep_time
      },
      {
        order_id: orders[1].order_id,
        menu_item_id: menuItems[1].menu_item_id,
        quantity: 1,
        status: "In Progress",
        total_price: 1 * menuItems[1].price,
        total_prep_time: 1 * menuItems[1].prep_time
      },
      {
        order_id: orders[1].order_id,
        menu_item_id: menuItems[7].menu_item_id,
        quantity: 1,
        status: "In Progress",
        total_price: 1 * menuItems[7].price,
        total_prep_time: 1 * menuItems[7].prep_time
      },
      {
        order_id: orders[1].order_id,
        menu_item_id: menuItems[9].menu_item_id,
        quantity: 1,
        status: "In Progress",
        total_price: 1 * menuItems[9].price,
        total_prep_time: 1 * menuItems[9].prep_time
      }
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
