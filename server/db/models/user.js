const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      validate: {
          isEmail: true,
          notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER
    },
    gender: {
      type: Sequelize.ENUM('male', 'female')
    },
    income: {
      type: Sequelize.ENUM(
        'Less than $25,000',
        '$25,000 to $34,999',
        '$35,000 to $49,999',
        '$50,000 to $74,999',
        '$75,000 to $99,999',
        '$100,000 to $149,999',
        '$150,000 or more')
    }
}, {
    classMethods: {
        getByGenotype: function(genotype){
        return {};
        }
    },
    instanceMethods: {
        countMice: function(){
            return {};
        }
    }
});

module.exports =  User;
