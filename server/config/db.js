const mongoose = require("mongoose");

function connectDB() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://0.0.0.0:27017/mainproject")
    .then((result) => {
      console.log("Database connected");
      console.log("http://localhost:4000");
    })
    .catch((err) => {
      console.log("database error \n" + err);
    });
}

module.exports = connectDB;

