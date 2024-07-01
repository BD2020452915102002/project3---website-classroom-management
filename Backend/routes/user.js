const userControllers = require("../controllers/userControllers");
const router = require("express").Router()
const middlewareController = require("../middleware/middlewareController")

// get all user
router.get("/",userControllers.getALlUser)
// get infor user
router.get("/:id",userControllers.getInforUser)
// create user
router.post("/createUser",userControllers.createUser)
// update user
router.put("/:id/updateUser",userControllers.updateUser)
//delete user
router.delete("/:id/delete",middlewareController.verifyTokenAndAdmin,userControllers.deleteUser)


module.exports = router
