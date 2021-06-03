const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, moviesController.index);
router.get('/create', authMiddleware, moviesController.create);
router.post('/create', authMiddleware, moviesController.store);
router.get('/find', moviesController.find);
router.post('/find', moviesController.search);
router.get('/edit/:id', authMiddleware, moviesController.edit);
router.get('/:id', authMiddleware, moviesController.detail);
router.post('/delete/:id', authMiddleware, moviesController.delete);
router.post('/edit/:id', authMiddleware, moviesController.update);

module.exports = router;