const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: [true, "The title must be unique"],
    },
    sharedBy: {
      type: String,
      //   required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
