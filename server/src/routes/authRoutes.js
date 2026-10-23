const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimiter');
const authController = require('../controllers/authController');
const { loginSchema, changePasswordSchema } = require('../validators/authValidator');

router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);
router.patch('/change-password', protect, validate(changePasswordSchema), authController.changePassword);
router.post('/logout', protect, authController.logout);

module.exports = router;
