const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const faqController = require('../controllers/faqController');
const { createFaqSchema, updateFaqSchema } = require('../validators/faqValidator');

router.get('/public', faqController.getPublished);
router.get('/', protect, authorize('admin'), faqController.getAll);
router.post('/', protect, authorize('admin'), validate(createFaqSchema), faqController.create);
router.put('/:id', protect, authorize('admin'), validate(updateFaqSchema), faqController.update);
router.delete('/:id', protect, authorize('admin'), faqController.delete);

module.exports = router;
