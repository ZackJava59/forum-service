const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    if (err.message && err.message.includes('not found')) {
        return res.status(404).json({
            status: 'Not Found',
            code: 404,
            message: err.message,
            path: err.path,
        })
    }

    return res.status(500).json({
        status: 'Internal Server Error',
        code: 500,
        message: err.message,
        path: err.path,
    })
}

export default errorHandler;