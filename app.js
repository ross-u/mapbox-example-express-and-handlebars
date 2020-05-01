"use strict";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();
const DB_NAME = "mapbox-example"; 

mongoose.connect(
  `mongodb://localhost:27017/${DB_NAME}`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", indexRouter);
app.use("/api", apiRouter);

// ERROR HANDLERS
// -- 404 and error handler
app.use((req, res, next) => {
  res.status(404);
  res.render("not-found");
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render("error");
  }
});

module.exports = app;
