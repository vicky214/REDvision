const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/index')

module.exports = (req,res,next)=> {
    const {authorization} = req.headers
    if(!authorization){
        return res.json({
            message:"you must be logged in",
            status:"error",
            code:401
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.json({
                message:"you must be logged in",
                status:"error",
                code:401
            })
        }
        const {_id} = payload
        req.body.userId = _id
        next()
    })
}