var express = require('express');
var router = express.Router();

var signal_controller = require('../../controllers/signal.controller');

// All signal data
router.get('/all', signal_controller.signal_model_all);

// Filter by status
router.get('/status/:status',signal_controller.signal_model_status);

// Filter by assetun
router.get('/assetun/:assetun',signal_controller.signal_model_assetUN);

// Filter by assetun and status
router.get('/assetun/:assetun/status/:status',signal_controller.signal_model_assetUN_status);

module.exports = router;