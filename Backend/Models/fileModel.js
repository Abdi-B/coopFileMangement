const mongoose = require('mongoose')


const Schema = mongoose.Schema

const FileManagementSchema = new Schema({
    originalName: {
        type: String,
        required: true
    },
    MimeType: {
        type: Number,
        required: true
    },
    fileName: {
        type: Number,
        required: true
    },
    path: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})
// // the first argument is also used to create collection with the same name
const FileManagement = mongoose.model('File', FileManagementSchema)

const blogPostSchema = new Schema({
  title: String,
  content: String,
  
  // title: {
  //   type: String,
  //   required: true
  // },
  // content: {
  //   type: String,
  //   required: true
  // },
},
{
    timestamps: true
}

);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
// module.exports = mongoose.model('BlogPost', blogPostSchema);


module.exports = {
  FileManagement,
  BlogPost
}