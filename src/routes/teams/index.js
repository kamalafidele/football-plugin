const router = require('express').Router();

router.use('/', require('./get.teams'));

module.exports = router;