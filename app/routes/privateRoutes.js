let express = require('express');
let router = express.Router();

let AuthController = require('../controllers/AuthController');

router.get(`${AuthController.prefix}/current`, AuthController.current);

module.exports = router;
