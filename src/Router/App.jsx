// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Dashboard from '../pages/Dashboard'
import LogIn from '../pages/LogIn'
import LogOut from '../pages/LogOut'
import Records from '../pages/Records'
import NotFound from "../pages/NotFound";

function App() {
  return(
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/records" element={<Records />} />
            <Route path="/hola" element={
              <div>
                <h1>Hola Navegador</h1>
              </div>
            } />
            <Route path="*" element={<NotFound />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
