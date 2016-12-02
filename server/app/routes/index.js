'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
var Ads = require('../../db/models').Ad;
var User = require('../../db/models').User;
const View = require('../../db/models').View;
const Advertiser = require('../../db/models').Advertiser;

module.exports = router;

router.use('/auth', require('./auth'));
// auth includes POST to /login, /adv_login, /signup, /adv_signup,
//            and GET to /logout, /me
router.use('/views', require('./views'));
// views includes POST to /:userID/:adId
//             and GET to /adHistory
router.use('/ad', require('./ad'));
// ad includes a POST to '/' which creates a new ad
//           and GET  to  '/:adID' which returns metrics on a particular ad.
router.use('/advertiser', require('./advertiser'));
router.use('/payment', require('./payment'));

// includes GET to /ads, /totalspend

router.use('/tweet', require('./tweet'));


router.get('/videos', (req,res) => {
  if(req.user){
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
  } else {
    res.sendStatus(404)
  }
})

// Make sure this is after all of
// the registered routes! If a request was made to /api/ that doesn't match any of the above, we return 404
router.use(function (req, res) {
  res.status(404).end();
});
