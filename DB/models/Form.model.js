const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema(
  {
    Name: {
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
    MobileNumber: {
      type: String,
      required: true,
      minlength: 6,
    },
    Specialties: {
      type: String,
      required: true,
    },
  },
    {
        timestamps: true,
    }
);

const FormData = mongoose.model("Form", FormSchema);

module.exports = FormData;
