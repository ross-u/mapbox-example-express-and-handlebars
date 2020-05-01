"use strict";

require('dotenv').config();
const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");

const { DB_NAME } = process.env; // Get the DB_NAME value stored in .env file

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

mongoose.connect(
  `mongodb://localhost:27017/${DB_NAME}`, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
.then( (x) => {
  console.log(`Connected to DB: ${x.connections[0].name}`);
  return x.connection.dropDatabase();
})
.then( () =>  Restaurant.insertMany(restaurants))
.then((createdRestaurants) => {
  console.log("Restaurants Created:", createdRestaurants.length);
  return mongoose.connection.close();
})
.catch( (err) => console.log(err));
