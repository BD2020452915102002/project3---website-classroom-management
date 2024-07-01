const Users = require("../models/Users")
const status = require("../resStatus")
const bcrypt = require("bcrypt");
const {v4: uuidv4} = require("uuid");
const generateUniqueCode = require("../utils/generateUniqueCode");
const {mergeFields} = require("../utils/mergeFields");

const userControllers = {
    getALlUser: async (req, res) => {
        try {
            const listUser = await Users.getAllUser()
            res.status(status.OK).json(listUser)
        } catch (e) {
            res.status(status.NOT_FOUND).json(e)
        }
    },
    getInforUser: async (req, res) => {
        try {
            const user = await Users.getUserByID(req.params.id)
            res.status(status.OK).json(user)
        } catch (e) {
            res.status(status.NOT_FOUND).json(e)
        }
    },
    createUser: async (req, res) => {
        try {
            const usercode = await generateUniqueCode.User()
            const data = {
                role_name: req.body.role_name,
                user_code: usercode,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                name: req.body.name,
                birth: req.body.birth,
                gender: req.body.gender,
                status: 'active'
            };
            const existEmail = await Users.getUserByEmail(data.email);
            const existUsername = await Users.getUserByUsername(data.username);
            if (!data.role_name || !data.username || !data.password || !data.email || !data.name) {
                res.status(status.BAD_REQUEST).json({message: 'Missing required data fields.'})
            } else if (existUsername || existEmail) {
                res.status(status.CONFLICT).json({message: 'User already exists.'})
            } else {
                const saltRounds = 10; // Number of salt round for bcrypt
                data.password = await bcrypt.hash(data.password, saltRounds)
                // Create new User
                const idUser = uuidv4({format: "hex"}).substring(0, 32);
                const newUser = await Users.createUser({
                        user: data,
                        idUser: idUser
                    }
                );
                res.status(status.CREATED).json({newUser, role_name: data.role_name})
            }
        } catch (e) {
            console.log(e)
            res.status(status.NOT_FOUND).json(e)
        }
    },
    updateUser: async (req, res) => {
        try {
            const saltRounds = 10; // Number of salt round for bcrypt
            const hashedPassword = await bcrypt.hash(
                req.body.password,
                saltRounds
            )
            const new_data = {
                role_name: req.body.role_name,
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                name: req.body.name,
                birth: req.body.birth,
                gender: req.body.gender,
                status: req.body.status
            };
            const old_data = await Users.getUserByID(req.params.id)
            const final_data = await mergeFields(new_data, old_data)
            const update = await Users.updateUser({
                user: final_data,
                id: req.params.id
            })
            if (update.affectedRows == 1) {
                delete final_data.password
                res.status(status.OK).json({data: final_data, id: req.params.id})
            } else {res.status(status.BAD_REQUEST).json({message: "Update failed"})}
        } catch (e) {
            console.log(e)
            res.status(status.NOT_FOUND).json(e)
        }
    },
    deleteUser: async (req, res) => {
        // try {
        //     const user = await User.findByIdAndDelete(req.params.id);
        //     res.status(status.OK).json({
        //         message: "User deleted successfully",
        //         user: user
        //     })
        // } catch (e) {
        //     res.status(status.INTERNAL_SERVER_ERROR).json(e)
        // }
    }


}
module.exports = userControllers
