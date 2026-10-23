const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const dashboardController = require('../controllers/dashboardController');

router.use(protect, authorize('admin'));

router.get('/stats', dashboardController.getStats);
router.get('/analytics', dashboardController.getAnalytics);

module.exports = router;
