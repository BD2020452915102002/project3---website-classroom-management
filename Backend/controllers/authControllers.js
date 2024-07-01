const bcrypt = require("bcrypt")
const User = require("../models/Users")
const jwt = require("jsonwebtoken")
const resStatus = require("../resStatus");

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
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            // create user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                role: req.body.role
            })

            // save to  DB
            const user = await newUser.save()
            res.status(resStatus.OK).json(user)
        } catch (err) {
            res.status(resStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username})
            if(!user) {
                return res.status(resStatus.NOT_FOUND).json("Wrong password")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
               return  res.status(resStatus.NOT_FOUND).json("Wrong password")
            }
            if (validPassword && user) {
                const accessToken = authControllers.generateAccessToken(user)
                const refreshToken = authControllers.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie("refreshToken",refreshToken , {
                    httpOnly:true,
                    path:"/",
                    sameSite:"strict",
                    secure:false
                })
                const {password, ...other} = user._doc
                res.status(resStatus.OK).json({user: other, accessToken: accessToken})
            }
        } catch (err) {
            res.status(resStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    },

    requestRefreshToken: async (req,res)=>{
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(resStatus.UNAUTHORIZED).json("You're not authenticated")
        if (!refreshTokens.includes(refreshToken)){
            return res.status(resStatus.FORBIDDEN).json("Refresh token is not valid")
        }
        jwt.verify(refreshToken,process.env.JWT_ACCESS_KEY_REFRESH,(err,user)=>{
            if(err){
                console.log(err)
            }
           else {
                refreshTokens = refreshTokens.filter((token)=>token!== refreshToken)
                // Create new accessToken amd refreshToken
                const newAccessToken = authControllers.generateAccessToken(user)
                const newRefreshToken = authControllers.generateRefreshToken(user)
                refreshTokens.push(newRefreshToken)
                res.cookie("refreshToken",newRefreshToken , {
                    httpOnly:true,
                    path:"/",
                    sameSite:"strict",
                    secure:false
                })
                res.status(resStatus.OK).json({accessToken:newAccessToken})
            }
        })
    },
    logoutUser: async(req,res)=>{
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(resStatus.OK).json("Logged out!")
    }
}
module.exports = authControllers