
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
    ]).asCallback();
  }

  function insertCategory(){
    return knex("category").insert([
      {name: "appetizers"},
      {name: "mains"},
      {name: "beverages"}
    ]).asCallback();
  }

  function insertCustomer(){
    return knex("login").select().then(result =>{
      knex("customer").insert([
        {
          login_id: result[0].login_id,
          first_name: "Frank",
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

  function insertRestaurant(){
    return knex("login").select().then(result =>{
      knex("restaurant").insert(
      {
        login_id: result[2].login_id,
        name: "Lighthouse Labs",
        address: "46 Spadina Ave",
        phone_number: "6475376750"
      }
      ).asCallback();
    });
  }

  function insertMenu(){
    return knex("restaurant").select().then(result => {
      knex("menu").insert([
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

  function insertItem(){
    return knex("category").select().then(result => {
      knex("item").insert([
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

  function insertMenuItem(){
    // return knex("item").select().then(result => {
    //   knex("menu").select().then(result1 => {
        knex("menuItem").insert([
          // {
          //   menu_id: result1[0].menu_id,
          //   menu_name: result1[0].name,
          //   item_id: result[0].item_id,
          //   item_name: result[0].name
          // },
          // {
          //   menu_id: result1[1].menu_id,
          //   menu_name: result1[1].name,
          //   item_id: result[0].item_id,
          //   item_name: result[0].name
          // },
          // {
          //   menu_id: result1[0].menu_id,
          //   menu_name: result1[0].name,
          //   item_id: result[7].item_id,
          //   item_name: result[7].name
          // },
          // {
          //   menu_id: result1[0].menu_id,
          //   menu_name: result1[0].name,
          //   item_id: result[8].item_id,
          //   item_name: result[8].name
          // },
          // {
          //   menu_id: result1[0].menu_id,
          //   menu_name: result1[0].name,
          //   item_id: result[9].item_id,
          //   item_name: result[9].name
          // },
          // {
          //   menu_id: result1[1].menu_id,
          //   menu_name: result1[1].name,
          //   item_id: result[7].item_id,
          //   item_name: result[7].name
          // },
          // {
          //   menu_id: result1[1].menu_id,
          //   menu_name: result1[1].name,
          //   item_id: result[8].item_id,
          //   item_name: result[8].name
          // },
          // {
          //   menu_id: result1[1].menu_id,
          //   menu_name: result1[1].name,
          //   item_id: result[9].item_id,
          //   item_name: result[9].name
          // }
        ]).asCallback();
    //   })
    // });
  }

  function insertOrder(){
    return knex("customer").select().then(result =>{
      knex("order").insert([
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

  function insertOrderLine(){
    // return knex("order").select().then(result => {
    //   console.log(result);
    //   knex("menuItem").join("item", "menuItem.item_id", "=", "item.item_id").select().then(result1 => {
    //     console.log(result1);
        knex("orderLine").insert([
          // {
          //   order_id: result[0].order_id,
          //   menuItem_id: result1[0].menuItem_id,
          //   status: "In Progress",
          //   quantity: 1,


          // }
        ]).asCallback();
      // });
    // });
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
    .then(insertCustomer)
    .then(insertRestaurant)
    .then(insertItem)
    .then(insertMenu)
    .then(insertOrder)
    .then(insertMenuItem)
    .then(insertOrderLine);
};
