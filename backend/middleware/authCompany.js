const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    const token = req.header('auth-company');
    if(!token){
        return res.status(401).send('access rejected...')
    }

    try{
        const decodeToken = jwt.verify(token ,'KAISOOR')
        req.body.CoCode == decodeToken;
        next()
    }catch{
        res.status(400).send('wrong token...')
    }
}
