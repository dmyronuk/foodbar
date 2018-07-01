# FoodBar

Foodbar is a full stack application that lets you order food from a restaurant. After a checkout, the customer and the restaurant are notified of the order that was placed via SMS. The client will receive a text containing the total price and the estimated completion time. The restaurant will receive a text containing the items and the time that the order was placed.

# Final Product

!["Screenshot of home page"](https://github.com/dmyronuk/foodbar/blob/working/docs/homepage.PNG?raw=true)
!["Screenshot of lunch menu"](https://github.com/dmyronuk/foodbar/blob/working/docs/menu.PNG?raw=true)
!["Screenshot of cart"](https://github.com/dmyronuk/foodbar/blob/working/docs/cart.PNG?raw=true)


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
3. Within postgres (type psql), run these commands
  - CREATE ROLE labber WITH LOGIN password 'labber';
  - CREATE DATABASE midterm OWNER labber;
5. Change into "db" folder and run these commands:
  - knex migrate:latest
  - knex seed:run
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Notes

- Twilio's api will only allow for registered phone numbers so to test this functionality, you can contact the developers.

## Developers

https://github.com/dmyronuk
https://github.com/adibalamir
https://github.com/buzzjam