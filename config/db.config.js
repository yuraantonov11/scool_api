const {readFileSync} = require('fs');

module.exports = {
  host: process.env.AZURE_MYSQL_HOST || "localhost",
  username: process.env.AZURE_MYSQL_USER || "root",
  password: process.env.AZURE_MYSQL_PASSWORD || "pass",
  database: process.env.AZURE_MYSQL_DATABASE || "restapi",
  port: process.env.AZURE_MYSQL_PORT || "3306",
  dialectOptions: {
    ssl: {
      ca: readFileSync(process.env.PATH_CA_CERTIFICATE).toString(),
    },
  },
  dialect: "mysql",
};

