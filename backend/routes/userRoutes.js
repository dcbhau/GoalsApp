const express = require('express')
const router = express.Router();
const {registerUser,loginUser,getCurrentUser} = require("../controllers/userController")
const {protected} = require("../middleware/authMiddleware")
//register User
router.post("/",registerUser)

//login User
router.post("/login",loginUser)


//Get current User
router.get('/me',protected,getCurrentUser)



module.exports = router;

