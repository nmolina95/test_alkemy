const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.index);
router.get('/add', genresController.create);
router.post('/add', genresController.store);
router.get('/:id', genresController.detail);
router.get('/edit/:id', genresController.edit);
router.post('/edit/:id', genresController.update);
router.post('/delete/:id', genresController.delete);

module.exports = router;