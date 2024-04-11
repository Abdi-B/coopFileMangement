const jwt = require('jsonwebtoken')
const util = require('util')
const bcrypt = require('bcryptjs')

const User = require('../Models/userModel');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const customError = require('../Utils/customError');
const sendEmail  = require('../Utils/email');


// use the following cmd on terminal to generate SECRET_STR a) node b)require('crypto').randomBytes(64).toString('hex') 
const generateAccessToken = _id => {
  return jwt.sign({id: _id}, process.env.SECRET_STR,
    { expiresIn: process.env.LOGIN_EXPIRES } // if it not in sec use string //ex. expiresIn: '30d'
    );
};

const createSendResponse = (user, statusCode, res)=>{

  token = generateAccessToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    user
  })

}

// Create a User

const createUser = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body)

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
  // console.log(user)

  // const isMatch = await user.comparePasswordInDb(password, user.password);
  // console.log(isMatch)

  // const checkValue = await bcrypt.compare(password, user.password);
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
  // console.log(req.headers)
  // console.log(authHeader)
  let token;
  // token = authHeader && authHeader.split(' ')[1];

  if(authHeader && authHeader.startsWith('Bearer')){
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
  // console.log(decodeToken) // it contains id, iat, exp  iat=timestamps in ms

  // 3)  check If the user exists 
  // may be the token exist but the user not exist. Ex. if admin delete it

   const user = await User.findById(decodeToken.id);
  //  console.log(user);

   if(!user){
    const error = new customError('The user with the given token does not exist', 401);
    next(error);
   }
   // 4) If the user changed password after token was issued
      const isPswdChanged = await user.isPasswordChanged(decodeToken.iat); // iat = issued date
      if(isPswdChanged){  
        const error = new customError('The password has been changed recently', 401)
        return next(error)
      }

   // 5) Allow user to access route

      // console.log(user)
      req.user = user;  // to use user.role in next middleware
      
      // console.log(req.user.email)

  next();
});

const restrict = (role, role2) => {
// const restrict = (...role) => { // for multiple role may be array form
  return(req,res,next) => {
    // console.log(req.user)
    // console.log(role, role2)
    //  const checkRole = role.includes(req.user.role) // applied for multiple  

    if(req.user.role === role){
      const error = new customError('you do not have permission to perform this action', 403);
      next(error);
    }
    next();
  }
}

const forgotPassword = async (req, res, next) => {
  // 1) GET USER BASED ON POSTED EMAIL

  const user = await User.findOne({email: req.body.email});
  // console.log(user);
  if(!user){
    const error = customError('could not find the user with a given email', 404);
    next(error);
  }
  // 2. GENERATE A RANDOM RESET TOKEN
   
  const resetToken =  await user.createResetPasswordToken();
  // console.log(user);
  // console.log(resetToken);
  await user.save({validateBeforeSave: false});

  // 3. SEND TOKEN BACK TO THE USER EMAIL

  const resetUrl = `${req.protocol}://${req.get('host')}/read/resetPassword/${resetToken}`;
  const message = `We have received a password rest request. Please use th below link to rest your password\n\n${resetUrl}\n\n This rest password link will be valid only for 10 minutes`
  try {
    await sendEmail({
      email: user.email,
      subject: 'password change request received',
      message: message
    });

    res.status(200).json({
      status: 'success',
      message: 'password rest link send to the user email'
    })
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({validateBeforeSave: false});
    console.log(err)

    return next(new customError('There was an error sending password reset email. please try again later', 500));
  }
};

const resetPassword = asyncErrorHandler(async ()=> {
  // 1. IF THE USER EXITS WITH THE GIVEN TOKEN & TOKEN HAS NOT  EXPIRED
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.find({passwordResetToken: token, passwordResetTokenExpires: {$gt: Date.now()}});

  if(!user){
      const error = new customError('Token is invalid or has expired!',400);
      next(error);
  }


  //2. RESETTING THE USER PASSWORD

  user.password = req.body.password;
  user.confirmPassword= req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt= Date.now();

  user.save();

  //. Login the user
  const loginToken  = generateAccessToken(user._id);

  res.status(200).json({
    status: 'success',
    token: loginToken
  })
})

const updatePassword = asyncErrorHandler(async (req,res,next)=>{
  // GET CURRENT USER DATA FROM DATABASE

  const user = await User.findById(req.user._id).select('+password');

  // CHECK IF THE SUPPLIED CURRENT PASSWORD IS CORRECT
  if(!(await user.comparePasswordInDb(req.body.currentPassword, user.password))){
    
    return next(new customError('The current password you provide is wrong', 401));

  }
  // IF SUPPLIED PASSWORD IS CORRECT, UPDATE USER PASSWORD WITH NEW VALUE
  
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  await user.save();
  // console.log(user)

  // LOGIN USER & SEND IT 
  

    createSendResponse(user, 200, res);

  // const token = generateAccessToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  //   user
  // })

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
    protect,
    restrict,
    forgotPassword,
    resetPassword,
    updatePassword
  }