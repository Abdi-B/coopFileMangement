const express = require('express');

const router = express.Router();

const {createBooks, getBooks} = require('./../controllers/bookController');


// createBooks
router.route('/createBook').post(allBooks);

// get all Books
router.route('/Books').get(getBooks);

module.exports = router;