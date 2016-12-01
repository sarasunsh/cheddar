const Express = require('express');
const ads = Express.Router();
const User = require('../../db/models').User;
const View = require('../../db/models').View;
const Ad = require('../../db/models').Ad;
const Advertiser = require('../../db/models').Advertiser;


module.exports = ads;

ads.get('/:adID', function (req, res, next) {
    View.findAll({
        where: { adId: req.params.adID},
        include: [User, Ad]
    })
    .then(viewData => {
        let total = 0;
        let count = 0;
        viewData.forEach(view => {
            total += (view.smilyScore / 100) * view.ad.cost;
            count += 1;
        })
        res.send(['$' + parseFloat(Math.round(total * 100) / 100).toFixed(2), count, viewData])
    })
    .catch(err => console.log(err))
});

//This route is hit by the Advertisers component when a user clicks the 'Add ad' button
//it receives an object containing advertiserId, a URL, a cost, and a category
//before creating a record for the new ad, it attempts to find the name of the advertiser using the advertiser id
//but that might be null, so it has placeholder text in that case. "Ad by an advertiser"
ads.post('/', (req,res,next)=>{
  Advertiser.findById(req.body.advertiserId)
            .then(anAdvertiser => {
                Ad.create(Object.assign({title: 'Ad by ' + (anAdvertiser.advertiser_name || 'an advertiser')}, req.body))
            })
            // .then(result => console.log.bind(console))
            .then(()=>res.sendStatus(200))
            .catch((err)=>{
                console.log(err);
                res.sendStats(204)
            })
})