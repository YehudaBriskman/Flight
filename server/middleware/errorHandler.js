const errorHandler = (err, req, res, next) => {
    const errorObj = {};
    if (err.msg) errorObj.msg = err.msg;
    if (err.stack && Object.keys(err.stack).length) errorObj.stack = err.stack;
    if (process.env.MODE == "production" || !Object.keys(errorObj).length) {
        return res.status(err.status ?? 500).send("there was an error")
    }
    res.status(err.status ?? 500).json(errorObj)
};

module.exports = errorHandler;
