let express = require('express');
let router = express.Router();

let AuthController = require('./../controllers/AuthController');

router.get('/current', AuthController.current);

module.exports = router;
