const express = require('express');
const resetController = require('../controllers/reset');
const router = express.Router();


router.get('/get/:token',resetController.getReset);
router.post('/postreset/:token',resetController.postReset);

exports.routes = router;
