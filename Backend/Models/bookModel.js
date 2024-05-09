

const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    Author: {
        type: String,
        required: true,
        
    },
    category: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    invitedByEmail: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
}
)

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;