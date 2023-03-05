const Sequelize = require("sequelize");
const UserModel = require("./User.model");
const PostModel = require("./Post.model");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = new UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

// Define relationships between models, if any

(async () => {
  await sequelize.sync({ force: true });
  // your code here
})();

const models = {
  User: User,
  Post: Post,
};

module.exports = models;
