const { Sequelize } = require("sequelize");
const { getConnection } = require("../config/dbConfig");

const sequelize = getConnection();

module.exports = {sequelize};