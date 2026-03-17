const express = require("express");
const router = express.Router();
const { authUser, registerUser } = require("../controllers/auth/user");
const { post_LoginAdmin } = require("../controllers/auth/admin");
/** 
 @route   POST /api/auth/login
 @desc    Authenticate user & get token
 @access  Public
 */
router.post("/login/user", authUser);
/**
 @route   POST /api/auth/register
 @desc    Register new user (Admin)
 @access  Public (You might want to protect this in production)
*/

router.post("/register", registerUser);

router.post("/login/admin", post_LoginAdmin);




module.exports = router;
