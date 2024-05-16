const express = require('express');

const router = express.Router();

const {createBook, getBooks, uploadFile, uploadBook, deleteBook} = require('./../controllers/bookController');


// router.post('/createBook:/category',  uploadBook);
router.post('/createBook', uploadBook);


// createBooks
// router.route('/createBook').post(uploadFile, saveData);

// get all Books
router.route('/getBooks').get(getBooks);


// Delete Book
// router.route('deleteBook/:title').delete(deleteBook)

router.delete('deleteBook/:title', deleteBook)

module.exports = router;