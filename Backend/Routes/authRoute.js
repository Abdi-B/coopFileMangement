const express = require('express')
const app = express();

const { createUser } = require('./../controllers/userControllers');

// Validation
const validate = require('../Validation/validate');

const router = express.Router();


// Create a user
// router.post('/user', validate.validateUser, createUser );
// router.post('/user', createUser );
router.route('/user')
    .post(createUser)

// Login 

module.exports = router;