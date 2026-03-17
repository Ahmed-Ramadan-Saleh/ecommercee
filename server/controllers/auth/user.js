const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Auth user & get token
// @route   POST /api/auth/login
const authUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const checkPass = await bcrypt.compare(req.body.password, user.password);
  if (!checkPass) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .cookie("JwtUser", token, {
      httpOnly: true,
      maxAge: 86400000,
      secure: true,
      sameSite: "none",
    })
    .json({ message: "successfully login" });
};

// @desc    Register a new admin user (Optional for setup)
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: true, // Automatically make them admin for this project
  });

  if (user) {
    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .cookie("JwtUser", token, {
        httpOnly: true,
        maxAge: 86400000,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "successfully Sign-Up" });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

module.exports = {
  authUser,
  registerUser,
};
