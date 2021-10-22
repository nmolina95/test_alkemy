const { Users } = require('../database/models');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail')
const API_KEY = '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'
sgMail.setApiKey(API_KEY);


module.exports =  authController = {
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
            .then(() => {
                const welcomeEmail = {
                    to: newUser.username,
                    from: 'itisryzenvr@gmail.com',
                    subject: 'Welcome to Ryzen VR',
                    text: 'You are now able to go shopping on our store. Your username is ' + newUser.username + ' :)'
                }

                sgMail.send(welcomeEmail);
                return res.redirect('/auth/login')}
            )
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