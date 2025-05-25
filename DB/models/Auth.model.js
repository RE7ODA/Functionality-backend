const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authSchema = new mongoose.Schema(
  {
    usersName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["client", "lawyer"],
      default: "client",
      required: true,
    },
  }
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const users = mongoose.model("User", authSchema);

module.exports = users;
