const async = require("async");
const {
  BadRequestError,
  NotFoundError,
} = require("../../utilities/Error/Error");
const { ToDoService } = require("../../service/ToDo");
const { validationSchema } = require("../../model/ToDo/ToDo");

class ToDoController {
  static create(request, response) {
    const data = request.body;

    async.waterfall(
      [
        (done) => {
          ToDoService.findAll({ message: data.message })
            .then((res) => {
              if (res.length >= 1) {
                let error = new BadRequestError(
                  "You have already added this toDo"
                );
                done(error);
              } else done();
            })
            .catch((error) => done(error));
        },
        (done) => {
          const result = validationSchema.validate(data);
          if (!result.error) {
            done(null);
          } else {
            let error = new BadRequestError(result.error.message);
            done(error);
          }
        },
      ],
      (error) => {
        if (error) {
          response.status(error.statusCode).json(error.payload);
        } else {
          ToDoService.create(data)
            .then(() => response.status(200).send(true))
            .catch((error) => {
              response.status(error.statusCode).json(error.payload);
            });
        }
      }
    );
  }
  static clearCompleted(request, response) {
    const data = request.body;
    async.waterfall(
      [
        (done) => {
          ToDoService.findAll({ type: data.type, completed: true })
            .then((result) => {
              done(null, result);
            })
            .catch((error) => done(error));
        },
        (result, done) => {
          if (!result.length) {
            let error = new BadRequestError("You don't have a completed todo ");
            done(error);
          } else {
            async.eachSeries(
              result,
              (todo, callback) => {
                ToDoService.delete(todo.id)
                  .then(() => callback(null))
                  .catch((error) => callback(error));
              },
              (error) => {
                if (error) {
                  done(error);
                } else {
                  done(null);
                }
              }
            );
          }
        },
      ],
      (error) => {
        if (error) {
          console.log(error);
          response.status(error.statusCode).json(error.payload);
        } else {
          response.status(200).send(true);
        }
      }
    );
  }

  /**
   * Find All ToDo
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request, response) {
    ToDoService.findAll(request.query)
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find ToDO By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByID(request, response) {
    ToDoService.findByID(request.params.id)
      .then((result) => {
        if (result) {
          response.json(result);
        } else {
          let error = new NotFoundError("ToDo Not Found");
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * update User
   *
   * @param {Request} request
   * @param {Response} response
   */
  static update(request, response) {
    const data = request.body;
    const result = validationSchema.validate({ message: data.message });
    if (!result.error) {
      ToDoService.update(data.id, data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          console.log(error);
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.error);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Delete ToDO
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request, response) {
    let id = request.params.id;
    ToDoService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

module.exports = ToDoController;
