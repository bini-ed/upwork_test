const async = require("async");
const { createTransaction } = require("../../utilities/database/sequelize");
const { ToDoDAL } = require("../../dal/ToDo");

const {
  InternalServerError,
  BadRequestError,
} = require("../../utilities/Error/Error");

class ToDoService {
  static create(payload) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction, done) => {
            ToDoDAL.create({ ...payload }, transaction)
              .then((to_do) => done(null, transaction, to_do.id))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
        ],
        (error, transaction) => {
          if (error) {
            reject(error);
            transaction.rollback();
          } else {
            resolve(true);
            transaction.commit();
          }
        }
      );
    });
  }

  static findAll = (queries) => {
    return new Promise((resolve, reject) => {
      let query = {};
      if (queries) query = queries;

      ToDoDAL.findMany(query)
        .then((to_do) => {
          resolve(to_do);
        })
        .catch((error) => {
          reject(new InternalServerError(error));
        });
    });
  };

  static findByID = (id) => {
    return new Promise((resolve, reject) => {
      let query = { id: id };
      ToDoDAL.findOne(query)
        .then((to_do) => {
          resolve(to_do);
        })
        .catch((error) => {
          reject(new InternalServerError(error));
        });
    });
  };

  static update = (id, payload, transaction) => {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done) => {
            ToDoDAL.findOne({ id: id })
              .then((to_do) => {
                if (to_do) {
                  done(null, to_do);
                } else {
                  done(new NotFoundError("To Do Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (to_do, done) => {
            ToDoDAL.update(to_do, payload, transaction)
              .then((result) => resolve(result))
              .catch((error) => done(new BadRequestError(error)));
          },
        ],
        (error) => {
          if (error) {
            console.log(error);
            reject(error);
          }
        }
      );
    });
  };

  static delete(id) {
    return new Promise((resolve, reject) => {
      let query = { id: id };
      ToDoDAL.delete(query)
        .then((result) => resolve(result))
        .catch((error) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

module.exports = ToDoService;
