const multer = require('multer');

const Books = require("../Models/bookModel")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")

const path = require('path');


// Multer configuration for file uploads

const saveData =  (req, res) => {

    const { category } = req.params;
    // const file = req.file;
    const file = req.file ? req.files.file[0] : null; 
    // console.log(title, category, author, + " and file path is : " + file.path);
   
    console.log(`Category is ${category} and file is ${file}`);

  if (category) {
    res.status(200).json({ message: 'File uploaded and data saved' });
  } else {
    res.status(400).json({ error: 'Category is required' });
  }

};

module.exports = { saveData };