const multer = require('multer');

const Books = require("../Models/bookModel")
const asyncErrorHandler = require("../Utils/asyncErrorHandler")



// Multer configuration for file uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {category} = req.body;
        console.log(category)
        const uploadPath = `Books/${category}`;
        // const uploadPath = `Books/`;
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const uploadFile = upload.single('file');

const saveData = async (req, res) => {
    const { title, category, author } = req.body;
    const file = req.file;
    // console.log(title, category, author, + " and file path is : " + file.path);
    console.log(title, category, author, );

    res.status(200).json({ message: 'File uploaded and data saved' });
};

module.exports = { uploadFile, saveData };