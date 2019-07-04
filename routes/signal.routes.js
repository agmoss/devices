var express = require('express');
var router = express.Router();

var signal_controller = require('../controllers/signal.controller');

// All signal data
router.get('/signal/all', signal_controller.signal_model_all);

// Filter by status
router.get('/signal/status/:status',signal_controller.signal_model_status);

// Filter by assetun
router.get('/signal/assetun/:assetun',signal_controller.signal_model_assetUN);

// Filter by assetun and status
router.get('signal/assetun/:assetun/status/:status',signal_controller.signal_model_assetUN_status);

// Create a new signal
router.post('/signal/add', signal_controller.add_signal);

// Delete a signal entry
router.delete('/signal/delete/:key',signal_controller.delete_signal)

module.exports = router;