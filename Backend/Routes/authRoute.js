const express = require('express')
const app = express();

const router = express.Router();

const { createUser, login, forgotPassword, resetPassword, protect, updatePassword  } = require('./../controllers/userControllers');

// Validation
const validate = require('../Validation/validate');


// router.use(middlewareName) // route it before all

// Create a user
// router.post('/user', validate.validateUser, createUser );
// router.post('/user', createUser );
router.route('/user')
    .post(createUser)

// Login 

router.route('/login').post(login);


// forgotPassword
// router.route('/forgotPassword').post(forgotPassword)

//resetPassword
// router.route('/resetPassword/:token').patch(resetPassword)



module.exports = router;