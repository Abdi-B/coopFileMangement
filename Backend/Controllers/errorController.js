
const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error 

    });
};

const ProdErrors = (res, error) => {
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
    
        });
    }else {
        res.status(500).json({
            status: "Error",
            message: 'Something went wrong! please try again later'
        })
    }
}



const globalErrorHandler = (error, req, res, next)=>{
    error.statusCode = error.StatusCode || 500;
    error.status = error.status || 'error';
    if(process.env.Node_ENVT = "development") {
        devErrors(res, error);
    } else if(process.env.Node_ENVT = "production"){
        ProdErrors(res, error);
    }
};

module.exports = globalErrorHandler;