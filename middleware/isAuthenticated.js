const jwt = require("jsonwebtoken")
require("dotenv").config()


const isAuthenticated = (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
       
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded)
        req.body.userId = decoded.userId
        req.body.user = decoded.name
        next()
    } catch(error){
        res.status(400).json({error})
    }
}

module.exports = isAuthenticated