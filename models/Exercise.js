module.exports = function(sequelize, Sequelize) {
    var Exercise = sequelize.define('Exercises', {
        name: {
            type: Sequelize.STRING,
            field: 'name'
        }
    }, {
        timestamps: false
    });
    
    return Exercise;
}
