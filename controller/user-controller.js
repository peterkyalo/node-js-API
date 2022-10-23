const User = require('../model/User');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return next(err)
    }
    if (!users) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }

    return res.status(200).json({ users })
};

const addUser = async (req, res, next) => {
    //destructure name email password
    const {name, email, password} = req.body;
    //validation check
    if (
        !name && name.trim() == "" && 
        !email && email.trim() == '' && 
        !password && 
        password.length > 6
        ) {
        return res.status(422).json({ message: 'Invalid Data'});
    }

    //create user
    let user;
    try {
        user = new User({
            name,
            email,
            password,
        });
        //save user
        user = await user.save();
    } catch (err) {
        return next(err);
    }
    //validation check
    if (!user) {
        return res.status(500).json({ message: 'Unable to save user' });
    }
    //if everyting work fine return saved user to the user
    return res.status(201).json( { user })
};

//update user
const updateUser = async (req, res, next) => {
    const id =req.params.id;
    //destructure name email password
    const {name, email, password} = req.body;
    //validation check
    if (
        !name && 
        name.trim() == "" && 
        !email && 
        email.trim() === '' && 
        !password && 
        password.length > 6
        ) {
        return res.status(422).json({ message: 'Invalid Data'});
    }
     
    let user;
    try {
        user = await User.findByIdAndUpdate( id, { name, email, password });
    } catch (err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({ message: 'Unable to update user'});
    }
    return res.status(200).json({ message: 'User Updated Successfully' });
};

//delete user function
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndRemove(id);
    } catch (err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({ message: 'Unable to delete user' });
    }
    return res.status(200).json({ message: 'User deleted successfully'});
};

//get single user function
const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id); 
    } catch (err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({ message: 'Unable to get he user'});
    }
    return res.status(200).json({ user });
}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;