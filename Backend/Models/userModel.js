const mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');


const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "please enter firstName"],
    },
    lastName: {
        type: String,
        required:  [true, "please enter lastName"],
    },
    email: {
        type: String,
        unique: true,
        required:  [true, "please enter email"],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'please enter valid email']
    },
    password: {
        type: String,
        required:  [true, "please enter password"],
        trim: true,
        minLength: 8,
        // select: false
    },
    confirmPassword: {
        type: String,
        required:  [true, "please enter confirmPassword"],
        validate: {
            // this validator will only work for save() and create()
            validator: function(value){
                return value === this.password;
            },
            message: 'Password and confirmPassword does not match '
        }
    }
},
{
    timestamps: true
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    // encrypt the password before saving it
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
    
});



const User = mongoose.model('User', UserSchema)

module.exports = User;