var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = new express();
var models = require("./models");

app.use(bodyParser.json());
var nodeadmin = require("nodeadmin");
app.use(nodeadmin(app));

app.use(express.static(__dirname + "/app"));

//definim entitate

var trainingRest = require(__dirname + "/routes/trainings.js");
app.use(trainingRest);

var exercisesRest = require(__dirname + "/routes/exercises.js");
app.use(exercisesRest);

var trExRest = require(__dirname + "/routes/trainingExercises.js");
app.use(trExRest);

var videoRest = require(__dirname + "/routes/video.js");
app.use(videoRest);

var createRest = require(__dirname + "/routes/create.js");
app.use(createRest);

app.listen(8080);