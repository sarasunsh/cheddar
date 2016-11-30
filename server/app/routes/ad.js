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

ads.post('/', (req,res,next)=>{
    console.log(req.body)
    Advertiser.findById(req.body.advertiserId)
        .then(anAdvertiser => {
            Ad.create(Object.assign({title: 'Ad by ' + (anAdvertiser.advertiser_name || 'Ad by an advertiser')}, req.body))
        })
        .then(result => console.log.bind(console))

    res.sendStatus(200)
})