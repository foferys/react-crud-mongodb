import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// import dello slice userReducer.jsx ->assegnato poi sotto nel reducer dello store
import UserReducer from './UserReducer.jsx'
import UserReducer2 from './UserReducer2.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



/* user reducer */
const store = configureStore({
  reducer: {
    users:  UserReducer,
    mongousers:  UserReducer2,
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
