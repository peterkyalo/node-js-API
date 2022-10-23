const express = require('express');
const { getAllUsers, addUser, updateUser, deleteUser, getUserById } = require('../controller/user-controller');

const router = express.Router();

router.get('/', getAllUsers); //https://localhost:5000/users //get all user  request route
router.post('/', addUser); //create user request route
router.put('/:id', updateUser); //update user request route
router.delete('/:id', deleteUser ); //delete user  request route
router.get('/:id', getUserById); //get specific user  request route

module.exports = router;

