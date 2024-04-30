const router = require("express").Router()
const authControllers = require("../controllers/authControllers")
const middlewareController = require("../middleware/middlewareController")


router.post("/register", authControllers.registerUser)
router.post("/login", authControllers.loginUser)

//refresh
router.post("/refresh",authControllers.requestRefreshToken)
router.post("/logout",middlewareController.verifyToken,authControllers.logoutUser)


module.exports = router