const router = require('express').Router();

router.use('/', require('./get.players'));
router.use('/', require('./get.scorers.players'));

module.exports = router;