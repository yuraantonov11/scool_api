const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = require("../config/database");

const UserModel = sequelize.define("user", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("user", "admin", "superadmin", "teacher", "schoolchild"),
    allowNull: false,
    defaultValue: "user",
  },
});

// Hash the password before saving to the database
UserModel.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Compare the provided password with the hashed password
UserModel.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = UserModel;
