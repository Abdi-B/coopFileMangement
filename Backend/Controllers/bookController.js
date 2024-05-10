const multer = require('multer');

const Books = require("../Models/bookModel")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")



// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Books/'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    }
});


const upload = multer({ storage });

const uploadFile = upload.single('file');

const saveData = async (req, res) => {
    const { title } = req.body;
    const file = req.file;
    console.log(title, file.path);

    // Save file path and text data to MongoDB
    // const newBook = new Books({ filePath: file.path, textData });
    // await newBook.save();

    res.status(200).json({ message: 'File uploaded and data saved' });
};

module.exports = { uploadFile, saveData };