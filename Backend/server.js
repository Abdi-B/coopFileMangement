const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();

const fileRoutes = require('./Routes/fileRoute');
const customError = require('./Utils/customError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/read', fileRoutes )

// Invalid route --for all mean it include get, post, patch, delete and etc and it should be after routes
app.all('*', (req, res, next) => {
    // first Error handling

    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on the server!`
    // })

    // second Error Handling

    // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    // third Error Handling

    const err = new customError(`Can't find ${req.originalUrl} on the server!`, 404 );
    next(err);
    
});

app.use(globalErrorHandler);

// app.use((error, req, res, next)=>{
//     error.statusCode = error.StatusCode || 500;
//     error.status = error.status || 'error';
//     res.status(error.statusCode).json({
//         status: error.status,
//         message: error.message
//     });

// });




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
