const express = require('express')
const app = express();
const  {
    getDepartments,
    getSubDepartment,
    getFiles,
    postAnnouncement,
    getAnnouncements,
    getAnnouncement
} = require('./../fileControllers')

// Validation
const validateBody = require('../controllers/validateBody')


const router = express.Router()

// Get Announcement
<<<<<<< HEAD
router.get('/getPost', getAnnouncement) 
// another way
// app.route('/getPost')
=======
router.get('/getPost', getAnnouncement)

// another way
// app.route('/getPost')
//     .get(getAnnouncement)
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
    

//get all Announcements
router.get('/getPosts', getAnnouncements)

// Post Announcement
router.post('/posts', validateBody.validatePost , postAnnouncement)

//GET all Department
router.get('/', getDepartments)

//GET all Sub-department
router.get('/:row', getSubDepartment)

//GET all Files
router.get('/:item/:item2', getFiles)


module.exports = router
