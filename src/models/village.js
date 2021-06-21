const mongoose = require("mongoose");

const village = mongoose.Schema(
  {
    locality: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
    },
    completed: {
      required: true,
      type: Boolean,
      enum: [true, false]
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
    },
    participants: [],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "villageCommissioner",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("village", village);
