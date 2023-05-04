const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

exports.adminAuthorization = async (req, res, next) => {
    try {
        if( req.headers.authorization){
            const token = req.headers.authorization
            const splitToken = token.split(" ")[1]
            console.log(req.headers.authorization)
    
            // if (splitToken) {
    
                const decodedToken = jwt.verify( req.headers.authorization, process.env.JWT_SECRET, (err,decoded) => {
                    console.log('admin',decoded.admin,process.env.ADMIN )
                    if (err && decoded.admin !== process.env.ADMIN || decoded.admin === undefined) {
                        return res.json({ message: 'Unauthorized' })
                    }
                    next()
                })
    
            // } else {
            //     res.status(401).json({ message: "Unauthorized" })
            // }
    
        }else{
            res.status(401).json({ message: "Unauthorized" })
        }
       
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }

}