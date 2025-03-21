import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './screen/Home'
import About from './screen/About'
import Cart from './components/Cart'

export default function App() {
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route path='/cart' element={<Cart/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
