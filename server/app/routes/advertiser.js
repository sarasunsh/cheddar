const Express = require('express');
const advertisers = Express.Router();
const User = require('../../db/models').User;
const View = require('../../db/models').View;
const Ad = require('../../db/models').Ad;

module.exports = advertisers;

// Adding a new view
/*

advertisers.get('/:adID', function (req, res, next) {
    View.findAll({
        where: { adId: req.params.adID},
        include: [User, Ad]
    })
    .then(viewData => res.send(viewData))
    .catch(err => console.log(err))
});

*/

function sumSmilyScoreDollarsOfAd (adId) {
  return View.findAll({
    where: {
      adId: adId
    },
    include: [Ad]
  })
  .then( adViewArray =>  // array of all views of a particular ad
    {

      // console.log("adViewArray", adViewArray);
      var smilyScoreSum = adViewArray.reduce( (accumulator, curr) => {
          // console.log("accumulator", accumulator);
          // console.log("curr.dataValues.smilyScore", curr.smilyScore);
          return accumulator + curr.smilyScore;
        }, 0
      );
      // console.log("smilyScoreSum", smilyScoreSum);
      // console.log("adViewArray[0].ad.cost", adViewArray[0].ad.cost );
      return smilyScoreSum * adViewArray[0].ad.cost/100;
      // console.log("smilyScoreSum * ad.davaValues.cost", smilyScoreSum * +ad.dataValues.cost);
      // return smilyScoreSum * ad.dataValues.cost;  // total dollars spent for this ad
  });
}

// All ads for a specific advertiser
advertisers.get('/ads', (req, res, next) => {

  // Use req.user.id in the search area
  // console.log("***** /ads req.user.id", req.user.id);

  req.user.id && Ad.findAll({
    where: {
      advertiserId: req.user.id
    }
  })
  .then( adArray => {
    // console.log("******* adArray", adArray)
    res.send(adArray);
  })
  .catch(err => console.log(err));

});


// Total dollars spent on ads for a specific advertiser
advertisers.get('/totalspend/', (req, res, next) => {
  // console.log("****** /totalspend req.user.id ", req.user.id);

  // Use req.user.id in the search area

  req.user.id && Ad.findAll({
    where: {
      advertiserId: req.user.id
    }
  })
  .then( adArray =>  {
    var promiseArray = adArray.map( ad => {
      // console.log("ad", ad);
      // console.log("ad.id", ad.id);
      return sumSmilyScoreDollarsOfAd(ad.id)

    });


    // console.log("******* promiseArray", promiseArray);

    return Promise.all(promiseArray)
    .then ( valueArray => {

      // console.log("******* valueArray", valueArray);

      return valueArray.reduce( (accumulator, curr) => accumulator + curr) ;
      });

  })
  .then( result => {
    // console.log("****** result", result);
    result += "";
    res.send(result);

  })
  .catch(next);


});

