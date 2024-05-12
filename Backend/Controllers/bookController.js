const multer = require('multer');

const Books = require("../Models/bookModel")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")

const path = require('path');


// Multer configuration for file uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {category} = req.body;
        // const category = req.body.category || 'default';
        console.log(category)
        // const uploadPath = `Books/${category}`;
        const uploadPath = `Books/`;
        console.log(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// const uploadFile = upload.single('file');

const uploadFile = (req, res, next) => {
    const {category} = req.body;
    console.log("category is " + category); 

    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during file upload
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // An unexpected error occurred
            return res.status(500).json({ error: 'Unexpected error during file upload' });
        }
        // No errors, continue to the next middleware
        next();
    });
};


const saveData = async (req, res, next) => {
    const { title, category, author } = req.body;
    const file = req.file;
    // console.log(title, category, author, + " and file path is : " + file.path);
    console.log(category, author, title, file);
    if(category) res.status(200).json({ message: 'File uploaded and data saved' });
    else {
        return res.status(505).json({
            error: "Error"
        })
    }
    // next();
};

module.exports = { uploadFile, saveData };