module.exports = function(sequelize, DataTypes) {
    var TrainingExercise = sequelize.define('TrainingExercise', {
        id: {
            type: DataTypes.INTEGER,
            field: 'idTE',
            primaryKey: true,
            autoIncrement: true
        },
        series: {
            type: DataTypes.INTEGER,
            field: 'series'
        }
    }, {
        timestamps: false,
    });
    return TrainingExercise;
}
