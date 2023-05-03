const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

exports.userAuthorization = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization
            const splitToken = token.split(" ")[1]
            console.log(req.headers.authorization)

            if (splitToken) {

                const decodedToken = jwt.verify(splitToken, process.env.JWT_SECRET, (err, decoded) => {
                    if (err && decoded.user !== process.env.USER || decoded.user === undefined) {
                        return res.json({ message: err.message })
                    }
                    next()
                })

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