const express = require('express');
const router = express.Router();
const { exampleController } = require('../controllers/index');

// Define your routes here
router.get('/example', exampleController);

module.exports = router;