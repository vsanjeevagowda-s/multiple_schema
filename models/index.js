'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db_read = {};
const db_write = {};

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
    const model_read = sequelize_read['import'](path.join(__dirname, file));
    const model_rw = sequelize_rw['import'](path.join(__dirname, file));
    db_read[model_read.name] = model_read;
    db_write[model_rw.name] = model_rw;
  });

Object.keys(db_read).forEach(modelName => {
  if (db_read[modelName].associate) {
    db_read[modelName].associate(db_read);
  }
});

Object.keys(db_write).forEach(modelName => {
  if (db_write[modelName].associate) {
    db_write[modelName].associate(db_write);
  }
});


db_read.sequelize_read = sequelize_read;
db_write.sequelize_rw = sequelize_rw;
db_read.Sequelize = Sequelize;
db_write.Sequelize = Sequelize;

module.exports = {db_read, db_write};
debugger

