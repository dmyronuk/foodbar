const queries = require("../db/queries/queries.js");
const bcrypt = require("bcrypt")

module.exports = {
  getLogin: (req, res) => {
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
  },

  postLogin: (req,res) => {
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
  },

  postLogout: (req, res) => {
    req.session.email = null;
    req.session.first_name = null;
    res.redirect("/");
  },

  getSignup: (req, res) => {
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
  },

  postSignup: (req, res) => {
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
  },
}