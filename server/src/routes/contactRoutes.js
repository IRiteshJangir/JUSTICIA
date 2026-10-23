const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const contactController = require('../controllers/contactController');
const { createContactSchema, updateContactStatusSchema } = require('../validators/contactValidator');

router.post('/', validate(createContactSchema), contactController.create);
router.get('/', protect, authorize('admin'), contactController.getAll);
router.get('/:id', protect, authorize('admin'), contactController.getById);
router.patch('/:id/status', protect, authorize('admin'), validate(updateContactStatusSchema), contactController.updateStatus);
router.delete('/:id', protect, authorize('admin'), contactController.delete);

module.exports = router;
