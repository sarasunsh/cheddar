const Express = require('express');
const payment = Express.Router();
const User = require('../../db/models').User;
const View = require('../../db/models').View;
const Advertiser = require('../../db/models').Advertiser;

// SECRET TEST KEY; eh. so its public. just the test key.
var stripe = require("stripe")("sk_test_Oi9Adz7c3fQ4Fs20TJxbUN7n");

module.exports = payment;

payment.put('/token', (req, res, next) => {

  // Use req.user.id in the search area
  // console.log("***** /ads req.user.id", req.user.id);
  var advertiserHold;

  req.user && Advertiser.findOne({
    where: {
      id: req.user.id
    }
  })
  .then( advertiser => {
    // console.log("******* req.body.token", req.body.token)
    return advertiser.update({token: req.body.token});
  })
  .then( advertiser =>   {
    // console.log("***** msg after updating", msg);
    advertiserHold = advertiser;
    var amountToCharge = +req.body.amount * 100;
    return stripe.charges.create({
      amount: amountToCharge,
      currency: "usd",
      source: advertiser.token,
      description: "Example charge"
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
      console.log("Note: Testing environment demo; Card has been declined and no charges made");
      // res.send(err, err.type, "Card declined");      // The card has been declined
      }
      var newTotalCharged = +advertiserHold.totalCharged + +req.body.amount;
      advertiser.update({totalCharged: newTotalCharged});
    });
  })
  .then( ignoringRightNow => {

    var newTotalCharged = +advertiserHold.totalCharged + +req.body.amount;
    return advertiserHold.update({totalCharged: newTotalCharged});

  })
  .then( info => res.send(info))
  .catch(err => {

    console.log(err)

  });

});
