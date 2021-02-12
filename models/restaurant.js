"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  description: String,
  // The `location` field must have the following structure:
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
});

restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
