"use strict";

const mongoose = require("mongoose");

const Restaurant = require("../models/restaurant");

mongoose.connect("mongodb://localhost/mapbox-example", {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const restaurants = [
  {
    name: "Sonora",
    description: "Cheap a** restaurant",
    location: {
      type: "Point",
      coordinates: [41.3975248, 2.1910079]
    }
  },
  {
    name: "Timesburg",
    description: "Best burgers in Poblenou",
    location: {
      type: "Point",
      coordinates: [41.4007419, 2.1987251]
    }
  }
];

Restaurant.insertMany(restaurants)
  .then(() => {
    console.log("Restaurants Created");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
