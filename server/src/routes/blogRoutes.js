const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const blogController = require('../controllers/blogController');
const { createBlogSchema, updateBlogSchema } = require('../validators/blogValidator');

router.get('/public', blogController.getPublished);
router.get('/public/:slug', blogController.getBySlug);
router.get('/', protect, authorize('admin'), blogController.getAll);
router.post('/', protect, authorize('admin'), validate(createBlogSchema), blogController.create);
router.put('/:id', protect, authorize('admin'), validate(updateBlogSchema), blogController.update);
router.delete('/:id', protect, authorize('admin'), blogController.delete);

module.exports = router;
