// import { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom';

import Home from './home/Home';
import Main from './main/Main';
import Contact from './home/Contact';
import Help from './home/Help';
import Login from './home/Login';
// import Menu from './home/menu/menu';
import Intro from './home/Intro';
import Feed from './main/Feed';
import DesiredPartner from './main/DesiredPartner';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<Home />} >
        <Route path="login" element={<Login />} />
        <Route path="help" element={<Help />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/main" element={<Main />} >
        <Route path="/main/feed" element={<Feed />} />
        <Route path="/main/editprofile" element={<Main />} />
        <Route path="/main/desiredPartner" element={<DesiredPartner />} />
        <Route path="/main/search" element={<Main />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default App
