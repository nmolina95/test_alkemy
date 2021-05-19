let DB = require('../database/models');
let Characters = DB.characters;

const charactersController = {
    index: (req,res) => {
        Characters.findAll()
            .then(result => {
                return res.render('characters', {characters: result})
            })
    },
    detail: (req,res) => {
        findCharacter(req,res)
            .then(result => {
                return res.render('detail', {character: result})
            })
            .catch(err => console.log(err));
    },
    edit: (req,res) => {
        findCharacter(req,res)
            .then(result => {
                return res.render('edit_character', {character: result});
            })
            .catch(err => console.log(err))
    },
    update: (req,res) => {
        Characters.update({
            name: req.body.name,
            age: req.body.age,
            weight: req.body.weight,
            image: req.body.image,
            history: req.body.history
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

        Characters.create(newCharacter)
            .then(() => {
                return res.redirect('/characters')
            })
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
    }
};

function findCharacter(req,res){
    let ID = req.params.id;
    return Characters.findByPk(ID);
}

module.exports = charactersController;