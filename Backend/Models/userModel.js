const mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter firstName"],
    },

    lastName: {
      type: String,
      required: [true, "please enter lastName"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please enter email"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter password"],
      trim: true,
      minLength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "please enter confirmPassword"],
      validate: {
        // this validator will only work for save() and create()
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and confirmPassword does not match ",
      },
    },

    passwordChangedAt: Date,

    role: {
      type: String,
      enum: ["admin", "user"],
    },
    // to delete user set active to false
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // add salt before save it. it is used to identify when the password of different user is the same
  // const salt = await bcrypt.genSalt() // use can use genSalt(10)
  // console.log(salt)

  // encrypt the password before saving it
  // this.password = await bcrypt.hash(this.password, salt);
  this.password = await bcrypt.hash(this.password, 12); // bcrypt contains both hash and salt at the same time
  // console.log(this.password)

  this.confirmPassword = undefined;
  next();
});

UserSchema.pre(/^find/, function (next) {
  // which starts with find (findById, find etc)
  // this.find({active: true}); // both equations are different
  this.find({ active: { $ne: false } });
  next();
});

UserSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};

UserSchema.methods.isPasswordChanged = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedAt = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // to change date and time to timestamp with base 10

    // console.log(passwordChangedAt, JWTTimestamp); // in ms and sec respectively, timestamp is in sec
    return JWTTimestamp < passwordChangedAt;
  }
  return false;
};

UserSchema.methods.createResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now + 10 * 60 * 1000; // date.now is in ms
  // console.log(resetToken, this.passwordResetToken)
  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
