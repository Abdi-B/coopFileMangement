



const globalErrorHandler = (error, req, res, next)=>{
    error.statusCode = error.StatusCode || 500;
    error.status = error.status || 'error';
    if(process.env.Node_ENVT = "development") {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            stackTrace: error.stack,
            error: error 
    
        });
    } else if(process.env.Node_ENVT = "production"){
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
    
        });
    }
};

module.exports = globalErrorHandler;