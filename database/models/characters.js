module.exports = function(sequelize, dataTypes){
    let alias = "characters";

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
        age: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        history: {
            type: dataTypes.TEXT,
            allowNull: false
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
        tableName: "characters",
        timestamps: false
    } */

    let characters = sequelize.define(alias, cols);

    characters.associate = function (models) {
        characters.belongsToMany(models.movies, {
            as: "movies",
            through: "characters_movies",
            foreignKey: "idCharacter",
            otherKey: "idMovie",
            timestamps: false
        })
    }

    return characters;
}