const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const fileRoutes = require('./Routes/fileRoute')
// const {connectToDb, getDb} = require('./Models/fileModel')

const app = express();
// file routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
<<<<<<< HEAD
app.use(cors());
// app.use()
=======
app.use(cors(
    // {
    //     origin: ["https://coopbankfilemangement.vercel.app"],
    //     methods: ["POST", "GET"],
    //     credentials: true
    // }
));
>>>>>>> 812647e724f2ea994541c05af2cb2a7101cdf6e5


app.use('/read', fileRoutes )

// app.listen(process.env.PORT, () => {
//     console.log('Mongodb connected successfully & listening on the port', process.env.PORT)
//   })


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


