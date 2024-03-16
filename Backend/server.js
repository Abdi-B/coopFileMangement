const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const fileRoutes = require('./Routes/fileRoute')
<<<<<<< HEAD

=======
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4

const app = express();


app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));

app.use(cors());
=======
app.use(express.urlencoded({ extended: false }));
>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4

app.use(cors());

app.use('/read', fileRoutes )

<<<<<<< HEAD
=======

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for req
        app.listen(process.env.PORT, () => {
            console.log('Mongodb connected successfully & listening on the port', process.env.PORT)
          })
    })
    .catch((error) => {
        console.log(error)
    })

>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4

// // DB connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         //listen for req
//         app.listen(process.env.PORT, () => {
//             console.log('Mongodb connected successfully & listening on the port', process.env.PORT)
//           })
//     })
//     .catch((error) => {
//         console.log(error)
//     })
    app.listen(process.env.PORT, () => {
        console.log('Mongodb connected successfully & listening on the port', process.env.PORT)
      })