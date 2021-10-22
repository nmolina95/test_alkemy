const {Genres} = require('../database/models');

module.exports = genresController = {
    index: (req,res) => {
        Genres.findAll()
            .then(result => {
                return res.render('genres', {genres:result})
            })
            .catch(err => console.log(err));
    },
    detail: (req,res) => {
        findGenre(req, res)
            .then(result => {
                return res.render('detail_genre', {genre:result})
            })
            .catch(err => console.log(err));
    },
    create: (req,res) => {
        return res.render('create_genre');
    },
    store: (req,res) => {
        let newGenre = {
            name: req.body.name,
            image: req.body.image
        }

        Genres.create(newGenre)
            .then(() => {
                return res.redirect('/genres')
            })
            .catch(err => console.log(err));
    },
    edit: (req,res) => {
        findGenre(req, res)
            .then(result => {
                return res.render('edit_genre',{genre:result})
            })
            .catch(err => console.log(err));
    },
    update: (req,res) => {
        Genres.update({
            name: req.body.name,
            image: req.body.image
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/genres')
            })
            .catch(err => console.log(err));
    },
    delete: (req,res) => {
        Genres.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/genres')
            })
            .catch(err => console.log(err));
    }
}

function findGenre(req,res){
    let ID = req.params.id;
    return Genres.findByPk(ID);
}