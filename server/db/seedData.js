const casual = require('casual');
const constants = require('./constants');

const NUMBER_OF_ADS = 20;
const NUMBER_OF_ADVERTISERS = 5;
const NUMBER_OF_USERS = 200;
const NUMBER_OF_VIEWS = 500;

const URLs = [
  'HU80R7jGanE',
  'fPwpymO1bs',
  '2zfqw8nhUwA',
  'VPKXAToDr-M',
  'AQ2w9gV1yeM',
  '8F4LiqYzBZY',
  'XmQSRqxRIJw'
];

const userModel = casual.define('userModel', () => {
  return {
    name: casual.full_name,
    email: casual.email,
    age: casual.random_element(constants.age),
    gender: casual.random_element(constants.gender),
    petOwner: casual.boolean,
    // income: casual.random_element(income),
    password: casual.password
  }
})

const adModel = casual.define('adModel', () => {
  return {
    title: casual.catch_phrase,
    url: casual.random_element(URLs),
    category: casual.random_element(constants.categories),
    cost: parseFloat(Math.round(casual.double(.5, 20) * 100) / 100).toFixed(2),
    advertiserId: casual.integer(1, NUMBER_OF_ADVERTISERS)
  }
})

const viewModel = casual.define('viewModel', () => {
  return {
    // smilyScore: casual.integer(from = 0, to = 100)
    smilyScore: casual.double(from = 0, to = 100),
    userId: casual.integer(1, NUMBER_OF_USERS),
    adId: casual.integer(1, NUMBER_OF_ADS)
  }
})

const advertiserModel = casual.define('advertiserModel', () => {
  return {
    name: casual.title,
    email: casual.email,
    password: "password"
  }
})

const dataGenerator = (times, generator) => {
  let data = [];
  for (let i = 0; i < times; ++i) {
    data.push(generator());
  }

  return data;
}

exports.ads = dataGenerator(NUMBER_OF_ADS, casual._adModel);
exports.users = dataGenerator(NUMBER_OF_USERS, casual._userModel);
exports.views = dataGenerator(NUMBER_OF_VIEWS, casual._viewModel);
exports.advertisers = dataGenerator(NUMBER_OF_VIEWS, casual._advertiserModel);
