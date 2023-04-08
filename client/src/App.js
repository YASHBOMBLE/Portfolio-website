import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"

import Home from "./views/Home/Home.js"
import Verifymail from './views/Verifymail/Verifymail'



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Verifymail" element={<Verifymail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
