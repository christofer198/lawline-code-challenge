# lawline-test

a [Sails](http://sailsjs.org) application

To start clone this repository down. Open the project directory in your terminal. And execute the following command:  `npm install` . Once completed run `nodemon` to start the sails server.

In order to use the app you must first login using one of the seeded users. Use Postman or Curl to create a request to the route (http://localhost:1337/api/v1/login) with a seeded users email and password in the request body as an object. Example: {email: "test@tes.com", password: "password"}

You can find the seeded emails & passwords in the bootstrap.js file located in the config folder.

Once successfully logged in you will be issued a json web token(JWT). Copy and save the JWT as it will be needed to authenticate all requests to other routes. Routes authenticate your issued JWT by checking your headers for an authorization key value pair (Example: {Authorization: "YOUR ISSUED JWT"} ). Be sure to include that with your all requests when testing.
