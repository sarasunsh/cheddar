const tweet = require('express').Router();

module.exports = tweet;

var Twit = require('twit')
import {ConsumerSecret, AccessToken, AccessTokenSecret} from './secrets'
var T = new Twit({
  consumer_key: 'TV3YMBpYLAc0OkVnkribGBx8B',
  consumer_secret: ConsumerSecret,
  access_token: AccessToken,
  access_token_secret: AccessTokenSecret,
  timeout_ms: 45*1000
});

tweet.post('/', function (req, res, next) {
  T.post('media/upload', { media: req.body.smile }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    console.log('upload response', data)
    var mediaIdStr = data.media_id_string
    var altText = req.body.text
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    T.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: req.body.text }

        T.post('statuses/update', params, function (err, data, response) {
          console.log('tweet response',data)
          // return response;
        })
        // .then(response => res.json(response))
        .catch(err => console.log(err))
      }
    })
  })
});
