import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

//theme
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
//core
import "primereact/resources/primereact.min.css";
// icons
import 'primeicons/primeicons.css';
import App from './App.jsx'
// import './index.css'
import './custom.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
