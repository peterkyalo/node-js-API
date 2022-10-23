const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');

const app = express();
app.use(express.json());//tell the application it wll reveice json data from the front end

app.use('/users', router) //https://localhost:5000/users

mongoose.connect('mongodb+srv://admin:admin@cluster0.tfi0fgt.mongodb.net/?retryWrites=true&w=majority')
.then(() =>
 app.listen(5000, () => console.log('Connected and listening on Port 5000'))
 )
 .catch((err) => console.log(err))