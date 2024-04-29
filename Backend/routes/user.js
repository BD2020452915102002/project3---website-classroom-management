const userControllers = require("../controllers/userControllers");
const router = require("express").Router()

// get all user
router.get("/",userControllers.getALlUser)
//delete user
router.delete("/delete/:id",userControllers.deleteUser)


module.exports = router
