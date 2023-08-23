const express = require('express');
const { getSpecializations } = require('./controllers');
const router = express.Router();

router.get('/api/specializations', getSpecializations);

module.exports = router