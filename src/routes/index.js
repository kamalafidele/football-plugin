const router = require('express').Router();

router.use('/matches', require('./matches'));
router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

module.exports = router;
