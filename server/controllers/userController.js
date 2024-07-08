const userService = require('../services/userService');
const { hash, compare } = require("bcrypt")
const { sign } = require("jsonwebtoken")

const register = async ({body} ,res, next) => {
    try {
        const user = await userService.getUserByEmail(body.email);
        if (user) {
            return next({ status: 409, msg: "User already registered" });
        }
        body.password = await hash(body.password, 5);
        const savedUser = await userService.addUser(body);
        if (!savedUser) return next(true)
        return res.status(201).send("user created successfully")
    } catch (stack) {
        next(stack);
    }
};

const login = async ({ body }, res, next) => {
    try {
        const user = await userService.getUserByEmail(body.email);
        if (!user) return next({ status: 404, msg: "Wrong email or password" });
        if (!await compare(body.password, user.password)) {
            return next({ status: 401, msg: "Wrong email or password" });
        }
        const accessToken = sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "30d" });
        delete user.password;
        res.cookie("access_token", accessToken, { httpOnly: true, sameSite: "None", secure: true }).status(200).json({ msg: "Login successfully", user });
    } catch (stack) {
        next(stack);
    }
};

const getUserInfo = async ({ user: { id } }, res, next) => {
    try {
        const user = await userService.getUserById(id);
        res.status(200).json({ msg: "Success authorized", user });
    } catch (stack) {
        next(stack);
    }
};

const logout = async (res, next) => {
    try {
        res.clearCookie("access_token").status(200).send("Logout successfully");
    } catch (stack) {
        next(stack);
    }
};

const userCtrl = {
    register,
    login,
    getUserInfo,
    logout
};

module.exports = userCtrl;
