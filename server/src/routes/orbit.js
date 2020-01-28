const express = require('express');
const controller = require('../controllers/orbit');
const router = express.Router();

// api/orbit
router.get('/planet', controller.planet);
router.post('/canvas', controller.canvas);

module.exports = router;