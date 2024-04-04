const mongoose = require('mongoose');
var validator = require('validator');


const blogPostSchema = new mongoose.Schema({

    title: {
      type: String,
      required: [true, "please enter its Title"]
    },
    content: {
      type: String,
      required: true
    },
  },
  {
      timestamps: true
  });

  const BlogPost = mongoose.model('BlogPost', blogPostSchema);

  module.exports = BlogPost;