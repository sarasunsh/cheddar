'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
var Ads = require('../../db/models').Ad;
var User = require('../../db/models').User;
const View = require('../../db/models').View;
const Advertiser = require('../../db/models').Advertiser;

module.exports = router;

router.use('/auth', require('./auth'));
router.use('/views', require('./views'));
router.use('/ad', require('./ad'));
router.use('/advertiser', require('./advertiser'));

router.get('/videos', (req,res) => {
  View.findAll({
    where: {userId:req.user.id},
    attributes: ['adId']
  })
  .then(viewedAds => {
    if (!viewedAds.length)
      viewedAds = [{adId:0}]
    Ads.findAll({
      order: [['cost', 'DESC']],
      where: {
          id: {$notIn: viewedAds.map(e => e.adId)}
      },
      limit: 2
    })
    .then(ads => res.json(ads))
  })
})

// router.get('/advertisers/:advertiserId', (req,res) => {

//   // Right now, we are not using the advertiserId
//   Ads.findAll({
//     // limit: 2,
//     order: [['id', 'DESC']]
//   })
//   .then(ads => res.json(ads))
// })


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});
