'use strict';

const express = require('express');
// const mime = require('mime');
const router = express.Router();
const Promise = require('sequelize').Promise;

const models = require('../../db/models');
const Arm = models.Arm;
const Experiment = models.Experiment;

module.exports = router;

router.get('/', function (req, res, next) {
    Arm.findAll()
    .then(arms => res.json(arms))
    .catch(next);
});

router.post('/', function (req, res, next) {
    Experiment.findById(1)
    .then( (foundExpt) => {
        return foundExpt.createArm(req.body)
        .then(newArm => {
            res.status(201).send(newArm)
        });
    })
    .catch(next);
});

router.delete('/:id', function (req, res, next) {
    Arm.destroy({
        where: {
            id: +req.params.id
        }
    })
    .then( deletedArm => res.json(deletedArm))
    .catch(next);
});
