require("dotenv").config();
const express = require("express");
const db = require("./utilities/database/sequelize");

const cors = require("cors");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (ex) => {
  console.log("Uncaught exception", ex);
});
process.on("unhandledRejection", (ex) => {
  console.log("Unhandled rejection", ex);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);
// db.createDatabase();

db.sequelize
  .sync({ alter: false })
  .then((res) => console.log("DB initialized Successfully"))
  .catch((err) => console.log("Error occurred while syncing", err));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
