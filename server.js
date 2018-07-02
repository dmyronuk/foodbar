const PORT = 8080;
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const nodeSassMiddleware = require("node-sass-middleware");
const bcrypt = require("bcrypt")

const queries = require("./db/queries/queries.js");
const twilioNumber = '+13069940672'; //later load from ENV VARIABLE

const mockDB = {
  users:{},
  restaurants:{
    1:{
      name: "Great Restaurant",
      address: "10 Drury Lane",
      phone_number: "444-444-4444",
    }
  },
  items:[
    {
      id:99,
      name:"Hamburger",
      description:"Ethical you probably haven't heard of them flannel chia health goth lumbersexual twee fingerstache keffiyeh polaroid.",
      price:"10.99",
      imageURL:"/images/burger-2.jpg",
      prep_time:10
    },
  ],
  cart:[]
};

app.use(cookieSession({
  name: "session",
  resave: true,
  keys: ["supersecret"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

const tokens = require('./twilio_token')
const accountSid = 'ACe8fda14d2cd2d5b6997bd8a1e08bf9c5';
const authToken = tokens.TWILIO_TOKEN
const twilioClient = require('twilio')(accountSid, authToken);//send a message
const client = require('twilio')(accountSid, authToken);//send a message

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(nodeSassMiddleware({
    src: path.join(__dirname, "./styles"),
    dest: path.join(__dirname, "./public"),
    debug: true,
    outputStyle: "compressed",
}));
app.use(express.static(path.join(__dirname, "./public")));


const addZeroToTime = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//minutes offSet variable represents minutes in the future relative to time when function called
const getTimeStr = (minutesOffset, offsetFromUTC) => {
  let date = new Date();
  let dateWithOffset = date.setHours(date.getHours() + offsetFromUTC);
  let readyTimeMs = dateWithOffset + 1000 * 60 * minutesOffset;
  let readyTime = new Date(readyTimeMs);
  let hours = readyTime.getHours();
  let minutes = addZeroToTime(readyTime.getMinutes());
  let suffix = (hours > 11) ? "pm" : "am";
  if(hours === 0){
    hours = 12;
  }else if(hours > 12){
    hours -= 12;
  }
  let outStr = `${hours}:${minutes}${suffix}`;
  return outStr;
}

//data: first_name, restaurant_name, total_cost, ready_time
const createClientSMS = (data) => {
  let lineA = `Hello ${data.first_name}! Your order from ${data.restaurant_name} `;
  let lineB = `will be ready at approximately ${data.ready_time}.`;
  let lineC = `\n\nTotal due: $${data.total_cost.toFixed(2)}`;
  return lineA + lineB + lineC;
}

const createRestaurantSMS = (data) => {
  let outStr = "";
  let curTime = getTimeStr(0, -4);
  outStr += `Order placed by ${data.first_name} ${data.last_name} at ${curTime}\n`

  for(key in data.cart){
    let curItem = data.cart[key];
    outStr += `${curItem.quantity} x ${curItem.item_name}\n`;
  }
  return outStr;
}

let sendSMS = (data, dataToStringFunction) => {
  let msg = dataToStringFunction(data);
  twilioClient.messages
  .create({
     body: msg,
     from: twilioNumber,
     to: data.recipient_phone_number,
  })
  .then(message => console.log("Twilio SID:", message.sid))
  .done();
}


//remove underscores and cap first letter
const prettyFormatFormField = (field_val) => {
  let wordArr = field_val.split("_");
  let outStr = wordArr.reduce((acc, cur) => {
    acc = acc + cur[0].toUpperCase() + cur.slice(1) + " ";
    return acc;
  }, "")
  return outStr.trim();
}

//given the request.session.cart object, return the total $ amount of items
const calculateCartTotal = function(cart){
  return Object.keys(cart).reduce((acc, cur) => {
    let curObj = cart[cur];
    acc += curObj.price * curObj.quantity / 100;
    return acc
  },0);
}

//Frank's transform function for POST /carts
//transforms req.session.cart into something usable by the query
function convertCartObjToArray(cart, email){
  let arr = [];
  const itemIDs = Object.keys(cart)
  const items = Object.values(cart)
  for (var i = 0; i < itemIDs.length; i++) {
    items[i].item_id = itemIDs[i]
    items[i].email = email
    arr.push(items[i])
  }
  return arr;
};

//index page
app.get("/", (req, res) => {
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
});

app.get("/404", (req, res) => {
  let templateVars = {
    email: req.session.email,
    first_name: req.session.first_name,
  };
  res.render("404", templateVars);
});


//get the restaurant page and display menus
//once in this route, it should behave like a single page application - lots of ajax
app.get("/restaurants/:id", (req, res) => {
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
})

//delete item from logged-in user cart
app.post("/cart/items/:id/delete", (req, res) => {
  let id = req.body.item_id;

  if(req.session.cart && req.session.cart[id]){
    delete req.session.cart[id];

    let subTotal = calculateCartTotal(req.session.cart);
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
});

//add item to logged-in user cart
app.post("/cart/items/:id", (req, res) => {
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
});


//view all items in cart before checkout
app.get("/cart", (req, res) => {

  //if user is logged in
  if(req.session.email){
    let cart = req.session.cart;
    let subTotal = calculateCartTotal(cart);
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
});

//confirm checkout -- twilio db stuff and twilio text goes in here
app.post("/cart", (req, res) => {
  let cart = req.session.cart;
  let subTotal = calculateCartTotal(req.session.cart);
  let tax = subTotal * 0.13;
  let total_cost = subTotal + tax;
  let ready_time = getTimeStr(40, -4);

  //order must contain items
  if(Object.keys(cart).length === 0){
    res.json({success: false});
  }else{
    // 
    let cartArr = convertCartObjToArray(cart, req.session.email);

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
      sendSMS({
        cart: req.session.cart,
        first_name: info.first_name,
        last_name: info.last_name,
        total_cost: total_cost,
        ready_time: ready_time,
        recipient_phone_number: `+1${restaurants[0].phone_number.replace("-", "")}`,
      }, createRestaurantSMS);

      // sends SMS to Customer
      sendSMS({
        first_name: info.first_name,
        restaurant_name: restaurants[0].name,
        total_cost: total_cost,
        // formatting the prepTime
        ready_time: getTimeStr(prepTime, 0),
        recipient_phone_number: `+1${info.phone_number.replace("-", "")}`,
      }, createClientSMS);

      req.session.cart = {};
      return res.json({success: true});

    }
    asyncCall();
  }
});


//Ajax request handler - get all the menu items for a given menu_id
app.get("/menus/:menu_id", (req, res) => {
  let outData = mockDB.items[0];

  queries.selectItemsFromMenu(req.params.menu_id).then(result=>{
    res.json({
      mains: result.mains,
      appetizers: result.appetizers,
      beverages: result.beverages,
    });
  })
});


app.get("/login", (req, res) => {
  //login_field_errs represent missing fields - login validation errors represent some kind of authentication failure
  let login_field_errs;
  let login_validation_err;
  if(req.session.login_field_errs){
    login_field_errs = req.session.login_field_errs;
    req.session.login_field_errs = null;
  }
  if(req.session.login_validation_err){
    login_validation_err = req.session.login_validation_err;
    req.session.login_validation_err = null;
  }

  let templateVars = {
    email: req.session.email,
    first_name: req.session.first_name,
    login_field_errs: login_field_errs,
    login_validation_err: login_validation_err
  }
  res.render("login", templateVars)
})

app.post("/login", (req,res) => {
  let email = req.body.email;
  let password = req.body.password;

  //check that post request contains an email and password
  let login_field_errs = [];
  if(! email) login_field_errs.push("Email");
  if(! password) login_field_errs.push("Password");

  //login contains missing fields
  if(login_field_errs.length > 0){
    req.session.login_field_errs = login_field_errs;
    res.redirect("/login");
  }else{

    queries.getPass(req.body.email).then(result => {
       //if pw hash doesnt exist in db -- user doesn't exist
      if(result.length === 0){
        req.session.login_validation_err = "Login Does Not Exist";
        res.redirect("/login");

      //usename exists so now check if passwords match
      }else{
        let dbHash = result[0].password;

        //if password matches hash
        if(bcrypt.compareSync(req.body.password, dbHash)){
          req.session.email = email;
          req.session.cart = {};
          res.redirect("/");

        //incorrect password
        }else{
          req.session.login_validation_err = "Incorrect Email Or Password";
          res.redirect("/login");
        }
      }
    })
  }
})


app.get("/signup", (req, res) => {
  //check if previous signup attempt set any session cookie errors ie failed validation
  //save error as template var and destroy cookie
  let signup_field_errs;
  let auth_err;

  if(req.session.auth_err){
    auth_err = req.session.auth_err;
    req.session.auth_err = null;
  }

  if(req.session.signup_field_errs){
    signup_field_errs = req.session.signup_field_errs;
    req.session.signup_field_errs = null;
  }
  let templateVars = {
    email: req.session.email,
    first_name: req.session.first_name,
    signup_field_errs: signup_field_errs,
    auth_err: auth_err,
  }
  res.render("signup", templateVars);
});

app.post("/signup", (req, res) => {
  //if time replace this with flash messages
  let fields = ["email", "password", "first_name", "last_name", "phone_number"]
  let signup_field_errs = [];

  for(field of fields){
    if(! req.body[field]){
      let formattedField = prettyFormatFormField(field);
      signup_field_errs.push(formattedField);
    }
  }
  req.session.signup_field_errs = signup_field_errs;
  //one or more fields failed so we need to redirect back to signup
  if(signup_field_errs.length > 0){
    res.redirect("/signup");

  }else{
    //check to see if there's an existing user with this email
    queries.selectCustomerFromEmail(req.body.email).then(result => {

      //if there is an existing user with the email, reject
      if(result.length > 0){
        req.session.auth_err = "Email already exists";
        res.redirect("/signup");

      //success - push the new user into the database and redirect to home page
      }else{
        queries.insertIntoCustomers({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone_number: req.body.phone_number,
        });

        req.session.cart = {};
        req.session.email = req.body.email;
        req.session.first_name = req.body.first_name;
        res.redirect("/");
      }
    })
  }
});

app.post("/logout", (req, res) => {
  req.session.email = null;
  req.session.first_name = null;
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

