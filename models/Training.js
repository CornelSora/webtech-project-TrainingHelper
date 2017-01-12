module.exports = function(sequelize, DataTypes) {
    var Training = sequelize.define('Training', {
        trainingName: {
            type: DataTypes.STRING,
            field: 'trainingName'
        },
        cycles: {
            type: DataTypes.INTEGER,
            field: 'cycles'
        },
        time: {
            type: DataTypes.INTEGER,
            field: 'time'
        },
        difficulty: {
            type: DataTypes.STRING,
            field: 'dificulty'
        },
        url: {
            type: DataTypes.STRING,
            field: 'url'
        }
    }, {
        timestamps: false,
    });
    return Training;
}
