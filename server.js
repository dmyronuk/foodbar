const PORT = 8080;
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const nodeSassMiddleware = require("node-sass-middleware");
require("dotenv").config();

const ajaxRoutes = require("./routes/ajax-routes.js");
const mainRoutes = require("./routes/main-routes.js")
const authRoutes = require("./routes/auth-routes.js")

app.use(cookieSession({
  name: "session",
  resave: true,
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(nodeSassMiddleware({
    src: path.join(__dirname, "./styles"),
    dest: path.join(__dirname, "./public"),
    debug: true,
    outputStyle: "compressed",
}));
app.use(express.static(path.join(__dirname, "./public")));

//index page
app.get("/", mainRoutes.getHome);

app.get("/404", mainRoutes.get404);

//get the restaurant page and display menus
app.get("/restaurants/:id", mainRoutes.getRestaurantHome);

//delete item from logged-in user cart
app.post("/cart/items/:id/delete", ajaxRoutes.deleteCartItem);

//add item to logged-in user cart
app.post("/cart/items/:id", ajaxRoutes.addCartItem);

//view all items in cart before checkout
app.get("/cart", ajaxRoutes.getCart);

//confirm checkout -- twilio db stuff and twilio text goes in here
app.post("/cart",  ajaxRoutes.submitCart);

//get all the menu items for a given menu_id
app.get("/menus/:menu_id", ajaxRoutes.getMenuItems);

//displays latest restaurant order
app.get("/orders", mainRoutes.getLatestOrder);

//sends customer twilio text confirming prep time
app.post("/orders", ajaxRoutes.postOrderTimeResponse);

app.get("/login", authRoutes.getLogin);

app.post("/login", authRoutes.postLogin);

app.post("/logout", authRoutes.postLogout);

app.get("/signup", authRoutes.getSignup);

app.post("/signup", authRoutes.postSignup);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

