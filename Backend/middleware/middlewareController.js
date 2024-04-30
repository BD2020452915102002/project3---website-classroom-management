const jwt = require("jsonwebtoken")
const status = require("../resStatus")

const middlewareController = {

    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(status.FORBIDDEN).json({message: "Token is not valid"})
                } else {
                    req.user = user
                    next()
                }
            })
        } else {
            res.status(status.UNAUTHORIZED).json("You're not authenticated")
        }
    },

    verifyTokenAndAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.role === "admin") {
                next()
            } else {
                res.status(status.FORBIDDEN).json({
                    message: "You're not allowed to delete other"
                })
            }
        })
    }
}
module.exports = middlewareController