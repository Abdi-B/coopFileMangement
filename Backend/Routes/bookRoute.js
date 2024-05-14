const express = require('express');

const router = express.Router();

const {createBook, getBooks, uploadFile, saveData, uploadBook} = require('./../controllers/bookController');


// router.post('/createBook:/category',  saveData);
router.post('/createBook', uploadBook);


// createBooks
// router.route('/createBook').post(uploadFile, saveData);

// get all Books
// router.route('/Books').get(getBooks);

module.exports = router;