'use strict';

const express = require('express');
const router = express.Router();

const Restaurants = require('../models/restaurant');

// GET  /api/restaurants     -  Get restaurants listing.
router.get('/restaurants', function (req, res, next) {
  Restaurants.find()
    .then(restaurants => res.json(restaurants))
    .catch(next);
});

module.exports = router;
