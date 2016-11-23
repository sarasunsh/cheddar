const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');

const Views = require('./view');
const Ads = require('./ad');

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
    },
    password_digest: Sequelize.STRING
    password: Sequelize.VIRTUAL
}, {
    indexes: [{fields: ['email'], unique: true}],
    hooks: {
        beforeCreate: setEmailAndPassword,
        beforeUpdate: setEmailAndPassword
    },
    instanceMethods: {
        authenticate(plaintext) {
            return new Promise((resolve, reject) =>
                bcrypt.compare(plaintext, this.password_digest,
                    (err, result) => err ? reject(err) : resolve(result)
                )
            )
        },
        earned_pay() {
            return Views.findAll({
                where: {userId: this.id},
                include: [
                  { model: Ads, required: true}
                ]
              })
              .then( ret => {
                let total = 0;
                ret.forEach(e => {
                  total += (e.smilyScore / 100) * e.ad.cost;
                })
                return "$" + parseFloat(Math.round(total * 100) / 100).toFixed(2);
              })
          }
    }
});


function setEmailAndPassword(user) {
    user.email = user.email && user.email.toLowerCase()
    if (!user.password) return Promise.resolve(user)

    return new Promise((resolve, reject) =>
        bcrypt.hash(user.get('password'), 10, (err, hash) => {
            if (err) reject(err)
            user.set('password_digest', hash)
            resolve(user)
        })
    )
}


module.exports =  User;
