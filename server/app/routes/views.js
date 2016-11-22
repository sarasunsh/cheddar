const Express = require('express');
const views = Express.Router();
const User = require('../../db/models').User;
const View = require('../../db/models').View;
const Ad = require('../../db/models').Ad;

module.exports = views;

// Adding a new mouse
views.post('/:userID/:adID', function (req, res, next) {
    View.create({ smilyScore: req.body.smilyScore, userId: req.params.userID, adId: req.params.adID})
    .then(view => res.send(view))
    .catch(err => console.log(err))
});
