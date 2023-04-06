import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"

import Home from "./views/Home/Home.js"



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
