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
import Intro from './home/Intro';
import Feed from './main/Feed';
import DesiredPartner from './main/DesiredPartner';
import Search from './main/Search';
import EditProfile from './main/EditProfile';
import Logout from './main/Logout';
import ProtectedRoute from './home/ProtectedRoute';
import AccountSettings from './main/AccountSettings';
import BlockedIgnored from './main/BlockedIgnored';
import ViewProfile from './main/ViewProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<Home />} >
        <Route path="login" element={<Login />} />
        <Route path="help" element={<Help />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} >
        <Route path="feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="desiredPartner" element={<ProtectedRoute><DesiredPartner /></ProtectedRoute>} />
        <Route path="search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="blockedIgnored" element={<ProtectedRoute><BlockedIgnored /></ProtectedRoute>} />
        <Route path="accountSettings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="support" element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path="viewprofile/:id" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default App
