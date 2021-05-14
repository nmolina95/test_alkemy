module.exports = function (sequelize, dataTypes) {
    let alias = "genres";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
        },
        idMovie: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        deletedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }

    /* let config = {
        tableName: "genres",
        timestamps: false
    } */

    let genres = sequelize.define(alias, cols);

    genres.associate = function(models) {
        genres.hasMany(models.movies, {
            as: "movies",
            foreignKey: "idGenre"
        })
    }

    return genres;
}