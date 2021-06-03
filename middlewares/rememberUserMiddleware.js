const { Users } = require('../database/models');

function rememberUserMiddleware(req,res,next){
    res.locals.user = false;

    if(req.session.user){
        res.locals.user = req.session.user;
        return next();
    }
    else if(req.cookies.username){
        Users.findOne({
            where:{
                username: req.cookies.username
            }
        })
            .then((user) => {
                if(user){
                    delete user.password;
                    req.session.user = user;
                    res.locals.user = user;
                }
                return next();
            })
    }
    else {
        return next();
    }
}

module.exports = rememberUserMiddleware;