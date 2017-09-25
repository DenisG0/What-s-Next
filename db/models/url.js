'use strict';

var Sequelize = require('sequelize')
var db = require('../index.js')



const Site = db.define('url', {
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Site
