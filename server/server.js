const mongoose = require("mongoose");
const { config } = require("dotenv");
const app = require("./app");

config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB, { autoIndex: true }).then(() => {
  console.log("Connected to DB");
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.log(err);
  server.close(() => process.exit(1));
});
