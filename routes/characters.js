const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/charactersController');

router.get('/', charactersController.index);

module.exports = router;