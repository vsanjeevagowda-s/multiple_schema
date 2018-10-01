'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/..\config\config.json')[env];
const db = {};

let sequelize_read;
let sequelize_rw;
sequelize_read = new Sequelize(config.read_only.database, config.read_only.username, config.read_only.password, config.read_only);
sequelize_rw = new Sequelize(config.read_write.database, config.read_write.username, config.read_write.password, config.read_write);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    debugger
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize_read = sequelize_read;
db.sequelize_rw = sequelize_rw;
db.Sequelize = Sequelize;

module.exports = db;
debugger

