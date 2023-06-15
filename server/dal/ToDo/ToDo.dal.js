const db = require("../../utilities/database/sequelize");
const ToDo = db.toDoModel;

class ToDoDAL {
  static create(to_do, transaction) {
    return new Promise((resolve, reject) => {
      ToDo.create(to_do, { transaction: transaction })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  static findMany(query) {
    return new Promise((resolve, reject) => {
      ToDo.findAll({
        where: query,
        order: [["message", "ASC"]],
        raw: true,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }
  static findOne(query) {
    return new Promise((resolve, reject) => {
      ToDo.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  static update(to_do, payload, transaction) {
    return new Promise((resolve, reject) => {
      if (to_do) {
        if (payload.message !== undefined) to_do.message = payload.message;
        if (payload.completed !== undefined)
          to_do.completed = payload.completed;
        if (payload.type !== undefined) to_do.type = payload.type;
        to_do
          .save({ transaction })
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  static delete(query) {
    return new Promise((resolve, reject) => {
      ToDo.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

module.exports = { ToDoDAL };
