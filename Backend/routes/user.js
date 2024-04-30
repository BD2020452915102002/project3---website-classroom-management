const userControllers = require("../controllers/userControllers");
const router = require("express").Router()
const middlewareController = require("../middleware/middlewareController")

// get all user
router.get("/",middlewareController.verifyToken,userControllers.getALlUser)
//delete user
router.delete("/delete/:id",middlewareController.verifyTokenAndAdmin,userControllers.deleteUser)


module.exports = router
