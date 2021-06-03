const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/charactersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, charactersController.index);
router.get('/create', authMiddleware, charactersController.create);
router.post('/create', authMiddleware, charactersController.store);
router.get('/:id', authMiddleware, charactersController.detail);
router.post('/delete/:id', authMiddleware, charactersController.delete);
router.get('/edit/:id', authMiddleware, charactersController.edit);
router.post('/edit/:id', authMiddleware, charactersController.update);

module.exports = router;