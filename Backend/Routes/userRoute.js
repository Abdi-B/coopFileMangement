const express = require('express')
const app = express();

const router = express.Router();
const {  protect, updatePassword, updateMe  } = require('./../controllers/userControllers');


//Update
router.route('/updatePassword').patch( protect, updatePassword );

router.route('/updateMe').patch( protect, updateMe );

module.exports = router;