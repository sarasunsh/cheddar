'use strict';

const express = require('express');
const mime = require('mime');
const models = require('../../db/models');
const Mouse = models.Mouse;
const Arm = models.Arm;
const Promise = require('sequelize').Promise; // sequelize comes with Bluebird

const router = express.Router();

module.exports = router;

router.get('/', function (req, res, next) {
    Mouse.getAllAlive()
    .then(mice => res.json(mice))
    .catch(next);
});


router.get('/:mouseID', function (req, res, next) {
    Mouse.findOne({
        where: {id: req.params.mouseID},
        include: [ {model: Arm} ]
    })
    .then(mouse => res.json(mouse))
    .catch(next);
});

// Adding a new mouse
router.post('/', function (req, res, next) {
    // This logic determines which arm the mouse should be added to, based on its genotype and relative enrollment
    let stats = [];
    Arm.getByGenotype(req.body.genotype)
    .then(arms => {
        stats = arms.map(arm => [arm.id, arm.goal])
        return Promise.map(arms, function(arm){
            return arm.countMice()
        })
    })
    .then(count => {
        for (var i = 0; i < stats.length; i++) {
            if (count[i] < stats[i][1]){
                return stats[i][0]
            }
        }
        return false;
    })
    .then(result => {
        if (result){
            return Mouse.create(req.body)
            .then(newMouse => newMouse.setArm(result))
            .then(mouse => res.send(mouse))
        } else {
            res.send('EUTHANIZE')
        }
    })
    .catch(next);
});


// Updating an animal that has died
router.put('/:mouseID', function (req, res, next) {
    Mouse.findById(req.params.mouseID)
    .then(foundMouse => foundMouse.update({deathdate: new Date() }))
    .then(updatedMouse => res.send(updatedMouse))
    .catch(next);
});

