
const {BlogPost, FileManagement, User} = require('../Models/fileModel');



// Create a User
const createUser = async (req, res) => {
    const {firstName,lastName,email, password} = req.body;
    // console.log(req.body);
    try {
      const user = await User.create({firstName,lastName,email, password})
      return res.status(200).json(user)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  module.exports = {
    createUser
  }