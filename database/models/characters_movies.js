module.exports = function(sequelize, dataTypes){
    let alias = "characters_movies";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idMovie: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Movies',
                key: 'id'
            },
            unsigned: true
        },
        idCharacter: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Characters',
                key: 'id'
            },
            unsigned: true
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

    let characters_movies = sequelize.define(alias, cols);

    return characters_movies;
}