
<<<<<<< HEAD
=======

>>>>>>> d605fc2ba8f9820bd28da1e0d52295d8f2fda4d4
exports.validatePost = (req, res, next) => {
    if(!req.body.title || !req.body.content) {
        return res.status(400).json({
            status: 'fail',
            message: 'Not a valid Post Data'
        });
    }
    next();
}


