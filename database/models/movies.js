module.exports = function (sequelize, dataTypes) {
    let alias = "movies";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        rating: {
            type: dataTypes.NUMBER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        idCharacter: {
            type: dataTypes.INTEGER,
            unsigned: true
        },
        idGenre: {
            type: dataTypes.INTEGER,
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

/*     let config = {
        tableName: "movies",
        timestamps: false
    }
 */
    let movies = sequelize.define(alias, cols);

    movies.associate = function (models) {
        movies.belongsTo(models.genres, {
            as: "genres",
            foreignKey: "idGenre"
        });

        movies.belongsToMany(models.characters, {
            as: "characters",
            through: "characters_movies",
            foreignKey: "idMovie",
            otherKey: "idCharacter",
            timestamps: false
        })
    }

    return movies;
}