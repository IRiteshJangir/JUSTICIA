const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const blogCategoryController = require('../controllers/blogCategoryController');
const { createBlogCategorySchema, updateBlogCategorySchema } = require('../validators/blogCategoryValidator');

router.get('/', blogCategoryController.getAll);
router.post('/', protect, authorize('admin'), validate(createBlogCategorySchema), blogCategoryController.create);
router.put('/:id', protect, authorize('admin'), validate(updateBlogCategorySchema), blogCategoryController.update);
router.delete('/:id', protect, authorize('admin'), blogCategoryController.delete);

module.exports = router;
