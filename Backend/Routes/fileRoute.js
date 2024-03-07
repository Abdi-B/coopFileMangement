const express = require('express')
const  {
    getDepartments,
    getSubDepartment,
    getFiles,
    postAnnouncement,getAnnouncements,
    getAnnouncement
} = require('./../fileControllers')

const router = express.Router()

// Get Announcement
router.get('/getPost', getAnnouncement)

//get all Announcements
router.get('/getPosts', getAnnouncements)

// Post Announcement
router.post('/posts', postAnnouncement)

//GET all Department
router.get('/', getDepartments)

//GET all Sub-department
router.get('/:row', getSubDepartment)

//GET all Files
router.get('/:item/:item2', getFiles)

module.exports = router
