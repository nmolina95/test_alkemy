const { Movies, Genres } = require('../database/models');
const { Op } = require('sequelize');

const moviesController = {
    index: (req,res) => {
        Movies.findAll()
            .then(result => {
                return res.json({ movies: result });
                //return res.render('movies', { movies: result });
            })
            .catch(err => console.log(err));
    },
    detail: (req,res) => {
        findDetailMovie(req,res)
            .then(result => {
                return res.render('detail_movie', {movie:result});
            })
            .catch(err => console.log(err));
    },
    create: (req,res) => {
        findGenres()
            .then((result) => {
                return res.render('create_movie',{genres:result})
            })
            .catch(err => console.log(err));
    },
    store: (req,res) => {
        let newMovie = {
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            rating: req.body.rating,
            idGenre: req.body.genre
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
        Promise.all([findDetailMovie(req,res), findGenres()])
            .then(([movie, genres]) => {
                return res.render('edit_movie', {movie:movie, genres:genres})
            })
            .catch(err => console.log(err));
    },
    update: (req,res) => {
        Movies.update({
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            rating: req.body.rating,
            idGenre: req.body.genre
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(err => console.log(err));
    },
    find: (req,res) => {
        findGenres()
            .then(result=>{
                return res.render('find_movie', {genres:result});
            })
            .catch(err => console.log(err));
    },
    search: (req,res) => {
        let data = {
            title: req.body.query,
            idGenre: req.body.genre,
            order: req.body.order
        }
        //let myUrl = '/movies/find?title=' + data.title + '&idGenre=' + data.idGenre + '&order=' + data.order;


        Promise.all([searchMovies(req,res), findGenres(),data])
            .then((movies) => {
                return res.render('results_movies', {movies:movies})
            })
            .catch(err => console.log(err));
    }
};

// Función para buscar película por ID y evitar reutilizar código
function findDetailMovie(req,res){
    let ID = req.params.id;
    return Movies.findByPk(ID, {
        include: [{association:'genre'}]
    });
}

function findGenres(){
    return Genres.findAll();
}

function searchMovies(req,res){
    return Movies.findAndCountAll({
        where: {
            title: {
                [Op.like]: '%' + req.body.query + '%'
            },
            idGenre: {
                [Op.like]: '%' + req.body.genre + '%'
            }
        },
        include: [
            { association: 'genre' }
        ],
        order: [
            ['createdAt', req.body.order]
        ]
    });
}

module.exports = moviesController;