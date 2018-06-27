const PORT = 8080;
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const nodeSassMiddleware = require("node-sass-middleware");
const bcrypt = require("bcrypt")
const Chat = require('twilio-chat');
Chat.Client.create(token).then(client => {
    // Use client
});

const pg = require("pg");
const knex = require("./db/create-knex-client.js")

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
const accountSid = 'ACe8fda14d2cd2d5b6997bd8a1e08bf9c5';
const authToken = '45af4770f7b92c3f50676cb3d2b34154';//twilio_token = require('./twilio_token')
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
    to: "+16475376750",
    from: "+13069940672",
    body: "Tomorrow's forecast in Financial District, San Francisco is Clear",
    mediaUrl: 'https://climacons.herokuapp.com/clear.png',
  })
  .then((message) => console.log(message.sid));

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

