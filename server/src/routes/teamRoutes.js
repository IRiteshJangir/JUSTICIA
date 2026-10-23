const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const teamController = require('../controllers/teamController');
const { createTeamSchema, updateTeamSchema } = require('../validators/teamValidator');

router.get('/public', teamController.getPublished);
router.get('/public/:id', teamController.getById); // Changed from getById to handle public viewing as required
router.get('/', protect, authorize('admin'), teamController.getAll);
router.post('/', protect, authorize('admin'), validate(createTeamSchema), teamController.create);
router.put('/:id', protect, authorize('admin'), validate(updateTeamSchema), teamController.update);
router.delete('/:id', protect, authorize('admin'), teamController.delete);

module.exports = router;
