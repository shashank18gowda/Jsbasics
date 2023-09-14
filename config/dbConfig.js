const { Sequelize } = require("sequelize");
const dotenv = require('dotenv')
dotenv.config();
const { DATABASE, HOST, USERNAME, PASSWORD } = require("../config/constants");
// const DATABASE = process.env.DATABASE
// const HOST = process.env.HOST
// const USERNAME = process.env.USERNAME
// const PASSWORD = process.env.PASSWORD

let connection = null;
// connecting to db
const getConnection = async () => {
  if (!connection) {
    connection = new Sequelize({
      database: "postgresandaws",
      host: "localhost",
      username: "postgresaws",
      password: "sh@18",
      port: "5432",
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    });
  }
  return connection;
};

module.exports = { getConnection };
