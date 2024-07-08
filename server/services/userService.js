const User = require('../models/userModel');

const getUserByEmail = async (userEmail) => {
    const user = await User.findOne({ email: userEmail });
    return user;
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
};

const addUser = async (userData) => {
    const user = new User(userData);
    console.log({userData});
    const savedUser = await user.save();
    console.log({savedUser});
    return savedUser;
};

const userService = {
    getUserByEmail,
    getUserById,
    addUser
}

module.exports = userService
