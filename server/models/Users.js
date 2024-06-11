const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nome: String,
    cognome: String,
    eta: Number
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;