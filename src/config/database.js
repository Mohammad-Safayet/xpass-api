require("dotenv").config()

console.log(process.env.DB_NAME);

module.exports = {
  "development": {
    "username": "postgres",
    "password": "root123456",
    "database": "xpass-local",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "timestamps": false
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "define": {
      "timestamps": false
    },
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
