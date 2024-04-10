const express = require('express')
const app = express();

const router = express.Router();

const { createUser, login, forgotPassword } = require('./../controllers/userControllers');

// Validation
const validate = require('../Validation/validate');



// Create a user
// router.post('/user', validate.validateUser, createUser );
// router.post('/user', createUser );
router.route('/user')
    .post(createUser)


// Login 

router.route('/login').post(login)

// forgotPassword
router.route('/forgotPassword').post(forgotPassword)

//resetPassword
// router.route('/resetPassword').post(resetPassword)

module.exports = router;