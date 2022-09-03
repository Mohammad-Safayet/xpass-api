const dotenv = require('dotenv');

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env`;
}
dotenv.config({ path });

exports.PORT = process.env.PORT ?? '5000';
exports.ENV = process.env.NODE_ENV;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_NAME = process.env.DB_NAME; 
exports.DB_HOSTNAME = process.env.DB_HOSTNAME; 
exports.DB_PORT = process.env.DB_PORT;