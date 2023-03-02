const config = require('./db.config.js');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config);

sequelize
.authenticate()
.then(() => {
  console.log("Database connection has been established successfully.");
})
.catch((err) => {
  console.error("Unable to connect to the database:", err);
});

module.exports = sequelize;
