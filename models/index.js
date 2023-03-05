const sequelize = require("../config/database");
const Sequelize = require('sequelize');
const UserModel = require("./User.model");
const PostModel = require("./Post.model");


const User = new UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

(async () => {
  try {
  await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:');
  }
})();

const models = {
  User: User,
  Post: Post,
};

module.exports = models;
