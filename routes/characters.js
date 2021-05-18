const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/charactersController');

router.get('/', charactersController.index);
router.get('/create', charactersController.create);
router.post('/create', charactersController.store);
router.get('/:id', charactersController.detail);
router.post('/delete/:id', charactersController.delete);

module.exports = router;