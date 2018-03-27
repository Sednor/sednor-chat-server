let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => res.send('SEDNOR-CHAT-SERVER'));

router.post('/post-test', (req, res, next) => res.send('CORS'));

module.exports = router;
