
const mongoose = require('mongoose');
var validator = require('validator');


const FileManagementSchema =  new mongoose.Schema({
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
        required: true,
        trim: true
    },
    path: {
        type: Number,
        required: true,
        trim: true
    },
    size: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})



// Document and query middleware of mongoose
// middleware --- save is for 'save and create '
// UserSchema.pre('save', function (next) {
//     this.createdBy = 'Abdi';

//     next();  
// })
// find and findOne is different so, to handle it use /*find/ --> this mean all which starts with find
// UserSchema.pre('find', (next) => {
//   this.find({releaseDate: {lte: Date.now}})
//   next();
// });



const FileManagement = mongoose.model('File', FileManagementSchema)


module.exports = FileManagement;

