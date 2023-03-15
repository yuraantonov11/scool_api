const {readFileSync} = require('fs');

const isProduction = process.env.AZURE_MYSQL_HOST;
// const isProduction = process.env.NODE_ENV === 'production';
const config = {
  host: process.env.AZURE_MYSQL_HOST || "localhost",
  username: process.env.AZURE_MYSQL_USER || "root",
  password: process.env.AZURE_MYSQL_PASSWORD || "pass",
  database: process.env.AZURE_MYSQL_DATABASE || "restapi",
  port: process.env.AZURE_MYSQL_PORT || "3306",
  dialect: isProduction ? 'mysql' : 'sqlite',
  storage: isProduction ? undefined : ':memory:',
};

if(process.env.PATH_CA_CERTIFICATE){
  config.dialectOptions = {
    ssl: {
      ca: readFileSync(process.env.PATH_CA_CERTIFICATE).toString(),
    },
  };
}

module.exports = config;
