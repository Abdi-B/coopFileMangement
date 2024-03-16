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
router.get('/getPost', getAnnouncement) 
// another way
// app.route('/getPost')
    

//get all Announcements
router.get('/getPosts', getAnnouncements)

// Post Announcement
router.post('/posts', validateBody.validatePost , postAnnouncement)

// Create a user

// router.post('/user', validateBody.validateUser )


//GET all Department
router.get('/', getDepartments)

//GET all Sub-department
router.get('/:row', getSubDepartment)

//GET all Files
router.get('/:item/:item2', getFiles)


module.exports = router
