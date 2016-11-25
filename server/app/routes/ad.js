const Express = require('express');
const ads = Express.Router();
const User = require('../../db/models').User;
const View = require('../../db/models').View;
const Ad = require('../../db/models').Ad;

module.exports = ads;

// Adding a new view
ads.get('/:adID', function (req, res, next) {
    View.findAll({
        where: { adId: req.params.adID},
        include: [User, Ad]
    })
    .then(viewData => res.send(viewData))
    .catch(err => console.log(err))
});
