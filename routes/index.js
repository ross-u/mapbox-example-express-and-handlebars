"use strict";

const express = require("express");
const router = express.Router();

const Restaurants = require("../models/restaurant");

// GET      /     - Renders the home page with the restaurants map
router.get("/", (req, res, next) => {
  Restaurants.find()
    .then((restaurants) => {
      console.log(restaurants[0].location.coordinates[0]);
      res.render("index", { restaurants });
    })
    .catch(next);
});

module.exports = router;
