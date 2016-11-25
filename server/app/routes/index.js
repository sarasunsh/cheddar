'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
var Ads = require('../../db/models').Ad;
var User = require('../../db/models').User;

module.exports = router;

router.use('/auth', require('./auth'));
router.use('/views', require('./views'));

router.get('/videos', (req,res) => {
  Ads.findAll({
    limit: 2,
    order: [['id', 'DESC']]
  })
  .then(ads => res.json(ads))
})

router.get('/advertisers/:advertiserId', (req,res) => {

  // Right now, we are not using the advertiserId
  Ads.findAll({
    // limit: 2,
    order: [['id', 'DESC']]
  })
  .then(ads => res.json(ads))
})


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});
