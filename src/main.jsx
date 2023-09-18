// Third-party
import React from 'react'
import ReactDOM from 'react-dom/client'
import { FirebaseAppProvider } from 'reactfire';

// App
import App from './App.jsx'

// Configs
import firebaseConfig from "./config/firebaseConfig";

// Styling
import './assets/css/index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
)
