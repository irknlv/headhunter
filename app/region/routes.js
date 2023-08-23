const express = require('express');
const router = express.Router();
const { getAllCountries, getAllCities } = require('./controllers');

router.get('/api/region/countries', getAllCountries);
router.get('/api/region/cities', getAllCities)

module.exports = router