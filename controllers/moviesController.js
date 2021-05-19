let DB = require('../database/models');
let Movies = DB.movies;

const moviesController = {
    index: (req,res) => {
        Movies.findAll()
            .then(result => {
                return res.render('movies', { movies: result });
            })
    },
    detail: (req,res) => {
        findMovie(req,res)
            .then(result => {
                return res.render('detail_movie', { movie: result });
            })
    },
    create: (req,res) => {
        return res.render('create_movie')
    },
    store: (req,res) => {
        let newMovie = {
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            rating:req.body.rating
        }
        
        Movies.create(newMovie)
            .then(() => {
                return res.redirect('/movies/')
            })
            .catch(err => console.log(err));
    },
    delete: (req,res) => {
        let ID = req.params.id;

        Movies.destroy({
            where: {
                id: ID
            }
        })
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(err => console.log(err));
    },
    edit: (req,res) => {
        findMovie(req,res)
            .then(result => {
                return res.render('edit_movie', { movie: result })
            })
            .catch(err => console.log(err));
    },
    update: (req,res) => {
        Movies.update({
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            rating: req.body.rating
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(err => console.log(err));
    }
};

// Función para buscar película por ID y evitar reutilizar código
function findMovie(req,res){
    let ID = req.params.id;
    return Movies.findByPk(ID);
}

module.exports = moviesController;