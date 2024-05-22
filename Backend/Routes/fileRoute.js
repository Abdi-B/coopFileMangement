const express = require('express');

const app = express();
const  {
    createFile,
    getDepartments,
    getSubDepartment,
    getFiles,
    postAnnouncement,
    getAnnouncements,
    getAnnouncement,
    Download,
    getDepartments1
    
} = require('./../fileControllers');

const { createUser } = require('./../controllers/userControllers');

const {AdminFiles } = require('./../controllers/admin')

// Validation
const validate = require('../Validation/validate');
const {protect , restrict} = require('./../controllers/userControllers');



const router = express.Router();

// router.use(protect); 

// Create File
router.route('/createFile').post( createFile);

// Admin  Get Files

// router.get('/getAdminFiles', AdminFiles)
router.route('/getAdminFiles').get(AdminFiles);



// Get Announcement
// router.get('/getPost',protect, getAnnouncement); 
// another way
// router.route('/getPost').get(  getAnnouncement)
router.get('/getPost', getAnnouncement)


//get all Announcements
router.get('/getPosts', getAnnouncements);


// Post Announcement
router.post('/posts', validate.validatePost , postAnnouncement);


//GET all Department
// router.get('/', protect, restrict('user', 'user2'), getDepartments); // to add role on restrict
router.get('/', getDepartments1);

//GET all Sub-department
router.get('/:row', getSubDepartment);

//GET all Files
router.get('/:item/:item2', getFiles);

//admin
// router.get('/admin')

// Download
router.get('/download/:item/:item2/:filename', Download)



module.exports = router;