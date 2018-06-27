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

app.get("/", (req, res) => {
  res.render("index");
});

//remove underscores and cap first letter
let prettyFormatFormField = (field_val) => {
  let wordArr = field_val.split("_");
  let outStr = wordArr.reduce((acc, cur) => {
    acc = acc + cur[0].toUpperCase() + cur.slice(1) + " ";
    return acc;
  }, "")
  return outStr.trim();
}

app.get("/signup", (req, res) => {
  //check if previous signup attempt set any session cookie errors ie failed validation
  //save error as template var and destroy cookie
  let field_errs;
  if(req.session.field_errs){
    field_errs = req.session.field_errs;
    req.session.field_errs = null;
  }
  let templateVars = {
    field_errs:field_errs,
  }

  res.render("signup", templateVars);
});

app.post("/signup", (req, res) => {
  let fields = ["username", "password", "first_name", "last_name", "phone_number"]
  let field_errs = [];
  for(field of fields){
    if(! req.body[field]){
      let formattedField = prettyFormatFormField(field);
      field_errs.push(formattedField);
    }
  }
  req.session.field_errs = field_errs;
  //one or more fields failed so we need to redirect back to signup
  if(field_errs.length > 0){
    res.redirect("/signup");
  }else{
    res.status.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

