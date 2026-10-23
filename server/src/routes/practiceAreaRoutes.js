const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const practiceAreaController = require('../controllers/practiceAreaController');
const { createPracticeAreaSchema, updatePracticeAreaSchema } = require('../validators/practiceAreaValidator');

router.get('/public', practiceAreaController.getPublished);
router.get('/public/:slug', practiceAreaController.getBySlug);
router.get('/', protect, authorize('admin'), practiceAreaController.getAll);
router.post('/', protect, authorize('admin'), validate(createPracticeAreaSchema), practiceAreaController.create);
router.put('/:id', protect, authorize('admin'), validate(updatePracticeAreaSchema), practiceAreaController.update);
router.delete('/:id', protect, authorize('admin'), practiceAreaController.delete);

module.exports = router;
