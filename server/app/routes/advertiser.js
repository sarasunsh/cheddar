const Express = require('express');
const advertisers = Express.Router();
const User = require('../../db/models').User;
const View = require('../../db/models').View;
const Ad = require('../../db/models').Ad;

module.exports = advertisers;

function sumSmilyScoreDollarsOfAd (adId) {
  return View.findAll({
    where: {
      adId: adId
    },
    include: [Ad]
  })
  .then( adViewArray => { // array of all views of a particular ad
      var smilyScoreSum = adViewArray.reduce( (accumulator, curr) => {
          return accumulator + curr.smilyScore;
        }, 0
      );
      return smilyScoreSum * adViewArray[0].ad.cost/100;
  });
}

// All ads for a specific advertiser
advertisers.get('/ads', (req, res, next) => {

  // Use req.user.id in the search area
  req.user && Ad.findAll({
    where: {
      advertiserId: req.user.id
    }
  })
  .then( adArray => {
    res.send(adArray);
  })
  .catch(err => console.log(err));

});


// Total dollars spent on ads for a specific advertiser
advertisers.get('/totalspend/', (req, res, next) => {

  req.user && Ad.findAll({
    where: {
      advertiserId: req.user.id
    }
  })
  .then( adArray =>  {
    var promiseArray = adArray.map(ad => sumSmilyScoreDollarsOfAd(ad.id));

    return Promise.all(promiseArray)
                  .then ( valueArray => {
                      if (valueArray.length)
                        return valueArray.reduce( (accumulator, curr) => accumulator + curr);
                      else {
                        return [];
                    }
                    });
  })
  .then(result => res.send(result.toString()))
  .catch(next);

});
