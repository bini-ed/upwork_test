const express = require("express");
const ToDoController = require("../../controller/ToDo/ToDo.controller");

const router = express.Router();

router.get("/", ToDoController.findAll);

router.get("/:id", ToDoController.findByID);

router.post("/", ToDoController.create);

router.put("/", ToDoController.update);

router.delete("/:id", ToDoController.delete);

router.post("/clear", ToDoController.clearCompleted);

module.exports = router;
