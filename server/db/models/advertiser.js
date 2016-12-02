const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');

const Advertiser = db.define('advertiser', {
    advertiser_name: {
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
    token: {
      type: Sequelize.STRING
    },
    totalCharged: {
      type: Sequelize.FLOAT
    },
    password_digest: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
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
        }
    }
});


function setEmailAndPassword(advertiser) {
    advertiser.email = advertiser.email && advertiser.email.toLowerCase()
    if (!advertiser.password) return Promise.resolve(advertiser)

    return new Promise((resolve, reject) =>
        bcrypt.hash(advertiser.get('password'), 10, (err, hash) => {
            if (err) reject(err)
            advertiser.set('password_digest', hash)
            resolve(advertiser)
        })
    )
}


module.exports =  Advertiser;
