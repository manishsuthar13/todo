const jwt = require("jsonwebtoken")
 module.exports = function(req, res, next){
    const token = req.header("Authorization")

    if(!token) return res.status(401).json("No token")

    // if (!token) return res.status(401).json("No token")

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        next()
    }catch{
        res.status(401).json("Invalid token")
    }
 }