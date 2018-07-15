# FoodBar

FoodBar is a food-ordering app that uses the Twilio API to automate communication between vendor and client.  Users can browse menus, add items to a shopping cart and review their order before checkout.  Once an order is submitted, the vendor will receive an SMS confirmation message.  The business can then specify a preparation time and the app will auto-generate an SMS response to the customer.

# Screenshots

!["Screenshot of home page"](https://github.com/dmyronuk/foodbar/blob/working/docs/homepage.PNG?raw=true)
!["Screenshot of lunch menu"](https://github.com/dmyronuk/foodbar/blob/working/docs/menu.PNG?raw=true)
!["Screenshot of cart"](https://github.com/dmyronuk/foodbar/blob/working/docs/cart.PNG?raw=true)
!["Screenshot of sample SMS"](https://github.com/dmyronuk/foodbar/blob/working/docs/SMS-sample.jpg?raw=true)


## Dependencies
- Express
- Node 5.10.x or above
- body-parser
- node-sass
- bcrypt
- cookie-session
- postgresql
- knex
- twilio

## Getting Started

#### Install Dependencies
-  `npm install`

#### Setup Postgres - from the psql terminal run:
```
CREATE ROLE labber WITH LOGIN password 'labber';
CREATE DATABASE midterm OWNER labber;
```

#### Populate the database - from the /db directory run:
```
knex migrate:latest;
knex seed:run;
```

#### Configure Twilio API (optional)
- To test the app's message features, sign up for a free Twilio API key at <https://www.twilio.com/try-twilio>
- Update the project's .env file with the following credentials:
    - `TWILIO_TOKEN`
    - `TWILIO_ACCOUNT_SID`
    - `TWILIO_NUMBER` phone number provided by Twilio
    - `BUSINNESS_PHONE` phone number that will receive notifications when a customer places an order
    - `CLIENT_PHONE` phone number that will receive confirmation when restaurant confirms order

#### Run the dev server
- ```npm run local```
- Run in browser at <http://localhost:8080/>

## Developers
- https://github.com/dmyronuk
- https://github.com/adibalamir
- https://github.com/buzzjam