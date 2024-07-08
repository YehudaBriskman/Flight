const { verify } = require("jsonwebtoken")

const auth = async (req, next) => {
    try {
        const accessToken = req.cookies["access_token"]
        if (!accessToken) return next({ status: 401, msg: "unauthorized" })
        const { id, role } = verify(accessToken, process.env.SECRET_KEY)
        req.user = { id, role }

        next()

    } catch (stack) {
        next({ status: 401, msg: "unauthorized", stack })
    }
}

const authAdmin = (req, next) => {
    try {
        if (req.user.role == "admin") return next();
        return next({ status: 401, msg: "unauthorized" })
    } catch (stack) {
        next({ status: 401, msg: "unauthorized", stack })
    }
}
module.exports = { auth, authAdmin }
