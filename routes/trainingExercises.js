var models = require("../models");
var express = require("express");
var router = express.Router();

var Exercise = models.names[0];
var Training = models.names[1];
var TrainingExercise = models.names[2];

Training.hasMany(TrainingExercise, {
    foreignKey: 'trainingId'
});

TrainingExercise.belongsTo(Training, {
    foreignKey: 'trainingId'
})

Exercise.hasMany(TrainingExercise, {
    foreignKey: 'exerciseId'
});

TrainingExercise.belongsTo(Exercise, {
    foreignKey: 'exerciseId'
});

router.post('/TrainingExercises', (req, res) => {
    console.log(req.body);
    Exercise.create(req.body).then((Exercise) => {
        Exercise.findById(Exercise.id).then((Exercise) => {
            res.status(201).send(Exercise);
        });
    });
});

router.get('/TrainingExercises', (req, res) => {
    TrainingExercise.findAll().then((TrainingExercise) => {
        res.status(200).send(TrainingExercise);
    });
});

router.get('/TrainingExercises/:id', (req, res) => {
    Exercise.findById(req.params.id).then((Exercise) => {
        if (Exercise) {
            res.status(200).send(Exercise);
        }
        else {
            res.status(404).send("It doesn't exist");
        }
    });
});

router.get('/TrainingExercises/:id/Exercises', (req, res) => {
    TrainingExercise
        .findAll({
            where: {
                trainingId: req.params.id
            },
            include: [Exercise, Training]
        })
        .then((Exercises) => {
            res.status(201).send(Exercises);
        })
});

router.put('/TrainingExercises/:id', (req, res) => {
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

router.delete('/TrainingExercises/:id', (req, res) => {
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
