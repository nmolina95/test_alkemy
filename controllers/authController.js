const bcrypt = require('bcryptjs');
let DB = require('../database/models');

const authController = {
    index: (req,res) => {
        res.render('register')
    },
    indexLogin: (req,res) => {
        res.render('login')
    },
    login: (req,res) => {
        DB.users.findOne({
            where: {
                username: req.body.username
            }
        })
            .then((userFound) => {
                if (bcrypt.compareSync(req.body.password, userFound.password)){
                    req.session.user = userFound;
                    res.cookie('username', userFound.username, { maxAge: 10000 * 300 * 300 });
                    res.send('Éxito');
                }
            })
            .catch(err => {
                console.log(err);
                res.send('Error');
            })
    },
    register: (req,res) => {
        let newUser = req.body;

        newUser.username = req.body.username;
        newUser.password = bcrypt.hashSync(newUser.password, 15);

        DB.users.create(newUser)
            .then(() => res.redirect('/auth/login'));
    }
};

module.exports = authController;