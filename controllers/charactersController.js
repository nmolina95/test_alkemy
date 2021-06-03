const { Characters, Movies, characters_movies } = require('../database/models');
const movies = require('../database/models/movies');

const charactersController = {
    index: (req,res) => {
        Characters.findAll()
            .then(result => {
                return res.render('characters', {characters: result})
            })
            .catch(err => console.log(err));
    },
    detail: (req,res) => {
        findCharacter(req,res)
            .then(result => {
                return res.render('detail', {character: result})
            })
            .catch(err => console.log(err));
    },
    edit: (req,res) => {
        Promise.all([findCharacter(req, res), findMovies(), findAsoc()])
            .then(result => {
                return res.render('edit_character', {character: result});
            })
            .catch(err => console.log(err))
    },
    update: (req,res) => {
        let updateCharacter = ({
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            image: req.body.image,
            history: req.body.history,
            movies: req.body.movies
        }, {
            where: {
                id: req.params.id
        }
        })

        /* Characters.update({
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            image: req.body.image,
            history: req.body.history
        }, {
            where: {
                id: req.params.id
            }
        }) */

        
       /*  Promise.all([Characters.update({
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            image: req.body.image,
            history: req.body.history,
            movies: req.body.movies
        }, {
            where: {
                id: req.params.id
            }
        }), newAsoc(req,res)]) */
        Characters.update({
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            image: req.body.image,
            history: req.body.history,
            movies: req.body.movies
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/characters')
            })
            .catch(err => console.log(err));
    },
    create: (req,res) => {
        findMovies()
            .then((result) => {
                return res.render('create_character', {movies:result})
            })
            .catch(err => console.log(err));
    },
    store: (req,res) => {
        let newCharacter = {
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        image: req.body.image,
        history: req.body.history,
        movies: req.body.movies
        }
        
        //Promise.all([Characters.create(newCharacter), newAsoc()])
        Characters.create(newCharacter)
            .then(() => {
                return res.redirect('/characters')
            })
            .catch(err => console.log(err));
    },
    delete: (req,res) => {
        Characters.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/characters')
            })
            .catch(err => console.log(err));
    },
    find: (req,res) => {

    },
    search: (req,res) => {

    }
};

function findCharacter(req,res){
    const ID = req.params.id;
    return Characters.findByPk(ID);
}

function findMovies() {
    return Movies.findAll();
}

function newAsoc(req,res) {
    for (let i = 0; i < req.body.movies.length; i++) {
        characters_movies.create({
            idCharacter: req.params.id,
            idMovie: req.body.movies[i]
        })
    }
}

function findAsoc(){
    return characters_movies.findAll();
}

module.exports = charactersController;