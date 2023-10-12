const { Sequelize } = require("sequelize");
const dotenv = require('dotenv')
dotenv.config();
const { DATABASE, HOST, USERNAME, PASSWORD } = require("./constants");

let connection = null;

const getConnection = async () => {
  if (!connection) {
    connection = new Sequelize({
      database: "crudflutterfood",
      host: "localhost",
      username: "jithesh",
      password: "jithesh@123",
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

module.exports = { getConnection,sequelize: connection};
