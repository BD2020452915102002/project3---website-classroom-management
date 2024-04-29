const  User = require("../models/User")
const status = require("../resStatus")

const userControllers ={
    getALlUser: async(req,res)=>{
        try {
            const user = await User.find()
            res.status(status.OK).json(user)
        }catch (e) {
            res.status(status.NOT_FOUND).json(e)
        }
    },
    deleteUser: async(req,res)=>{
        try {
            const user =await User.findByIdAndDelete(req.params.id);
            res.status(status.OK).json({
                message:"User deleted successfully",
                user:user})
        }catch (e) {
            res.status(status.INTERNAL_SERVER_ERROR).json(e)
        }
    }


}
module.exports = userControllers
