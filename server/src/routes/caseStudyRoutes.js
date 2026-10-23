const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const caseStudyController = require('../controllers/caseStudyController');
const { createCaseStudySchema, updateCaseStudySchema } = require('../validators/caseStudyValidator');

router.get('/public', caseStudyController.getPublished);
router.get('/public/:slug', caseStudyController.getBySlug);
router.get('/', protect, authorize('admin'), caseStudyController.getAll);
router.post('/', protect, authorize('admin'), validate(createCaseStudySchema), caseStudyController.create);
router.put('/:id', protect, authorize('admin'), validate(updateCaseStudySchema), caseStudyController.update);
router.delete('/:id', protect, authorize('admin'), caseStudyController.delete);

module.exports = router;
