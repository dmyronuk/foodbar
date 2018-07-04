const helpers = require("./helpers/helpers.js")
const queries = require("../db/queries/queries.js");

module.exports = {
  //get all the menu items for a given menu_id
  getMenuItems: (req, res) => {
    queries.selectItemsFromMenu(req.params.menu_id).then(result=>{
      res.json({
        mains: result.mains,
        appetizers: result.appetizers,
        beverages: result.beverages,
      })
    })
  },

  addCartItem: (req, res) => {
    let item_id_exists = true // once db hooked up, check that item exists in db
    let id = req.params.id;
    let quantity = Number(req.body.quantity);

    if(item_id_exists){
      let sessionItem = req.session.cart[id];

      //check to see if there are any of this item already in cart - if yes
      if(sessionItem){
        sessionItem.quantity = Number(sessionItem.quantity) + quantity;

      }else{
        sessionItem = req.body;
        sessionItem.quantity = quantity;
      }

      req.session.cart[id] = sessionItem;
      res.json({inData:req.body})
    }else{
      res.json({status:"failed"})
    }
  },

  deleteCartItem: (req, res) => {
    let id = req.body.item_id;

    if(req.session.cart && req.session.cart[id]){
      delete req.session.cart[id];

      let subTotal = helpers.calculateCartTotal(req.session.cart);
      let tax = subTotal * 0.13;
      let total = subTotal + tax;

      res.json({
        subTotal: subTotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
      });
    }else{
      res.json({status:"failed"})
    }
  },

  //view all items in cart before checkout
  getCart: (req, res) => {
    //if user is logged in
    if(req.session.email){
      let cart = req.session.cart;
      let subTotal = helpers.calculateCartTotal(cart);
      let tax = subTotal * 0.13;
      let total = subTotal + tax;

      res.json({
        cart: cart,
        subTotal: subTotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
      });

    //else forbidden, user is not logged in
    }else{
      res.status(403);
    }
  },

  //confirm checkout -- twilio db stuff and twilio text goes in here
  submitCart: (req, res) => {
    let cart = req.session.cart;
    let subTotal = helpers.calculateCartTotal(req.session.cart);
    let tax = subTotal * 0.13;
    let total_cost = subTotal + tax;
    let ready_time = helpers.getTimeStr(40, -4);

    //order must contain items
    if(Object.keys(cart).length === 0){
      res.json({success: false});
    }else{
      let cartArr = helpers.convertCartObjToArray(cart, req.session.email);

      // creates an Array of insert into orderLines promises to pass into Promise.All later
      let allPromises = cartArr.map(function (key){
        return queries.insertIntoOrderLines(key);
      });

      // function calls all the promises in the correct order
      async function asyncCall (){
        const insertOrder = await queries.insertOrder(req.session.email);
        const insertOrderLines = await Promise.all(allPromises);
        const customers = await queries.selectCustomerFromEmail(req.session.email);
        const prepTime = await queries.getTotalPrepTimeFromLatestOrder();
        const restaurants = await queries.selectAllInfoFromRestaurants(1);

        let info = customers[0];

        // sends SMS to restaurant
        // helpers.sendSMS({
        //   cart: req.session.cart,
        //   first_name: info.first_name,
        //   last_name: info.last_name,
        //   total_cost: total_cost,
        //   ready_time: ready_time,
        //   recipient_phone_number: `+1${restaurants[0].phone_number.replace("-", "")}`,
        // }, helpers.createRestaurantSMS);

        req.session.cart = {};
        return res.json({success: true});
      }
      asyncCall();
    }
  },

  postOrderTimeResponse: (req, res) => {
    if(req.body.time && Number(req.body.time) > 0){
      queries.getLatestOrder().then(result => {
        // sends SMS to Customer

      let order_info = result[0]
      let phone_number = `+1${order_info.phone_number.replace("-", "")}`

      let sms = createClientSMS({
        first_name: order_info.first_name,
        prep_time: req.body.time,
        recipient_phone_number: phone_number,
      })

      sendSMS({
        first_name: order_info.first_name,
        prep_time: req.body.time,
        recipient_phone_number: `+1${order_info.phone_number.replace("-", "")}`,
      }, createClientSMS);

        res.json({"success":true});
      })
    }else{
      res.json({"success":false});
    }
  },
}
