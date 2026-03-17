const AuthUser = require("../../models/AdminLogin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const post_LoginAdmin = async (req, res) => {
  try {
    // email exist
    const loginUser = await AuthUser.findOne({ email: req.body.email });
    if (!loginUser) {
      return res.json({ message: "Email not found" });
    }
    // compare password
    const match = await bcrypt.compare(req.body.password, loginUser.password);
    if (!match) {
      return res.json({ message: "password not found" });
    }

    var token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET);
    res
      .cookie("JwtAdmin", token, {
        httpOnly: true,
        maxAge: 86400000,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "successfully login" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  post_LoginAdmin

};
