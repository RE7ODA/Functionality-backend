const mongoose = require("mongoose");
const CreditSchema = new mongoose.Schema(
  {
    cardName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      minlength: 16,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
      minlength: 5,
    },
    CVV: {
      type: Number,
      minlength: 3,
      required: true,
    },
  },
    {
        timestamps: true,
    }
);

const supscriptions = mongoose.model("Supscription", CreditSchema);

module.exports = supscriptions;
