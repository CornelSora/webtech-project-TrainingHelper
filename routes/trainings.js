var models = require("../models");
var express = require("express");
var router = express.Router();

var Training = models.names[1];

router.post('/Trainings', (req, res) => {
    Training.create(req.body).then((training) => {
        Training.findById(training.id).then((training) => {
            res.status(201).send(training);
        });
    });
});

router.get('/Trainings', (req, res) => {
    Training.findAll().then((trainings) => {
        res.status(200).send(trainings);
    });
});

router.get('/Trainings/:id', (req, res) => {
    Training.findById(req.params.id).then((training) => {
        if (training) {
            res.status(200).send(training);
        }
        else {
            res.status(404).send("It doesn't exist");
        }
    });
});

router.put('/Training/:id', (req, res) => {
    Training.findById(req.params.id)
        .then((training) => {
            if (training) {
                training.updateAttributes(req.body)
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

router.delete('/Training/:id', (req, res) => {
    Training.findById(req.params.id)
        .then((training) => {
            if (training) {
                training.destroy()
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
