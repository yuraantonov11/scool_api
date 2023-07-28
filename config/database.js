const config = require('./db.config.js');
const Sequelize = require("sequelize");
const User = require('../models/User.model');

const sequelize = new Sequelize(config);

(async () => {
  try {
    await sequelize.authenticate();
    // Insert demo data
    const data = require("../demo/data.json");
    await User.bulkCreate(data);
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:');
    console.log(error);
  }
})();


module.exports = sequelize;
