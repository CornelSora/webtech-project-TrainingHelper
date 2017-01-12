var models = require("../models");
var express = require("express");
var router = express.Router();

var Exercise = models.names[0];
var TrainingExercise = models.names[2];

router.post('/Exercises', (req, res) => {
    console.log(req.body);
    Exercise.create(req.body).then((Exercise) => {
        Exercise.findById(Exercise.id).then((Exercise) => {
            res.status(201).send(Exercise);
        });
    });
});

router.get('/Exercises', (req, res) => {
    Exercise.findAll().then((Exercise) => {
        res.status(200).send(Exercise);
    });
});

router.get('/Exercises/:id', (req, res) => {
    Exercise.findById(req.params.id).then((Exercise) => {
        if (Exercise) {
            res.status(200).send(Exercise);
        }
        else {
            res.status(404).send("It doesn't exist");
        }
    });
});

router.get('/Exercises/:id', (req, res) => {
    Exercise.findById(req.params.id).then((Exercise) => {
        if (Exercise) {
            res.status(200).send(Exercise);
        }
        else {
            res.status(404).send("It doesn't exist");
        }
    });
});

router.get('/Exercises/:id/TrainingExercises', (req, res) => {
    Exercise
        .find({
            where: {
                id: req.params.id
            },
            include: [TrainingExercise]
        })
        .then((exercise) => {
            return exercise;
        })
        .then((messages) => {
            res.status(200).send(messages)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})


router.put('/Exercises/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then((Exercise) => {
            if (Exercise) {
                Exercise.updateAttributes(req.body)
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

router.delete('/Exercises/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then((Exercise) => {
            if (Exercise) {
                Exercise.destroy()
                    .then(() => {
                        res.status(200).send("The user was deleted");
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
