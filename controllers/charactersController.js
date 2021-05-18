let DB = require('../database/models');

const charactersController = {
    index: (req,res) => {
        DB.characters.findAll()
            .then(result => {
                res.render('characters', { characters: result})
            })
    },
    detail: (req,res) => {
        DB.characters.findByPk(req.params.id)
            .then(result => {
                return res.render('detail', { characters: result})
            })
            .catch(err => console.log(err));
    },
    edit: (req,res) => {
        return res.render('detail')
    },
    update: (req,res) => {

    },
    create: (req,res) => {
        return res.render('create')
    },
    store: (req,res) => {
        let newCharacter = {
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        image: req.body.image,
        history: req.body.history
        }

        DB.characters.create(newCharacter)
            .then(() => res.redirect('/characters'))
    },
    delete: (req,res) => {
        DB.characters.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => res.redirect('/characters'))
            .catch(err => console.log(err));
    }
};

module.exports = charactersController;