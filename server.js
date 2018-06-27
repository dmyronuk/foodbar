const PORT = 8080;
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const nodeSassMiddleware = require("node-sass-middleware");
const bcrypt = require("bcrypt")

const pg = require("pg");
const knex = require("./db/create-knex-client.js");
const mockDB = {
  users:{}
};

app.use(cookieSession({
  name: "session",
  resave: true,
  keys: ["supersecret"],
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


const validatePassword = (db, username, plaintextPassword) => {
  let hashedPassword = db.users[username]["password"];
  return bcrypt.compareSync(plaintextPassword, hashedPassword);
};

//remove underscores and cap first letter
let prettyFormatFormField = (field_val) => {
  let wordArr = field_val.split("_");
  let outStr = wordArr.reduce((acc, cur) => {
    acc = acc + cur[0].toUpperCase() + cur.slice(1) + " ";
    return acc;
  }, "")
  return outStr.trim();
}

app.get("/", (req, res) => {
  let login_field_errs;
  if(req.session.login_field_errs){
    login_field_errs = req.session.login_field_errs;
    req.session.login_field_errs = null;
  }

  let templateVars = {
    login_field_errs:login_field_errs
  };
  res.render("index", templateVars);
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
    login_field_errs:login_field_errs,
    login_validation_err: login_validation_err
  }
  res.render("login", templateVars)
})

app.post("/login", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body)

  //check that post request contains a username and password
  let login_field_errs = [];
  if(! username) login_field_errs.push("Username");
  if(! password) login_field_errs.push("Password");

  //login contains missing fields
  if(login_field_errs.length > 0){
    req.session.login_field_errs = login_field_errs;
    res.redirect("/login");
  }else{
    //if username doesn't exist in db
    if(! mockDB.users[username]){
      req.session.login_validation_err = "Username Does Not Exist";
      res.redirect("/login");
    //usename exists so now check if passwords match
    }else{
      if(validatePassword(mockDB, req.body.username, req.body.password)){
        req.session.username = username;
        res.redirect("/");

      //incorrect password
      }else{
        req.session.login_validation_err = "Incorrect Username Or Password";
        res.redirect("/login");
      }
    }
  }
})

app.get("/signup", (req, res) => {
  //check if previous signup attempt set any session cookie errors ie failed validation
  //save error as template var and destroy cookie
  let signup_field_errs;
  if(req.session.signup_field_errs){
    signup_field_errs = req.session.signup_field_errs;
    req.session.signup_field_errs = null;
  }
  let templateVars = {
    signup_field_errs:signup_field_errs,
  }
  console.log("DB: ", mockDB);
  res.render("signup", templateVars);
});

app.post("/signup", (req, res) => {
  let fields = ["username", "password", "first_name", "last_name", "phone_number"]
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
  //success - push the new user into the database and redirect to home page
  }else{
    mockDB.users[req.body.username] = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
    }
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

