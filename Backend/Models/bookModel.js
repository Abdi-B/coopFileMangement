const { Timestamp } = require("mongodb");

const mongoose = req('mongoose');


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