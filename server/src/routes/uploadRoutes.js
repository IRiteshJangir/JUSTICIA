const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { uploadSingle } = require('../middlewares/upload');
const uploadController = require('../controllers/uploadController');

router.use(protect, authorize('admin'));

router.post('/', uploadSingle('image'), uploadController.upload);
router.delete('/:publicId', uploadController.deleteImage);

module.exports = router;
