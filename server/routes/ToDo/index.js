const ToDoRoute = require("./ToDo.routes");

const ToDoRoutes = (app) => {
  app.use("/api/to-do", ToDoRoute);
};

module.exports = ToDoRoutes;
