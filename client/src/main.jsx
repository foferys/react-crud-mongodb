import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// import dello slice userReducer.jsx ->assegnato poi sotto nel reducer dello store
import UserReducer from './UserReducer.jsx'
import UserReducer2 from './UserReducer2.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* 
  Creo uno store Redux usando configureStore configurato con due reducer:
  users, che utilizza UserReducer.
  mongousers, che utilizza UserReducer2. 
  La struttura dello stato globale dello store avrà due sezioni principali: users e mongousers, 
  ciascuna gestita dal rispettivo reducer.
*/
const store = configureStore({
  reducer: {
    users:  UserReducer,
    mongousers:  UserReducer2,
  }
})

/* 
  RENDER  dell'applicazione React nel DOM all'interno dell'elemento con id='root':
  React.StrictMode:
    Questo componente avvolge l'intera applicazione e attiva dei controlli aggiuntivi in fase di sviluppo, come il 
    controllo dei side effects e la verifica dei metodi deprecati.
  Provider:
    Il componente Provider proviene da react-redux e collega il Redux store all'applicazione React. Tutti i componenti 
    figli avranno accesso allo store tramite il context API di React.
  BrowserRouter:
    Il componente BrowserRouter proviene da react-router-dom e utilizza la History API del browser per mantenere l'interfaccia 
    URL sincronizzata con lo stato dell'applicazione.
  Routes e Route -> All'interno di BrowserRouter, si definiscono le rotte dell'applicazione:
    Route con path='/*' indica che qualsiasi percorso dovrebbe essere gestito dal componente App. L'uso di /* permette di 
    gestire percorsi annidati all'interno di App. 
  */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={ <App />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
