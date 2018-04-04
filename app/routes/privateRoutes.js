let express = require('express');
let router = express.Router();

let AuthController = require('../controllers/AuthController');
let UserController = require('../controllers/UserController');

router.get(`${AuthController.prefix}/current`, AuthController.current);

router.get(`${UserController.prefix}/index`, UserController.index);

module.exports = router;
