const router = require('express').Router();
const { controllerParity } = require('../controllers');

router.get('/', controllerParity.findAll);
router.post('/', controllerParity.addSource);

module.exports = router;
