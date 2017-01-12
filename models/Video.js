module.exports = function(sequelize, DataTypes) {
    var Video = sequelize.define('Videos', {
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        url: {
            type: DataTypes.INTEGER,
            field: 'url'
        }
    }, {
        timestamps: false,
    });
    return Video;
}
