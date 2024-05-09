const express = require('express');

const router = express.Router();

const {createBooks, getBooks} = require('./../controllers/bookController');





router.route('/createBook').post(allBooks);

router.route('/Books').get(getBooks);

module.exports = router;