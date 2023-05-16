const router = require('express').Router();

router.use('/', require('./get.current.matches'));

module.exports = router;