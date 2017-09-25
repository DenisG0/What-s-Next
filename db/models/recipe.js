'use strict';

var Sequelize = require('sequelize')
var db = require('../index.js')



const Recipe = db.define('recipe', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  directions: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

module.exports = Recipe
