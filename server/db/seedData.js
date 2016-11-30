const casual = require('casual');
const constants = require('./constants');

const ads_list = {
  "Nintendo":
  {
    url:'HU80R7jGanE',
    cat:'Entertainment'
  },
  "Winston":
  {
    url:'-fPwpymO1bs',
    cat:'Health & Fitness'
  },
  "Apple":{
    url:'2zfqw8nhUwA',
    cat:'Technology'
  },
  "Budweiser": {
    url:'VPKXAToDr-M',
    cat:'Food & Drink'
  },
  "Pets.com 1":{
    url: 'AQ2w9gV1yeM',
    cat: 'Pets'
  },
  "Pets.com 2":{
    url:'8F4LiqYzBZY',
    cat: 'Pets'
  },
  "Qualcomm":{
    url:'XmQSRqxRIJw',
    cat: 'Technology'
  }
};

const NUMBER_OF_ADS = Object.keys(ads_list).length;
const NUMBER_OF_ADVERTISERS = 3;
const NUMBER_OF_USERS = 200;
const NUMBER_OF_VIEWS = 500;



const userModel = casual.define('userModel', () => {
  return {
    name: casual.full_name,
    email: casual.email,
    age: casual.random_element(constants.age),
    gender: casual.random_element(constants.gender),
    petOwner: casual.random_element(constants.petOwner),
    income: casual.random_element(constants.income),
    maritalStatus: casual.random_element(constants.maritalStatus),
    education: casual.random_element(constants.education),
    password: casual.password
  }
})

const adModel = casual.define('adModel', (tmp) => {
  return {
    title: tmp,
    url: ads_list[tmp].url,
    category: ads_list[tmp].cat,
    cost: parseFloat(Math.round(casual.double(.5, 5) * 100) / 100).toFixed(2),
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

const adGenerator = (ads_list, generator) => {
  let data = [];
  for (i in ads_list) {
    data.push(generator(i));
  }

  return data;
}

exports.ads = adGenerator(ads_list, casual._adModel);
exports.users = dataGenerator(NUMBER_OF_USERS, casual._userModel);
exports.views = dataGenerator(NUMBER_OF_VIEWS, casual._viewModel);
exports.advertisers = dataGenerator(NUMBER_OF_ADVERTISERS, casual._advertiserModel);
