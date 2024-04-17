const express = require('express')
const app = express();

const router = express.Router();
const {  protect, updatePassword, updateMe, deleteMe, getAllUsers  } = require('./../controllers/userControllers');

// GET ALL USERS

router.route('/getAllUsers').get(  getAllUsers );

//Update
router.route('/updatePassword').patch( protect, updatePassword );

router.route('/updateMe').patch( protect, updateMe );

router.route('/deleteMe').delete( protect, deleteMe );


module.exports = router;

                                    