# FoodBar

Foodbar is a full stack application that lets you order food from a restaurant. After a checkout, the customer and the restaurant are notified of the order that was placed.

# Final Product

!["Screenshot of home page"](https://github.com/adibalamir/tweeter/blob/master/docs/tweets.PNG?raw=true)
!["Screenshot of lunch menu"](https://github.com/adibalamir/tweeter/blob/master/docs/tweet-compose-box.PNG?raw=true)
!["Screenshot of cart"]()


## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- node-sass
- bcrypt
- cookie-session
- pg
- knex
- twilio

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. within postgres (type psql) run these commands
  - CREATE ROLE labber WITH LOGIN password 'labber';
  - CREATE DATABASE midterm OWNER labber;
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.