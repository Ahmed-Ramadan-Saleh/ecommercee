const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// create new schema
const authUserSchema = new Schema(
  { 
    profileimage: String,
    username: String,
    email: String,
    password: String,
      isAdmin: {
      type: Boolean,
      required: true,
      default: true, // Defaults to true, we set to true for admins
    },
  },
  { timestamps: true },
);

// hash password
authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next;
});

// create new model
const AuthUser = mongoose.model("Admin", authUserSchema);
// export model
module.exports = AuthUser;
