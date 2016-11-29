const db = require('./db');
const models = require('./models');
const { ads, users, views, advertisers } = require('./seedData')

const seedAdvertisers = () => db.Promise.map(advertisers, advertiser => models.Advertiser.create(advertiser));
const seedAds = () => db.Promise.map(ads, ad => models.Ad.create(ad));
const seedUsers = () => db.Promise.map(users, user => models.User.create(user));
const seedViews = () => db.Promise.map(views, view => models.View.create(view));

db.sync({force:true})
  .then(seedAdvertisers)
  .then(seedAds)
  .then(seedUsers)
  .then(seedViews)
  .then(res => {
    console.log(`Seeded items`)
  })
  .catch(error => console.error(error))
  .finally(() => db.close())
