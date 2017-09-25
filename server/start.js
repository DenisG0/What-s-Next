'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const app = express()
const startDb = require('../db/index');

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}

var createApplication = function () {
  var serve = require('./api');
  app.on('request', serve); // Attach the Express application.
};

//The code below works because `.use` returns `this` which is `app`. So what we want to return in the `module.exports` is `app`, and we can chain on that declaration because each method invokation returns `app` after mutating based on the middleware functions
module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .use('/api', require('./api')) // Serve our api
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))) // Send index.html for any other requests.



// const $ = cheerio.load('<ul class="recipe__ingredientList">...</ul>')
// console.log($("ul.recipe__ingredientList").text())

// cheerioReq("http://www.bhg.com/recipe/chicken/chicken-with-sourdough-mushroom-stuffing/", ($) => {
//     console.log($(".recipe__ingredientList ul").text());
// });


const server = app.listen(
  process.env.PORT || 1337,
  () => {
    console.log("Server is started")
    // console.log(`--- Started HTTP Server for ${pkg.name} ---`)
    // console.log(`Listening on ${JSON.stringify(server.address())}`)
  }
)

startDb
.then(createApplication)
.then(server)
.catch(function (err) {
  console.error(chalk.red(err.stack));
  process.exit(1);
});




