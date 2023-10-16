const { DataTypes } = require("sequelize");
const { getConnection } = require("../config/dbConfig");

const { initAdminModel } = require("./AdminModel");

const foodModel = {
  Food_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  F_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cookTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    required: true,
    defaultValue: []
  },
  stat: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  imageKey: {
    type: DataTypes.STRING,
  },
  F_price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
};

const initFoodModel = async () => {
  try {

    const Admin = await initAdminModel()
    const sequelize = await getConnection();
    const food = sequelize.define("food", foodModel, {
      freezeTableName: true,
    });

    food.belongsTo(Admin, { foreignKey: 'admin_id', targetKey: 'id' });
   
    await food.sync({ alter: true });
    return food;
  } catch (err) {
    console.log("sdfsdfsd", err.stack);
  }
};


module.exports =  {initFoodModel} ;