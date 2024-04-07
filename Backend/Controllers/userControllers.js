const jwt = require('jsonwebtoken')
const util = require('util')
const bcrypt = require('bcryptjs')

const User = require('../Models/userModel');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const customError = require('../Utils/customError');

// use the following cmd on terminal to generate SECRET_STR a) node b)require('crypto').randomBytes(64).toString('hex') 
const generateAccessToken = _id => {
  return jwt.sign({id: _id}, process.env.SECRET_STR,
    { expiresIn: process.env.LOGIN_EXPIRES } // if it not in sec use string //ex. expiresIn: '30d'
    );
}

// Create a User

const createUser = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.body)

// use can use bcrypt here but it is more recommended to use UserSchema.pre()
// const salt = await bcrypt.genSalt() // use can use genSalt(10)
    // console.log(salt)

    // encrypt the password before saving it
    // req.body.password = await bcrypt.hash(req.body.password, salt);
    // req.body.password = await bcrypt.hash(req.body.password, 12); // bcrypt contains both hash and salt at the same time 
    // console.log(req.body.password)

  const user = await User.create(req.body);

  // const token = jwt.sign({id: user._id}, process.env.SECRET_STR,
  //    { expiresIn: process.env.LOGIN_EXPIRES } // if it not in sec use string //ex. expiresIn: '30d
  //    );

  const token = generateAccessToken(user._id)


  return res.status(200).json({
    status: 'success',
    length: user.length,
    token,
    user
  })
});

// LOGIN

const login = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    const error = new customError('please provide email and password!', 400);
    return next(error);
  };

 
  // check if the email exists
  const user = await User.findOne({email}).select('+password');

  const isMatch = await user.comparePasswordInDb(password, user.password);
  // console.log(isMatch)

  const checkValue = await bcrypt.compare(password, user.password);
  // console.log(checkValue);
  
  // check if the user exists & password matches
  if(!user || !(await user.comparePasswordInDb(password, user.password))){
    const error = new customError('Incorrect email or password', 404);
    return next(error);
  }
  const token = generateAccessToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    user,
  })

})

const protect = asyncErrorHandler(async (req, res, next) => {
  // 1) read the token & check if it exist
  // const testToken = req.headers['authorization']
  const authHeader = req.headers.authorization
  // console.log(authHeader)
  let token;
  // token = authHeader && authHeader.split(' ')[1];

  if(authHeader && authHeader.startsWith('bearer')){
    token = authHeader.split(' ')[1];

  }
  // console.log(token);

  if(!token) {
    return next(new customError('You are not logged in!', 401))
  }

  // 2) validate the token

  // const decodeToken =  await jwt.verify(token, process.env.SECRET_STR, (err, user) => {
  //   if(err) return res.sendStatus(403).json({ error: 'Invalid refresh token' })
  //   const accessToken = generateAccessToken(user)
  //   console.log('access token', accessToken)
  //   });


  const decodeToken= await util.promisify(jwt.verify)(token, process.env.SECRET_STR)
  console.log(decodeToken) // it contains id, iat, exp  iat=timestamps in ms

  // 3)  check If the user exists 
  // may be the token exist but the user not exist. Ex. if admin delete it

   const user = await User.findById(decodeToken.id);

  next();
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
    login,
    protect
  }