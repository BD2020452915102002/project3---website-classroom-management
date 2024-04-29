const bcrypt = require("bcrypt")
const User = require("../models/User")
const resStatus = require("../resStatus");

const authControllers = {
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            // create user
            const newUser = await new User({
                username:req.body.username,
                email: req.body.email,
                password: hashed
            })

            // save to  DB
            const user = await newUser.save()
            res.status(resStatus.OK).json(user)
        } catch (err) {
            res.status(resStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    },
    loginUser: async (req, res) =>{
        try{
            const user = await User.findOne({ username: req.body.username })
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                res.status(resStatus.NOT_FOUND).json("Wrong password")
            }
            if (validPassword && user) {
                res.status(resStatus.OK).json(user)
            }
        }catch (err){
            res.status(resStatus.INTERNAL_SERVER_ERROR).json(err)
        }
    }
}
module.exports = authControllers