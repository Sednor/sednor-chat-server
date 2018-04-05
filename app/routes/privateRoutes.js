let express = require('express');
let router = express.Router();

let AuthController = require('../controllers/AuthController');
let UserController = require('../controllers/UserController');
let ChatController = require('../controllers/ChatController');

router.get(`${AuthController.prefix}/current`, AuthController.current);

router.get(`${UserController.prefix}/index`, UserController.index);

router.get(`${ChatController.prefix}/:id`, ChatController.findById);
router.post(`${ChatController.prefix}`, ChatController.create);

module.exports = router;
