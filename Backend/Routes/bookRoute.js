const express = require('express');
const multer = require('multer');

const router = express.Router();

const {createBook, getBooks, uploadFile, saveData} = require('./../controllers/bookController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const {category} = req.query;
            console.log(category)
            const hasCategory = req.body.category && req.body.category.trim();
            console.log(hasCategory)

        // Get the category from the request body or query params
        // const category = req.body.category || req.query.category || 'default';
        // Create a folder path with the category name
        const uploadPath = `Books/${hasCategory}`;
        
        // Set the destination folder for the uploaded file
        cb(null, uploadPath);
        } catch (error) {
            console.log("multer" + error);
        }
    },
    filename: (req, file, cb) => {
        // Use the original file name as the uploaded file name
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/createBook', upload.single('file'), (req, res) => {
    const { title, author } = req.body;
    const file = req.file;
    
    // Log the data received
    console.log('Title:', title);
    console.log('Author:', author);
    console.log('Uploaded file:', file);

    // Perform actions such as saving the file path and data to MongoDB or other operations

    res.status(200).json({ message: 'File uploaded and data saved' });
});


// createBooks
// router.route('/createBook').post(uploadFile, saveData);

// get all Books
// router.route('/Books').get(getBooks);

module.exports = router;