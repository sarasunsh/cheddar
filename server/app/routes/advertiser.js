const advertisers = require('express').Router();
const User = require('../../db/models').User;
const View = require('../../db/models').View;
const Ad = require('../../db/models').Ad;

module.exports = advertisers;

// All ads for a specific advertiser
advertisers.get('/ads', (req, res, next) => {
  // Use req.user.id in the search area
  Ad.findAll({
    where: {
      advertiserId: Number(req.user.id)
    }
  })
  .then( adArray => {
    res.json(adArray);
  })
  .catch(err => console.log(err));

});

function sumSmilyScoreDollarsOfAd (ad) {
  return View.sum('smilyScore', {
    where: {
      adId: ad.id
    }
  })
  .then( smilyScoreSum => { // array of all views of a particular ad
      return smilyScoreSum * ad.cost/100;
  });
}

// Total dollars spent on ads for a specific advertiser
advertisers.get('/totalspend', (req, res, next) => {
  Ad.findAll({
    where: {
      advertiserId: req.user.id
    }
  })
  .then( adArray =>  {
    var promiseArray = adArray.map(ad => sumSmilyScoreDollarsOfAd(ad));
    return Promise.all(promiseArray)
                  .then ( valueArray => {
                    if (valueArray.length){
                      return valueArray.reduce( (accumulator, curr) => accumulator + curr);
                    } else {
                      return [];
                    }
                  });
  })
  .then(result => res.send(result.toString()))
  .catch(next);

});
