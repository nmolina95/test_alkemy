module.exports = function (sequelize, dataTypes) {
    let alias = "Genres";

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

    /*let config = {
        tableName: "Genres",
        timestamps: false
    }*/

    let genres = sequelize.define(alias, cols);

    genres.associate = function(models) {
        genres.hasMany(models.Movies, {
            as: "movies",
            foreignKey: "idGenre"
        })
    }

    return genres;
}