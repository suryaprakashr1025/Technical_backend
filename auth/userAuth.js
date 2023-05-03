const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

exports.commonAuthorization = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization
            const splitToken = token.split(" ")[1]
            console.log(req.headers.authorization)

            if (splitToken) {

                const decodedToken = jwt.verify(splitToken, process.env.JWT_SECRET)
                //console.log(decodedToken.admin , decodedToken.user)
                if (!decodedToken) {
                    return res.json({ message: 'Unauthorized' })
                }
                next()

            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } else {
            res.status(401).json({ message: "Unauthorized" })
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }

}