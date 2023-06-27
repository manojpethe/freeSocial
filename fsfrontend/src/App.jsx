// import { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom';

import General from './general/general'
import Main from './main/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<General />} />
      <Route path="/main" element={<Main />} />
      <Route path="*" element={<div>You are lost!</div>} />
    </Routes>
  )
}

export default App
