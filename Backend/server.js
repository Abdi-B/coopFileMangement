const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
require("dotenv").config();

// process.on('uncaughtException', (err) => {
//     console.log(err.name, err.message)
//       console.log('uncaughtException occurred! shutting down...')
//         process.exit(1); // 0 for success and 1 for uncaught exception
//   });

const app = express();
app.use(cors());

app.use(helmet());

// Use rate limiter after app
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message:
    " We have received too many requests from this IP. Please try after one hour! ",
});
app.use("/", limiter);
app.use(express.json({ limit: "1000kb" }));

// after getting a data
app.use(sanitize());

app.use(xss());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(express.static('./Department'));
app.use(fileUpload());

const fileRoutes = require("./Routes/fileRoute");
const authRoutes = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoute");
const bookRoute = require("./Routes/bookRoute");

const customError = require("./Utils/customError");
const globalErrorHandler = require("./controllers/errorController");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use("/read", fileRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoute);
app.use("/book", bookRoute);

// Invalid route --for all mean it include get, post, patch, delete and etc and it should be after routes
app.all("*", (req, res, next) => {
  const err = new customError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
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

mongoose.connect(process.env.MONGO_URI1).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      "Mongodb connected successfully & listening on the port",
      process.env.PORT
    );
  });
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
