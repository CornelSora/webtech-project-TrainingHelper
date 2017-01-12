var models = require("../models");
var express = require("express");
var router = express.Router();

var sequelize = models.sequelize;

router.get('/create', (req, res) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            res.status(201).send("created!");
        })
        .catch((error) => {
            console.warn(error);
            res.status(500).send('error');
        })
});

module.exports = router;
