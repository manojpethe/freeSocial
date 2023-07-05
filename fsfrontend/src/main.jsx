import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { GoogleOAuthProvider } from '@react-oauth/google';

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
      <GoogleOAuthProvider clientId="809483577744-pjaqrts3igp51hn809m59dl0j29b1p9m.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </HashRouter>
  </React.StrictMode>,
)
