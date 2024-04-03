
const {BlogPost, FileManagement, User} = require('../Models/fileModel');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const customError = require('../Utils/customError');




// Create a User
const createUser = async (req, res, next) => {
    const {firstName,lastName,email, password} = req.body;
    // console.log(req.body);
    try {
      const user = await User.create({firstName,lastName,email, password})
      return res.status(200).json(user)
    } catch (error) {
      // res.status(400).json({error: error.message})
          const err = new customError(error.message, 404 );
          // console.log(err)
          next(err);
    }
  }

// const createUser = asyncErrorHandler(async (req, res) => {
//   const {firstName,lastName,email, password} = req.body;
//   // console.log(req.body);

//     const user = await User.create({firstName,lastName,email, password})
//     return res.status(200).json(user)
    
// })

  module.exports = {
    createUser
  }