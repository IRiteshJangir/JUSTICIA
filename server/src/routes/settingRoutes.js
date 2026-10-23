const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const settingsController = require('../controllers/settingsController');
const { updateSettingsSchema } = require('../validators/settingsValidator');

router.get('/', settingsController.get);
router.put('/', protect, authorize('admin'), validate(updateSettingsSchema), settingsController.update);

module.exports = router;
