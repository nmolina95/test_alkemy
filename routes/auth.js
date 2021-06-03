const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.indexLogin);
router.post('/login', authController.login);
router.get('/register', authController.index);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;