"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config    = require(path.join(__dirname, '..', 'config', 'db.json'));

// init sequelize connexion
var sequelize = new Sequelize(config.database, config.username, config.password);
var db        = {};
var names    = [];
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    names.push(model);
  });

db.names = names;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;