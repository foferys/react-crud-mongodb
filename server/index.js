// installare tutte le dipendenze con nmp (express, mongoose, cors)
const express = require('express'); //-> gestisce il server web e le rotte.
const mongoose = require('mongoose');  //-> permette di interagire con MongoDB usando un'interfaccia orientata a oggetti.
const cors = require('cors'); // abilita le richieste cross-origin, permettendo al frontend di comunicare con il backend da domini diversi.
const userModel = require('./models/Users.js')

//--> COSA FA? -> usare Express e Mongoose per connettersi a un database MongoDB e fornire dati tramite un'API:


const app = express() //->//express(): crea un'istanza dell'applicazione.
app.use(cors()) // -> abilita il CORS, così il server può accettare richieste da domini diversi.
app.use(express.json()); // -> abilita il parsing JSON automatico per le richieste, utile per gestire il corpo delle richieste JSON.

// connessione al database tramite server:
/*  mongoose.connect(...): stabilisce la connessione con il database MongoDB.
    "mongodb://127.0.0.1:27017/corsomongocompass" è l'URL locale per MongoDB; 127.0.0.1 è l'indirizzo IP locale e corsomongocompass è il nome del database. */
mongoose.connect("mongodb://127.0.0.1:27017/corsomongocompass");

//Endpoint GET per Recuperare i Dati
// va a prendere il model "Users.js" nella cartella model che abbiamo importato come userModel sopra
app.get('/', (req, res) => { // ->app.get('/'): crea un endpoint GET per la rotta radice (/).
    userModel.find() //->usa Mongoose per recuperare tutti i documenti (records) della collezione users nel database.
    // convertiamo in json la risposta
    .then(users => res.json(users)) //-> se userModel.find() ha successo, la lista degli utenti è inviata come JSON nella risposta.
    .catch(err => res.json(err))

});

//Avvio del Server
// installare nodemon per averlo nelle dipendenze e poter far partire il server
app.listen(3001, () => { // -> app.listen(3001, ...): avvia il server su localhost alla porta 3001, e stampa un messaggio di conferma in console.
    console.log("server attivo")
}) 


