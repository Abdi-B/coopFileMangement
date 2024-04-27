const express = require('express');

const app = express();
const  {
    getDepartments,
    getSubDepartment,
    getFiles,
    postAnnouncement,
    getAnnouncements,
    getAnnouncement
} = require('./../fileControllers');

const { createUser } = require('./../controllers/userControllers');

// Validation
const validate = require('../Validation/validate');
const {protect , restrict} = require('./../controllers/userControllers');


const router = express.Router();

// router.use(protect); 

// Get Announcement
// router.get('/getPost',protect, getAnnouncement); 
// another way
router.route('/getPost')
    .get(  getAnnouncement)


//get all Announcements
router.get('/getPosts', getAnnouncements);

// Post Announcement
router.post('/posts', validate.validatePost , postAnnouncement);


//GET all Department
// router.get('/', protect, restrict('user', 'user2'), getDepartments); // to add role on restrict
router.get('/', getDepartments);

//GET all Sub-department
router.get('/:row', getSubDepartment);

//GET all Files
router.get('/:item/:item2', getFiles);

//admin
// router.get('/admin')


module.exports = router;