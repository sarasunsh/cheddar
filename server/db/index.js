'use strict';
const db = require('./db');
const chalk = require('chalk');

// Require our models. Running each module registers the model into sequelize
// so any other part of the application can simply call sequelize.model('User')
// to get access to the User model.
var Models = require('./models');
const adSeed = () =>Models.Ad.create({
    title: "Rogue 1 Trailer",
    url: "WcwsDJhrREU"
});
// Syncing all the models at once. This promise is used by main.js.
var syncedDbPromise = db.sync(
  {force:true}
)
.then(adSeed);


syncedDbPromise.then(function () {
  console.log(chalk.green('Sequelize models synced to PostgreSQL'));
});

module.exports = syncedDbPromise;
