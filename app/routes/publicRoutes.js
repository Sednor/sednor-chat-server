let express = require('express');
let router = express.Router();

let AuthController = require('../controllers/AuthController');

router.post(`${AuthController.prefix}/signin`, AuthController.signIn);
router.post(`${AuthController.prefix}/signup`, AuthController.signUp);

module.exports = router;
