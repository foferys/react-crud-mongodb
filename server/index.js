// installare tutte le dipendenze con nmp (express, mongoose, cors)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/Users.js')

const app = express()
app.use(cors())
app.use(express.json());
// questo fa si che quando passiamo dati da frontend e back sarà convertito in json

// connessione al database tramite server
mongoose.connect("mongodb://127.0.0.1:27017/corsomongocompass");

// va a prendere il model "Users.js" nella cartella model che abbiamo importato come userModel sopra
app.get('/', (req, res) => {
    userModel.find() //->questo metodo recupera tutti i records dal database
    // convertiamo in json la risposta
    .then(users => res.json(users))
    .catch(err => res.json(err))

});

// funzione per avviare il server con messaggio 
// installare nodemon per averlo nelle dipendenze e poter far partire il server
app.listen(3001, () => {
    console.log("server attivo")
})


