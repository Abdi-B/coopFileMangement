const path = require('path');
const fs = require('fs');

const Books = require("../Models/bookModel")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")

const uploadBook = async (req, res) => { 

  // console.log(req.files.file.name)
  // console.log(req.files.file.size)
  // console.log(req.body.category)

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
}

const file = req.files.file
const size = req.files.file.size
const name = req.files.file.name
const {category, author, title } = req.body 
  if(file && category) {
    const  uploadPath = await path.join(__dirname, '../Books', category);

    // // Create the category directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      try {
          fs.mkdirSync(uploadPath, { recursive: true });
          console.log('Directory created:', uploadPath);
      } catch (err) {
          console.error('Error creating directory:', err);
          return res.status(500).send('Error creating directory.');
      }
    }
    // Use the mv() method to place the file in the category folder
    file.mv(path.join(uploadPath, file.name), async (err) => {
      if (err) {
          console.error('Error moving file:', err);
          return res.status(500).send(err);
      }
    const book = await Books.create({category,name,  author, title, size})

    res.status(200).json({
      status: 'success',
      book
    })
  });
} else {
  res.status(400).send('File or category is missing.');
}
  
  }



module.exports = { 
  uploadBook 
};