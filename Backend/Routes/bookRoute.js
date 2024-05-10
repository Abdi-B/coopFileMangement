const express = require('express');

const router = express.Router();

const {createBook, getBooks, uploadFile, saveData} = require('./../controllers/bookController');


// createBooks
router.route('/createBook').post(uploadFile, saveData);

// get all Books
// router.route('/Books').get(getBooks);

module.exports = router;