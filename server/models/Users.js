const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nome: String,
    cognome: String,
    eta: Number,
})

const userModel = new mongoose.model("users", userSchema)
module.exports = userModel;