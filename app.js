const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
// const checkUser = require('./')
const DBrui =
  "mongodb+srv://Datamanagement:gKqq46vSnvymlnWk@cluster0.nkzwg3y.mongodb.net/People?retryWrites=true&w=majority";

const cookieParser = require("cookie-parser");

const body_parser = require("body-parser");
const Person = mongoose.connect(DBrui).then((result) => {
  app.listen(3500, () => {
    console.log("listening to port 3500");
  });
});

const app = express();
app.use(express.static("./views"));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.use("", (req, res) => {
  res.send("<h1>404 Status: 404</h1>");
});