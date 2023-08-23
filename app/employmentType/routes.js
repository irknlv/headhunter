const express = require('express');
const router = express.Router();
const { getAllEmpTypes } = require('./controllers');

router.get('/api/employmentTypes', getAllEmpTypes);

module.exports = router