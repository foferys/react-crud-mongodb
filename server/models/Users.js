//questo file Users.js definisce il modello per la collezione users nel database richiesta nel file index.js

const mongoose = require("mongoose")

// creaiamo il riferimento della nostra tabella/Collection con il nome e il tipo che abbiamo sul database
//userSchema: è lo schema di Mongoose per la collezione users, che definisce i campi nome e email come stringhe.
const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
})

// userModel: crea un modello Mongoose basato sullo schema userSchema e mappa il modello alla collezione users nel database.
const userModel = new mongoose.model("users", userSchema)
module.exports = userModel; // ->  esporta il modello userModel per permetterne l'uso in altri file, come il file principale del server(index.js)