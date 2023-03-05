const config = require('./db.config.js');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:');
  }
})();


module.exports = sequelize;
