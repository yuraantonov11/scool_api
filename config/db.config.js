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


const caCertificatePath = process.env.PATH_CA_CERTIFICATE;
if(caCertificatePath){
  let caCertificate;
  try {
    caCertificate = readFileSync(caCertificatePath);
  } catch (e) {
    console.log('caCertificate error:');
    console.log(e);
  }

  config.dialectOptions = {
    ssl: {
      ca: caCertificate,
      rejectUnauthorized: true,
    },
  };
}

module.exports = config;
