const router = require('express').Router();
const routerParity = require('./parity');

router.get('/', (req, res) => {
  res.send('welcome to hotel parity app');
});

router.use('/parity', routerParity);

module.exports = router;
