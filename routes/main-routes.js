const queries = require("../db/queries/queries.js");

module.exports = {
  getHome: (req, res) => {
    let login_field_errs;
    if(req.session.login_field_errs){
      login_field_errs = req.session.login_field_errs;
      req.session.login_field_errs = null;
    }

    let templateVars = {
      email:req.session.email,
      first_name:req.session.first_name,
      login_field_errs:login_field_errs
    };
    res.render("index", templateVars);
  },

  get404: (req, res) => {
    let templateVars = {
      email: req.session.email,
      first_name: req.session.first_name,
    };
    res.render("404", templateVars);
  },

  getRestaurantHome: (req, res) => {
    let restaurantId = req.params.id;

    queries.selectMenusFromRestaurants(restaurantId).then(menus => {
      //if search finds any menus
      if(menus.length > 0){
        let menusObj = menus.reduce((acc, cur) => {
          let key = cur.name.toLowerCase() + "_menu_id";
          acc[key] = cur.menu_id;
          return acc;
        }, {})

        res.render("restaurant", {
          menusObj: menusObj,
          email: req.session.email,
          first_name: req.session.first_name,
          address: menus[0].address,
          phone_number: menus[0].phone_number,
          first_menu_name: menus[0].menus_name,
          second_menu_name: menus[1].menus_name,
          restaurant_name: menus[0].restaurants_name,
        });

      //else no menus -- 404
      }else{
        res.status(404).redirect("/404");
      }
    })
  },

  getLatestOrder: (req, res) => {
  //restaurant owner hardcoded for now
    if(req.session.email ==="restaurant@gmail.com"){
      queries.getLatestOrder().then(result => {
        let order_info = result[0];
        queries.getItemsFromOrderId(order_info.order_id).then(items => {

          let parsedItems = items.reduce((acc, cur) => {
            acc.push({
              name: cur.item_name,
              quantity: cur.quantity,
            })
            return acc;
          }, []);

          let templateVars = {
            order_id: order_info.order_id,
            first_name: order_info.first_name,
            last_name: order_info.last_name,
            phone_number: order_info.phone_number,
            items: parsedItems,
            email: req.session.email
          }
          res.render("orders", templateVars);
        })
      })
    }else{
      res.status(403).redirect("/");
    }
  },
}