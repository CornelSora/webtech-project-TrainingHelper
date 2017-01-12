'use strict'
var models = require("../models");
var express = require("express");
var router = express.Router();

var Exercise = models.names[0];
var Video = models.names[3];

Exercise.hasMany(Video, {
    foreignKey: 'exerciseId'
});

Video.belongsTo(Exercise, {
    foreignKey: 'exerciseId'
})

router.post('/Videos', (req, res) => {
    console.log(req.body);
    Video.create(req.body).then((Video) => {
        Video.findById(Video.id).then((Video) => {
            res.status(201).send(Video);
        });
    });
});

router.post('/Exercises/:id/Videos', (req, res) => {
    Exercise
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((exercise) => {
            let video = req.body
            video.exerciseId = exercise.id
            return Video.create(video)
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

router.get('/Videos', (req, res) => {
    Video.findAll().then((Video) => {
        res.status(200).send(Video);
    });
});

router.get('/Videos/:id', (req, res) => {
    Video.findById(req.params.id).then((Video) => {
        if (Video) {
            res.status(200).send(Video);
        }
        else {
            res.status(404).send("It doesn't exist");
        }
    });
});

router.get('/Exercises/:id/Videos', (req, res) => {
    Video
        .findAll({
            where: {
                exerciseId: req.params.id
            },
            include: [Exercise]
        })
        .then((Exercises) => {
            res.status(201).send(Exercises);
        })
});


router.put('/Videos/:id', (req, res) => {
    Video.findById(req.params.id)
        .then((Video) => {
            if (Video) {
                Video.updateAttributes(req.body)
                    .then(() => {
                        res.status(200).send("updated!");
                    })
                    .catch((error) => {
                        console.warn(error);
                        res.status(500).send('server error');
                    });
            }
            else {
                res.status(404).send("id is incorrect");
            }
        });
});

router.put('/Exercises/:exId/Videos/:vidId', (req, res) => {
    Video
        .find({
            where: {
                exerciseId: req.params.exId
            }
        })
        .then((video) => {
            video.name = req.body.name
            console.log(req.body.name);
            video.url = req.body.url
            return video.save()
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

});

router.delete('/Videos/:id', (req, res) => {
    Video.findById(req.params.id)
        .then((Video) => {
            if (Video) {
                Video.destroy()
                    .then(() => {
                        res.status(200).send("The video was deleted");
                    })
                    .catch((error) => {
                        console.warn(error);
                        res.status(500).send("server error");
                    });
            }
            else {
                res.status(404).send("The user doesn't exist");
            }
        });
});


module.exports = router;
