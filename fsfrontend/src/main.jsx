import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";

//theme
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import 'primeicons/primeicons.css';
//primeflex
import '/node_modules/primeflex/primeflex.css';

import App from './App.jsx'
// import './index.css'
import './custom.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
