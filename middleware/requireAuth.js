const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth= async (req, res, next) => {
    
    // Verify authentication
    const {authorization} = req.headers

    if (!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        //Passing user.name so can be used for Post
        req.user = await User.findOne({_id}).select('_id')
        req.user = await User.findOne({_id}).select('name')
        //req.user = await User.findOne({_id}).select('location')
    
        next()

    }catch(error){
        console.log(error)
        response.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth