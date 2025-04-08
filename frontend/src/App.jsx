import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './screen/Home'
import About from './screen/About'
import Cart from './components/Cart'
import Login from './screen/Login'
import Signup from './screen/Signup'
import PrivateRoute from './components/PrivateRoute'
import AdminDashboard from './screen/AdminDashboard'



export default function App() {
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
