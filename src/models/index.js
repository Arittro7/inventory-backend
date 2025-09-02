const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, DataTypes);
const Inventory = require('./inventory')(sequelize, DataTypes);
const Item = require('./item')(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  Inventory,
  Item,
};
