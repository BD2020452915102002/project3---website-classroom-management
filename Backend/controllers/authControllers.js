const bcrypt = require("bcrypt")
const User = require("../models/Users")
const jwt = require("jsonwebtoken")
const resStatus = require("../resStatus");
const Users = require("../models/Users");

let refreshTokens = []
const authControllers = {
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "30s"}
        )
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
                id: user.id,
                role: user.role,
            },
            process.env.JWT_ACCESS_KEY_REFRESH,
            {expiresIn: "365d"})
    },
    loginUser: async (req, res) => {
        try {
            const user = await Users.getUserByUsername(req.body.username)
            if (!user) {
                return res.status(resStatus.NOT_FOUND).json("user doesn't exist")
            } else if (user.status === 'close') {
                return res.status(resStatus.NOT_FOUND).json("user is closed")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
                return res.status(resStatus.NOT_FOUND).json("Wrong password")
            } else if (validPassword && user) {
                const accessToken = authControllers.generateAccessToken(user)
                const refreshToken = authControllers.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false
                })
                const {password, ...other} = user
                res.status(resStatus.OK).json({user: other, accessToken: accessToken})
            }
        } catch (err) {
            res.status(resStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(resStatus.UNAUTHORIZED).json("You're not authenticated")
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(resStatus.FORBIDDEN).json("Refresh token is not valid")
        }
        jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY_REFRESH, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
                // Create new accessToken amd refreshToken
                const newAccessToken = authControllers.generateAccessToken(user)
                const newRefreshToken = authControllers.generateRefreshToken(user)
                refreshTokens.push(newRefreshToken)
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false
                })
                res.status(resStatus.OK).json({accessToken: newAccessToken})
            }
        })
    },
    logoutUser: async (req, res) => {
        try {
            res.clearCookie("refreshToken")
            refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
            res.status(resStatus.OK).json("Logged out!")
        } catch (err) {
            res.status(resStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    }
}
module.exports = authControllers