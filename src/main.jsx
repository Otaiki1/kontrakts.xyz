import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlockchainContextProvider } from './context/BlockchainContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlockchainContextProvider>
    <App />
    </BlockchainContextProvider>
  </React.StrictMode>,
)
