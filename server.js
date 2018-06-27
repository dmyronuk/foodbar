const PORT = 8080;
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const nodeSassMiddleware = require("node-sass-middleware");
const bcrypt = require("bcrypt")

const pg = require("pg");
const knex = require("./db/create-knex-client.js")

const tokens = require('./twilio_token')
const accountSid = 'ACe8fda14d2cd2d5b6997bd8a1e08bf9c5';
const authToken = tokens.TWILIO_TOKEN
const twilioClient = require('twilio')(accountSid, authToken);//send a message

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(nodeSassMiddleware({
    src: path.join(__dirname, "./styles"),
    dest: path.join(__dirname, "./public"),
    debug: true,
    outputStyle: "compressed",
}));
app.use(express.static(path.join(__dirname, "./public")));

/*-----Twilio--------*/
app.post('/sms', (req, res) => {
  twilioClient.messages
  .create({
     body: `Hello ${knex.select('first_name').from('customer')}! The order for ${orderNumber} has been received at ${Date.now()}. Your total is ${req.body.total} and your food will arrive in ${knex.select('arrival_time').from('order')}.`,
     from: '+13069940672',
     to: '+16475376750'
   })
  .then(message => console.log(message.sid))
  .done();
  res.redirect('/')
});


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  console.log("User posted to signup")
  res.status(301).redirect("/");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

