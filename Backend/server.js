const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

// process.on('uncaughtException', (err) => {
//     console.log(err.name, err.message)
//       console.log('uncaughtException occurred! shutting down...')
//         process.exit(1); // 0 for success and 1 for uncaught exception 

//   });

const app = express();

const fileRoutes = require('./Routes/fileRoute');
const authRoutes = require('./Routes/authRoute');
const userRoute = require('./Routes/userRoute');
const customError = require('./Utils/customError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./Department'))

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

app.use('/read', fileRoutes );
app.use('/auth', authRoutes );
app.use('/user', userRoute );


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

mongoose.connect(process.env.MONGO_URI, )
    .then(() => {
        //listen for req
    // console.log('Mongodb connected successfully & listening on the port');
    app.listen(process.env.PORT, () => {
              console.log('Mongodb connected successfully & listening on the port', process.env.PORT);
              })
    });


// SERVER
// const server = app.listen(process.env.PORT, () => {
//     console.log('Server has started on the port', process.env.PORT);
// });


// process.on('unhandledRejection', (err) => {
//   console.log(err.name, err.message)
//     console.log('Unhandled rejection occurred! shutting down...')
//   // before abort it, we have to close a server
//     server.close(() => {
//       process.exit(1); // 0 for success and 1 for uncaught exception 
//     })
// });