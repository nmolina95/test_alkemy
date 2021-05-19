const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.index);
router.get('/create', moviesController.create);
router.post('/create', moviesController.store);
router.get('/edit/:id', moviesController.edit);
router.get('/:id', moviesController.detail);
router.post('/delete/:id', moviesController.delete);
router.post('/edit/:id', moviesController.update);

module.exports = router;