const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const appointmentController = require('../controllers/appointmentController');
const { createAppointmentSchema, updateStatusSchema } = require('../validators/appointmentValidator');

router.post('/', validate(createAppointmentSchema), appointmentController.create);
router.get('/', protect, authorize('admin'), appointmentController.getAll);
router.get('/:id', protect, authorize('admin'), appointmentController.getById);
router.patch('/:id/status', protect, authorize('admin'), validate(updateStatusSchema), appointmentController.updateStatus);
router.delete('/:id', protect, authorize('admin'), appointmentController.delete);

module.exports = router;
