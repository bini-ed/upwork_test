require("dotenv").config();
const { Sequelize } = require("sequelize");

const { ToDoModel } = require("../../model/ToDo/ToDo");

const config =
  process.env.NODE_ENV === "production"
    ? require("../../config/production.js")
    : require("../../config/development.js");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: 0,
  retry: {
    match: [/Deadlock/i],
    max: 3,
    maxTimeout: 1000,
  },
  pool: {
    max: 100,
    min: 50,
    acquire: 30000,
    idle: 10000,
  },
  logging: config.logging,
});

async function createDatabase() {
  try {
    // await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  } finally {
    await sequelize.close();
    console.log("Connection closed.");
  }
}

const createTransaction = () => {
  return new Promise(async (resolve, reject) => {
    sequelize
      .transaction()
      .then((transaction) => resolve(transaction))
      .catch((error) => reject(error));
  });
};

const toDoModel = ToDoModel(sequelize);
const db = {
  sequelize,
  toDoModel,
  createDatabase,
  createTransaction,
};

module.exports = db;
