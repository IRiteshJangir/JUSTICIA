const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const testimonialController = require('../controllers/testimonialController');
const { createTestimonialSchema, updateTestimonialSchema } = require('../validators/testimonialValidator');

router.get('/public', testimonialController.getPublished);
router.get('/', protect, authorize('admin'), testimonialController.getAll);
router.post('/', protect, authorize('admin'), validate(createTestimonialSchema), testimonialController.create);
router.put('/:id', protect, authorize('admin'), validate(updateTestimonialSchema), testimonialController.update);
router.delete('/:id', protect, authorize('admin'), testimonialController.delete);

module.exports = router;
