const express = require('express');

const router = express.Router();

const {createBook, getBooks} = require('./../controllers/bookController');


// createBooks
router.route('/createBook').post(createBook);

// get all Books
router.route('/Books').get(getBooks);

module.exports = router;