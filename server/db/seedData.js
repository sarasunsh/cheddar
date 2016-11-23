const casual = require('casual');

const NUMBER_OF_ADS = 10;
const NUMBER_OF_USERS = 50;
const NUMBER_OF_VIEWS = 200;

const gender = ['male', 'female'];

const URLs = [
    'Dfj3Ot9mtwA',
    'glii-kazad8',
    '9GbS40MT6ME',
    'kCrIy93hU60',
    'REM3sD7FatY',
    '2_9FKYmR75g'
];

const income = [
    'Less than $25,000',
    '$25,000 to $34,999',
    '$35,000 to $49,999',
    '$50,000 to $74,999',
    '$75,000 to $99,999',
    '$100,000 to $149,999',
    '$150,000 or more'
];

const userModel = casual.define('userModel', () => {
  return {
    name: casual.full_name,
    email: casual.email,
    age: casual.integer(18, 75),
    gender: casual.random_element(gender),
    income: casual.random_element(income),
    password: casual.password
  }
})

const adModel = casual.define('adModel', () => {
  return {
    title: casual.catch_phrase,
    url: casual.random_element(URLs)
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

