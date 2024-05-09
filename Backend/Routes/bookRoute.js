const express = require('express');

const router = express.Router();

const {allBooks} = require('./../controllers/bookController');



// router.route('/allBooks').get(allBooks);

router.route('/createBook').post(allBooks);


module.exports = router;