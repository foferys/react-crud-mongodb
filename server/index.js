const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/Users.js')

const app = express()
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/corsomongocompass");

app.get('/', (req, res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))

});

app.listen(3001, () => {
    console.log("server attivo")
})


