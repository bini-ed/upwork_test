const Joi = require("joi");
const { DataTypes } = require("sequelize");

const ToDoModel = (Sequelize) => {
  const to_do = Sequelize.define("to_do", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNUll: false,
      defaultValue: false,
    },
  });
  return to_do;
};

const validationSchema = Joi.object({
  message: Joi.string().required().label("To Do"),
  type: Joi.string().label("Type"),
});

module.exports = { ToDoModel, validationSchema };
