const { Users } = require('../database/models');
const bcrypt = require('bcryptjs');

const authController = {
    index: (req,res) => {
        res.render('register')
    },
    indexLogin: (req,res) => {
        res.render('login')
    },
    login: (req,res) => {
        Users.findOne({
            where: {
                username: req.body.username
            }
        })
            .then((userFound) => {
                if (bcrypt.compareSync(req.body.password, userFound.password)){
                    req.session.user = userFound;
                    res.cookie('username', userFound.username, { maxAge: 10000 * 300 * 300 });
                    res.redirect('/');
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

        Users.create(newUser)
            .then(() => res.redirect('/auth/login'))
            .catch(err => console.log(err));
    },
    logout: (req,res) => {
        req.session.destroy();

        if(req.cookies.username){
            res.clearCookie('username');
        }

        return res.redirect('/');
    }
};

module.exports = authController;