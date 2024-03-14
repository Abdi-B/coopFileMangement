



exports.validatePost = (req, res, next) => {
    if(!req.body.title || !req.body.content) {
        return res.status(400).json({
            status: 'fail',
            message: 'Not a valid Post Data'
        });
    }
    next();
}


