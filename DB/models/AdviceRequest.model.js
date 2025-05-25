const mongoose = require("mongoose");

const AdviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "open",
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    {
        timestamps: true
    });

const AdviceRequest = mongoose.model("AdviceRequest", AdviceSchema);

module.exports = AdviceRequest;