let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => res.send('SEDNOR-CHAT-SERVER'));

module.exports = router;
