let express = require('express');
let router = express.Router();

let AuthController = require('./../controllers/AuthController');

router.post(`${AuthController.prefix}/signin`, AuthController.signIn);

module.exports = router;
