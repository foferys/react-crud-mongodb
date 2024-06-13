const mongoose = require("mongoose")

// creaiamo il riferimento della nostra tabella/Collection con il nome e il tipo che abbiamo sul
// database
const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
})

// creaiamo il model che prende 2 parametri -> il nome della tabella e lo schema creato
const userModel = new mongoose.model("users", userSchema)
module.exports = userModel;