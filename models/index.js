const Sequelize = require("sequelize");
const UserModel = require("./User.model");
const PostModel = require("./Post.model");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

// Define relationships between models, if any

const models = {
  User: User,
  Post: Post,
};

module.exports = models;
