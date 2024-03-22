const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();

const fileRoutes = require('./Routes/fileRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/read', fileRoutes )

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
    });


// app.listen(process.env.PORT, () => {
//     console.log('Mongodb connected successfully & listening on the port', process.env.PORT);
// });
