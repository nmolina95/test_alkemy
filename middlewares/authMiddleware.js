const authController = require("../controllers/authController");

function authMiddleware(req,res,next){
    if(req.session.user !== undefined){
        next();
    }
    else{
        return res.render('login');
    }
};

module.exports = authMiddleware;