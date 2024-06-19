import { useState } from 'react'
import React from 'react'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes, Route, useLocation } from 'react-router-dom'
import Creazione from './Creazione'
import Update from './Update'
//per l'animazione framer motion
import { AnimatePresence } from 'framer-motion'




function App() {

  /* useLocation Hook: Utilizzato per ottenere la posizione corrente e utilizzarla come chiave per Routes. */
  const location = useLocation();

  return (
    /* AnimatePresence proviene da framer-motion ed è utilizzato per gestire l'animazione dei componenti in uscita e in entrata. 
    Il prop mode='wait' indica che le nuove animazioni dovrebbero attendere che quelle in uscita siano completate prima di 
    iniziare. */
    <AnimatePresence mode='wait'>
      {/* location e key: Passato location a Routes e utilizzato location.pathname come chiave per garantire che 
      ogni route abbia una transizione unica. */}
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<Creazione />}></Route>
        <Route path='/edit/:userId' element={<Update />}></Route>
      </Routes>
      
    </AnimatePresence>
  )
}

export default App
