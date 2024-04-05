const jwt = require('jsonwebtoken')

const User = require('../Models/userModel');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const customError = require('../Utils/customError');




// Create a User

const createUser = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.body)

  const user = await User.create(req.body);

  const token = jwt.sign({id: user._id}, process.env.SECRET_STR,
     { expiresIn: process.env.LOGIN_EXPIRES } // if it not in sec use string //ex. expiresIn: '30d
     );


  return res.status(200).json({
    status: 'success',
    length: user.length,
    token,
    user
  })
});

const login = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    const error = new customError('please proved email and password!', 400);
    return next(error);
  }

  res.status(200).json({
    status: 'success',
    token: ''
  })

})


// const createUser = async (req, res, next) => {
//     const {firstName,lastName,email, password} = req.body;
//     // console.log(req.body);
//     try {
//       const user = await User.create({firstName,lastName,email, password})
//       return res.status(200).json(user)
//     } catch (error) {
//       // res.status(400).json({error: error.message})
//           const err = new customError(error.message, 404 );
//           // console.log(err)
//           next(err);
//     }
//   };

// const createUser = asyncErrorHandler(async (req, res) => {
//   const {firstName,lastName,email, password} = req.body;
//   // console.log(req.body);

//     const user = await User.create({firstName,lastName,email, password})
//     return res.status(200).json(user)
    
// })

  module.exports = {
    createUser,
    login
  }