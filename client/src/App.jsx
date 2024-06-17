import { useState } from 'react'
import React from 'react'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Creazione from './Creazione'
import Update from './Update'
//per l'animazione framer motion
import { AnimatePresence } from 'framer-motion'




function App() {
  const [count, setCount] = useState(0)

  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create' element={<Creazione />}></Route>
          <Route path='/edit/:userId' element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  )
}

export default App
