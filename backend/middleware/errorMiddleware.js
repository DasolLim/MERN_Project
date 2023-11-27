//Function that execute during request and response cycle

const errorHandler = (err, req, res, next) => {
    // server error: 500
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    // provide error handling information with line number
    res.json({
        message: err.message,
        // for more information
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = {
    errorHandler,
}