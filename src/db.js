const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
let db = {};
const Op = Sequelize.Op;
const sequelize = new Sequelize('bookmarkDB', null, null, {
  dialect: 'sqlite',
  storage: './bookmarks.sqlite',
  operatorsAliases: Op
});

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const filePath = path.join(__dirname, 'models', file);
    let model = sequelize['import'](filePath);
    db[model.name] = model;
  });

Object.keys(db).forEach(name => {
  if(db[name].associate) {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
