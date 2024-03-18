

exports.validatePost = (req, res, next) => {
    if(!req.body.title || !req.body.content) {
        return res.status(400).json({
            status: 'fail',
            message: 'Not a valid Post Data'
        });
    }
    next();
}


exports.validateUser = (req, res, next) => {
    if(!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password  ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Not a valid signUp Data'
        });
    }
    next();
}
